import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SlidesHomePage } from './slides-home';

@NgModule({
  declarations: [
    SlidesHomePage,
  ],
  imports: [
    IonicPageModule.forChild(SlidesHomePage),
  ],
})
export class SlidesHomePageModule {}
