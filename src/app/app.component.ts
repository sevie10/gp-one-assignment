import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'gp-one-task';

  protected inputFG: FormGroup;

  private subFirstDate: Subscription;
  private subSecDate: Subscription;
  public minDate: Date;
  public maxDate: Date;

  public dateFrom: Date;
  public dateTo: Date;
  public numOfDays: number;
  public numOfSat: number;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.inputFG = this.formBuilder.group({
      firstDate: ['', [Validators.required]],
      secondDate: ['', [Validators.required]]
    });

    this.subFirstDate = this.inputFG.get('firstDate').valueChanges.subscribe(s => {
      this.minDate = new Date(this.inputFG.get('firstDate').value);
    });

    this.subSecDate = this.inputFG.get('secondDate').valueChanges.subscribe(s => {
      this.maxDate = new Date(this.inputFG.get('secondDate').value);
    });
  }


  ngOnDestroy(): void {
    if (this.subFirstDate) {this.subFirstDate.unsubscribe(); }
    if (this.subSecDate) {this.subSecDate.unsubscribe(); }
  }

  public submitInput(): void {
    this.CalcNumDaysAndSaturdays();
  }

  CalcNumDaysAndSaturdays(): void {
    const getDateFrom = this.inputFG.get('firstDate').value;
    const getDateTo = this.inputFG.get('secondDate').value;
    this.dateFrom = new Date(getDateFrom);
    this.dateTo = new Date(getDateTo);
    this.numOfDays = 0;
    this.numOfSat = 0;

    if ( this.dateFrom.getDay() === 6) {
      // 6 = saturdays
      ++this.numOfSat;
    }

    while (this.dateFrom < this.dateTo) {

      // increment date
      this.dateFrom.setDate(this.dateFrom.getDate() + 1);

      ++this.numOfDays;

      if ( this.dateFrom.getDay() === 6) {
        // 6 = saturdays
        ++this.numOfSat;
      }

    }
}

}
