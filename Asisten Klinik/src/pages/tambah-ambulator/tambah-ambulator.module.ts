import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TambahAmbulatorPage } from './tambah-ambulator';

@NgModule({
  declarations: [
    TambahAmbulatorPage,
  ],
  imports: [
    IonicPageModule.forChild(TambahAmbulatorPage),
  ],
})
export class TambahAmbulatorPageModule {}
