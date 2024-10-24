import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AVERAGE_DATA_KEY_NAME } from 'src/app/const/const';
import { SelectDateService } from '..';

export interface RotationData {
  storeName: string;
  standName: string;
  standNumber: string;
  investmentAmount: string;
  startRotation: string;
  totalRotation: string;
  comment: string;
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(
    private storage: Storage,
    private selectDateService: SelectDateService
  ) {
    this.init();
    this.setDefaultDate();
  }

  /**
   * @description ストレージの初期化
   */
  async init() {
    this._storage = await this.storage.create();

    this.checkTodayData();
  }

  /**
   * @description データの追加,更新
   */
  public async set(key: string, value: any) {
    if (this._storage) {
      // 既存のデータを取得
      const existingData = (await this._storage.get(key)) || {};

      // 新しいデータをマージ
      const mergedData = { ...existingData, ...value };

      // マージしたデータをセット
      await this._storage.set(key, mergedData);
    }
  }

  /**
   * @description データの取得
   */
  public async get(key: string) {
    if (this._storage) {
      return await this._storage.get(key);
    }
  }

  /**
   * @description データの削除
   */
  public async remove(key: string) {
    if (this._storage) {
      await this._storage.remove(key);
    }
  }

  /**
   * @deprecated 表示中データの初期化（idはそのまま）
   */
  public async deleteDataById(
    year: string,
    month: string,
    date: string,
    id: string
  ) {
    const aveData = (await this.get(AVERAGE_DATA_KEY_NAME)) || {};
    const currentYearData = aveData[year] || {};
    const currentMonthData = currentYearData[month] || {};
    const currentDateData = currentMonthData[date] || {};
    const currentIdData = currentDateData[id] || ({} as RotationData);

    currentDateData[id] = {
      ...currentIdData,
      storeName: '',
      standName: '',
      standNumber: '',
      investmentAmount: '',
      startRotation: '',
      totalRotation: '',
      comment: '',
    };

    currentMonthData[date] = currentDateData;
    currentYearData[month] = currentMonthData;
    aveData[year] = currentYearData;

    await this.set(AVERAGE_DATA_KEY_NAME, aveData);
  }

  /**
   * @description 当日データの存在チェック 存在しなければ新しく追加
   */
  public async checkTodayData() {
    // chatGptに教えてもらってなんか動いた → あとで解読する
    const currentYear = new Date().getFullYear().toString();
    const currentMonth = (new Date().getMonth() + 1).toString();
    const todayDate = new Date().getDate().toString();

    // アベレージが格納されている全てのデータを取得
    const aveData = (await this.get(AVERAGE_DATA_KEY_NAME)) || {};

    // その中から現在の年のデータを取得 存在しなければ初期化
    const currentYearData = aveData[currentYear] || {};

    // 現在の月のデータが存在しない場合、空オブジェクトを初期化
    const currentMonthData = currentYearData[currentMonth] || {};

    // 今日の日付のデータが存在しなければ、空オブジェクトを初期化
    const currentDateData = currentMonthData[todayDate] || {};

    // 1番目のデータがなければデータを追加
    if (!currentDateData['1']) {
      currentDateData['1'] = {
        storeName: '',
        standName: '',
        standNumber: '',
        investmentAmount: '',
        startRotation: '200',
        totalRotation: '300',
        comment: '',
      };
    }

    // 日データに新しいデータを追加
    currentMonthData[todayDate] = currentDateData;

    // 月データに新しい日付のデータを追加
    currentYearData[currentMonth] = currentMonthData;

    // aveDataに年データを追加
    aveData[currentYear] = currentYearData;

    // データを保存
    await this.set(AVERAGE_DATA_KEY_NAME, aveData);
  }

  /**
   * @description 現在の選択されている年月日,idのストレージに回転数を保存する処理
   */
  public async setRotationData(
    id: string,
    startRotation: string,
    totalRotation: string
  ) {
    // 選択されている年月日,idを取得
    this.selectDateService.getSelectedDate().subscribe(async (selectedDate) => {
      // アベレージデータを取得
      const aveData = (await this.get(AVERAGE_DATA_KEY_NAME)) || {};

      // 選択されている年のデータを取得 存在しなければ初期化
      const currentYearData = aveData[selectedDate.year] || {};

      // 選択されている月のデータを取得 存在しなければ初期化
      const currentMonthData = currentYearData[selectedDate.month] || {};

      // 選択されている日のデータを取得 存在しなければ初期化
      const currentDateData = currentMonthData[selectedDate.date] || {};

      // 選択されているidのデータを取得 存在しなければ初期化
      const currentIdData: RotationData =
        currentDateData[id] || ({} as RotationData);

      // 選択されているidのデータの回転数を追加
      const newCurrentIdData = {
        ...currentIdData,
        startRotation: startRotation.toString(),
        totalRotation: totalRotation.toString(),
      };

      // 選択されている日のデータにidのデータを追加
      currentDateData[id] = newCurrentIdData;

      // 選択されている月のデータに日のデータを追加
      currentMonthData[selectedDate.date] = currentDateData;

      // 選択されている年のデータに月のデータを追加
      currentYearData[selectedDate.month] = currentMonthData;

      // アベレージデータに年のデータを追加
      aveData[selectedDate.year] = currentYearData;

      // データを保存
      await this.set(AVERAGE_DATA_KEY_NAME, aveData);
    });
  }

  /**
   * @description 現在の選択されている年月日,idのストレージに投資額を保存する処理
   */
  public async setInvestmentAmountData(id: string, investmentAmount: string) {
    this.selectDateService.getSelectedDate().subscribe(async (selectedDate) => {
      const aveData = (await this.get(AVERAGE_DATA_KEY_NAME)) || {};

      const currentYearData = aveData[selectedDate.year] || {};
      const currentMonthData = currentYearData[selectedDate.month] || {};
      const currentDateData = currentMonthData[selectedDate.date] || {};
      const currentIdData: RotationData =
        currentDateData[id] || ({} as RotationData);
      const newCurrentIdData = {
        ...currentIdData,
        investmentAmount: investmentAmount.toString(),
      };

      currentDateData[id] = newCurrentIdData;
      currentMonthData[selectedDate.date] = currentDateData;
      currentYearData[selectedDate.month] = currentMonthData;
      aveData[selectedDate.year] = currentYearData;

      await this.set(AVERAGE_DATA_KEY_NAME, aveData);
    });
  }

  /**
   * @description 日付管理serviceに初期値登録 ※初期値は現在の日付
   */
  public async setDefaultDate() {
    const currentYear = new Date().getFullYear().toString();
    const currentMonth = (new Date().getMonth() + 1).toString();
    const todayDate = new Date().getDate().toString();

    // 日付管理serviceに初期値登録
    this.selectDateService.setSelectedDate(
      '1',
      currentYear,
      currentMonth,
      todayDate
    );
  }
}
