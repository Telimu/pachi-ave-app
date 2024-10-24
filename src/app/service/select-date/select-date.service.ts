import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface SelectedDate {
  id: string;
  year: string;
  month: string;
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class SelectDateService {
  private selectedDate = new BehaviorSubject<SelectedDate>({
    id: '',
    year: '',
    month: '',
    date: '',
  });

  constructor() {}

  /**
   * @description 現在選択中の年,月,日 情報を取得
   */
  public getSelectedDate(): Observable<SelectedDate> {
    return this.selectedDate.asObservable();
  }

  /**
   * @description 年月日情報の更新 ※から文字の場合は該当の情報が更新しない
   */
  public setSelectedDate(
    id: string,
    year: string,
    month: string,
    date: string
  ): void {
    this.selectedDate.next({
      id: id ?? '1',
      year: year.length !== 0 ? year : this.selectedDate.value.year,
      month: month.length !== 0 ? month : this.selectedDate.value.month,
      date: date.length !== 0 ? date : this.selectedDate.value.date,
    });
  }
}
