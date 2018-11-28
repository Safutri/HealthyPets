import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TambahHewanPage } from './tambah-hewan';

@NgModule({
  declarations: [
    TambahHewanPage,
  ],
  imports: [
    IonicPageModule.forChild(TambahHewanPage),
  ],
})
export class TambahHewanPageModule {}
