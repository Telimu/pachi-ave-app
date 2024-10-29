import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AverageCalculationPageComponent } from '../pages/average-calculation-page/average-calculation-page.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  averageCalculation = AverageCalculationPageComponent;

  constructor(private navCtrl: NavController) {}

  navigateToAverageCalculationPage() {
    // memo: アニメーションの遷移時の描画が綺麗じゃないので直したい
    this.navCtrl.navigateForward('average-calculation', {
      animated: true,
      animationDirection: 'forward',
    });
  }
}
