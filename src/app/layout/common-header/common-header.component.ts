import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/service';

@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.scss'],
})
export class CommonHeaderComponent implements OnInit {
  constructor(private storageService: StorageService) {}

  ngOnInit() {}

  onClickTrashIcon() {
    this.storageService.remove('');
  }
}
