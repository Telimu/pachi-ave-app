import { NgModule } from '@angular/core';
import { AverageCalculationPageComponentModule } from './average-calculation-page/average-calculation-page.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [],
  imports: [
    AverageCalculationPageComponentModule,
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [CommonModule, FormsModule, IonicModule],
})
export class PagesModule {}
