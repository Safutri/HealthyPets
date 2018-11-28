import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TambahRmPage } from './tambah-rm';

@NgModule({
  declarations: [
    TambahRmPage,
  ],
  imports: [
    IonicPageModule.forChild(TambahRmPage),
  ],
})
export class TambahRmPageModule {}
