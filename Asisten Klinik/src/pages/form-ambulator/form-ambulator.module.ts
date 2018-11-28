import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormAmbulatorPage } from './form-ambulator';

@NgModule({
  declarations: [
    FormAmbulatorPage,
  ],
  imports: [
    IonicPageModule.forChild(FormAmbulatorPage),
  ],
})
export class FormAmbulatorPageModule {}
