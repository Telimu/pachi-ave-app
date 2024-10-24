import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { AVERAGE_DATA_KEY_NAME } from 'src/app/const/const';
import { SelectDateService, StorageService } from 'src/app/service';

@Component({
  selector: 'app-rotation-input',
  templateUrl: './rotation-input.component.html',
  styleUrls: ['./rotation-input.component.scss'],
})
export class RotationInputComponent implements OnInit {
  inputRotationForm!: FormGroup;

  @Output() startRotationChange = new EventEmitter<number>();
  @Output() totalRotationChange = new EventEmitter<number>();

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private selectDateService: SelectDateService
  ) {}

  async ngOnInit() {
    await this.setFormValue();
  }

  /**
   * @description フォームの初期値を設定
   */
  async setFormValue() {
    // 日付情報を取得後、その値から回転数の情報が存在するかチェックし、存在する場合初期値として設定。存在しない場合は0
    this.selectDateService.getSelectedDate().subscribe(async (selectedDate) => {
      const aveData = await this.getAverageData();

      const startRotation =
        aveData?.[selectedDate.year]?.[selectedDate.month]?.[
          selectedDate.date
        ]?.[selectedDate.id]?.startRotation ?? 0;

      const totalRotation =
        aveData?.[selectedDate.year]?.[selectedDate.month]?.[
          selectedDate.date
        ]?.[selectedDate.id]?.totalRotation ?? 0;

      this.inputRotationForm = this.fb.group({
        startRotation: [startRotation],
        totalRotation: [totalRotation],
      });

      // 初期値をemit
      this.startRotationChange.emit(startRotation);
      this.totalRotationChange.emit(totalRotation);

      // 値が更新されるたびにストレージに保存 & データをemit
      this.inputRotationForm.valueChanges.subscribe((value) => {
        this.storageService.setRotationData(
          selectedDate.id,
          value.startRotation,
          value.totalRotation
        );

        this.startRotationChange.emit(value.startRotation);
        this.totalRotationChange.emit(value.totalRotation);
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
