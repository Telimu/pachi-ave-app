import { Component, Input, OnInit } from '@angular/core';
import { CALCULATION_BASE_AMOUNT } from 'src/app/const/const';

@Component({
  selector: 'app-average-display',
  templateUrl: './average-display.component.html',
  styleUrls: ['./average-display.component.scss'],
})
export class AverageDisplayComponent implements OnInit {
  @Input() startRotation: number = 0;
  @Input() totalRotation: number = 0;
  @Input() investmentAmount: number = 0;

  constructor() {}

  ngOnInit() {}

  get rotationCount(): string {
    const rotationCount = this.totalRotation - this.startRotation;
    if (rotationCount <= 0) return '-';
    return rotationCount.toString();
  }

  get averageRotation(): string {
    const selfRotation = this.totalRotation - this.startRotation;
    // 最低投資単位の 500円 で投資回数を割り出す
    const investmentAmountCount =
      this.investmentAmount / CALCULATION_BASE_AMOUNT;

    // 平均回転数がマイナスの場合は'-'を返す
    if (selfRotation <= 0 || investmentAmountCount <= 0) return '-';

    return (selfRotation / investmentAmountCount).toFixed(2);
  }

  setEmoji(average: string): string {
    if (Number(average) <= 15) {
      return '😩';
    } else if (Number(average) > 15 && Number(average) < 18) {
      return '😕';
    } else if (Number(average) >= 18 && Number(average) < 20) {
      return '😊';
    } else if (Number(average) >= 20) {
      return '😆';
    } else {
      return '🧐';
    }
  }
}
