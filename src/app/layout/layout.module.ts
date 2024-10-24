import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonHeaderComponent } from './common-header/common-header.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [CommonHeaderComponent],
  exports: [CommonHeaderComponent],
})
export class LayoutModule {}
