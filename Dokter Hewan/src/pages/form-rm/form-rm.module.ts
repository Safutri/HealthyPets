import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormRmPage } from './form-rm';

@NgModule({
  declarations: [
    FormRmPage,
  ],
  imports: [
    IonicPageModule.forChild(FormRmPage),
  ],
})
export class FormRmPageModule {}
