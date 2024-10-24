import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AverageCalculationPageComponent } from './average-calculation-page.component';

const routes: Routes = [
  {
    path: '',
    component: AverageCalculationPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AverageCalculationPageRoutingModule {}
