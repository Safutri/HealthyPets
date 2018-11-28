import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KlienLamaPage } from './klien-lama';

@NgModule({
  declarations: [
    KlienLamaPage,
  ],
  imports: [
    IonicPageModule.forChild(KlienLamaPage),
  ],
})
export class KlienLamaPageModule {}
