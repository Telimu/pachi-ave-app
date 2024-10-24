import { NgModule } from '@angular/core';
import { AverageCalculationPageComponent } from './average-calculation-page.component';
import { AverageCalculationPageRoutingModule } from './average-calculation-page-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RotationInputComponent } from './components/rotation-input/rotation-input.component';
import { InvestmentAmountInputComponent } from './components/investment-amount-input/investment-amount-input.component';
import { AverageDisplayComponent } from './components/average-display/average-display.component';
import { LayoutModule } from 'src/app/layout/layout.module';

@NgModule({
  imports: [
    AverageCalculationPageRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    LayoutModule,
  ],
  declarations: [
    AverageCalculationPageComponent,
    RotationInputComponent,
    InvestmentAmountInputComponent,
    AverageDisplayComponent,
  ],
})
export class AverageCalculationPageComponentModule {}
