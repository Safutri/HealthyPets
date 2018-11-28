import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RmPage } from './rm';

@NgModule({
  declarations: [
    RmPage,
  ],
  imports: [
    IonicPageModule.forChild(RmPage),
  ],
})
export class RmPageModule {}
