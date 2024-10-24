import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AVERAGE_DATA_KEY_NAME } from 'src/app/const/const';
import { SelectDateService, StorageService } from 'src/app/service';

@Component({
  selector: 'app-investment-amount-input',
  templateUrl: './investment-amount-input.component.html',
  styleUrls: ['./investment-amount-input.component.scss'],
})
export class InvestmentAmountInputComponent implements OnInit {
  @Output() investmentAmount = new EventEmitter<number>();

  inputInvestmentAmountForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private selectDateService: SelectDateService
  ) {}

  ngOnInit() {
    this.setFormValue();
  }

  addInvestmentAmount(investmentAmount: number) {
    const currentInvestmentAmoun =
      this.inputInvestmentAmountForm.get('investmentAmount')?.value ?? 0;

    console.log(Number(currentInvestmentAmoun) + investmentAmount);

    this.inputInvestmentAmountForm
      .get('investmentAmount')
      ?.setValue(Number(currentInvestmentAmoun) + investmentAmount);
  }

  reduceInvestmentAmount(investmentAmount: number) {
    const currentInvestmentAmoun =
      this.inputInvestmentAmountForm.get('investmentAmount')?.value ?? 0;
    if (currentInvestmentAmoun <= 0) {
      this.inputInvestmentAmountForm.get('investmentAmount')?.setValue(0);
    } else {
      this.inputInvestmentAmountForm
        .get('investmentAmount')
        ?.setValue(currentInvestmentAmoun - investmentAmount);
    }
  }

  /**
   * @description フォームの初期値を設定
   */
  setFormValue() {
    this.selectDateService.getSelectedDate().subscribe(async (selectedDate) => {
      const aveData = await this.getAverageData();

      const investmentAmount =
        aveData?.[selectedDate.year]?.[selectedDate.month]?.[
          selectedDate.date
        ]?.[selectedDate.id]?.investmentAmount ?? 0;

      this.inputInvestmentAmountForm = this.fb.group({
        investmentAmount: [investmentAmount],
      });

      // 初期値をemit
      this.investmentAmount.emit(investmentAmount);

      // 値が更新されるたびにストレージに保存 & データをemit
      this.inputInvestmentAmountForm.valueChanges.subscribe((value) => {
        this.storageService.setInvestmentAmountData(
          selectedDate.id,
          value.investmentAmount
        );

        this.investmentAmount.emit(value.investmentAmount);
      });
    });
  }

  /**
   * @description 平均データの取得処理 初期化タイミングの問題で1回の取得だとundefinedになってしまうので取得できるまでリクエスト 苦肉の策
   */
  async getAverageData() {
    let aveData;
    // 初期化の都合でデータが取れるまで繰り返し取得
    while (true) {
      aveData = await this.storageService.get(AVERAGE_DATA_KEY_NAME);
      if (aveData) {
        break;
      }
    }
    return aveData;
  }
}
