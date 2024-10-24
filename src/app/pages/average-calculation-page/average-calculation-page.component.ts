import { Component, OnInit } from '@angular/core';
import { AVERAGE_DATA_KEY_NAME } from 'src/app/const/const';
import {
  SelectDateService,
  SelectedDate,
  StorageService,
} from 'src/app/service';

@Component({
  selector: 'app-average-calculation-page',
  templateUrl: './average-calculation-page.component.html',
  styleUrls: ['./average-calculation-page.component.scss'],
})
export class AverageCalculationPageComponent implements OnInit {
  inputStartRotation: number = 0;
  inputTotalRotation: number = 0;
  inputInvestmentAmount: number = 0;

  constructor(
    private storageService: StorageService,
    private selectDateService: SelectDateService
  ) {}

  ngOnInit() {
    this.selectDateService.getSelectedDate().subscribe(async (selectedDate) => {
      const aveData = await this.storageService.get(AVERAGE_DATA_KEY_NAME);
      this.inputStartRotation =
        aveData?.[selectedDate.year]?.[selectedDate.month]?.[
          selectedDate.date
        ]?.[selectedDate.id]?.startRotation ?? 0;

      this.inputTotalRotation =
        aveData?.[selectedDate.year]?.[selectedDate.month]?.[
          selectedDate.date
        ]?.[selectedDate.id]?.totalRotation ?? 0;
    });
  }

  onStartRotationChange(value: number) {
    this.inputStartRotation = value;
  }

  onTotalRotationChange(value: number) {
    this.inputTotalRotation = value;
  }

  onInvestmentAmountChange(value: number) {
    this.inputInvestmentAmount = value;
  }
}
