import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListKonsultasiPage } from './list-konsultasi';

@NgModule({
  declarations: [
    ListKonsultasiPage,
  ],
  imports: [
    IonicPageModule.forChild(ListKonsultasiPage),
  ],
})
export class ListKonsultasiPageModule {}
