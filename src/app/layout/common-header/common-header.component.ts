import { Component, OnInit } from '@angular/core';
import { SelectDateService, StorageService } from 'src/app/service';

@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.scss'],
})
export class CommonHeaderComponent implements OnInit {
  constructor(
    private storageService: StorageService,
    private selectDateService: SelectDateService
  ) {}

  ngOnInit() {
    this.getPopoverListData();
  }

  clearButton = [
    {
      text: 'やっぱやめた',
      role: 'cancel',
    },
    {
      text: '消す',
      role: 'confirm',
      handler: () => {
        this.onClickTrashIcon();
      },
    },
  ];

  /**
   * @description ゴミ箱アイコンクリックで現在表示中にデータを初期化
   */
  onClickTrashIcon() {
    this.selectDateService.getSelectedDate().subscribe(async (selectedDate) => {
      await this.storageService.deleteDataById(
        selectedDate.year,
        selectedDate.month,
        selectedDate.date,
        selectedDate.id
      );

      window.location.reload();
    });
  }

  /**
   * @description 選択中のデータの一覧を取得
   */
  getPopoverListData() {
    this.selectDateService.getSelectedDate().subscribe(async (selectedDate) => {
      console.log(selectedDate);

      // 今サービスに登録されているデータ全件を取得する処理を作成して呼び出す
    });
  }
}
