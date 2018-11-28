import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import { HttpModule } from "@angular/http";
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from '@ionic-native/keyboard';
import { GooglePlus } from '@ionic-native/google-plus';
import {ActivityService} from "../services/activity-service";
import {WeatherProvider} from "../services/weather";
import {MyApp} from "./app.component";
// import pdf doc
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { DaftarKlienPage } from "../pages/daftar-klien/daftar-klien";
import { KlienLamaPage } from "../pages/klien-lama/klien-lama";
import { DaftarHewanPage } from "../pages/daftar-hewan/daftar-hewan";
import { DaftarAmbulatorPage } from "../pages/daftar-ambulator/daftar-ambulator";
import { FormAmbulatorPage } from "../pages/form-ambulator/form-ambulator";
import { ProfileUserPage } from "../pages/profile-user/profile-user";
import { ListHewanPage } from "../pages/list-hewan/list-hewan";
import { TambahHewanPage } from "../pages/tambah-hewan/tambah-hewan";
import { TambahAmbulatorPage } from "../pages/tambah-ambulator/tambah-ambulator";
import { HapusAntrianPage } from "../pages/hapus-antrian/hapus-antrian";
import { AntrianHewanPage } from '../pages/antrian-hewan/antrian-hewan';
import { SlidesHomePage } from '../pages/slides-home/slides-home';
import { AuthServiceProvider } from '../providers/auth-service/auth-service'; 
import { AntrianPage } from '../pages/antrian/antrian'; 
import { AllAntrianPage } from '../pages/all-antrian/all-antrian'; 
import { TambahLabPage } from '../pages/tambah-lab/tambah-lab'; 
import { HasilLabPage } from '../pages/hasil-lab/hasil-lab'; 
import { PilihDrhPage } from '../pages/pilih-drh/pilih-drh'; 
import { AntriDrhPage } from '../pages/antri-drh/antri-drh'; 
import { UbahPemilikHewanPage } from '../pages/ubah-pemilik-hewan/ubah-pemilik-hewan'; 
import { FileTransfer } from '@ionic-native/file-transfer';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { TabsPage } from '../pages/tabs/tabs';
import { CariKtpPage } from '../pages/cari-ktp/cari-ktp';
import { APIProvider } from '../providers/api/api';
import { HasilListPage } from "../pages/settings/hasil-list";
import { LabAmbPage } from "../pages/lab-amb/lab-amb";
import { TabsCariPage } from "../pages/tabs-cari/tabs-cari";

@NgModule({
  declarations: [
    MyApp,
    TabsCariPage,
    HasilListPage,
    HomePage,
    LoginPage,
    TabsPage,
    SlidesHomePage,
    AntrianPage, 
    LabAmbPage,
    DaftarKlienPage,
    KlienLamaPage,
    DaftarHewanPage, 
    DaftarAmbulatorPage,
    FormAmbulatorPage, 
    ProfileUserPage, 
    ListHewanPage, 
    TambahHewanPage, 
    TambahAmbulatorPage,  
    HapusAntrianPage,
    AntrianHewanPage,
    AllAntrianPage,
    TambahLabPage,
    HasilLabPage,
    PilihDrhPage,
    AntriDrhPage,
    UbahPemilikHewanPage,
    CariKtpPage 
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsCariPage,
    HasilListPage,
    HomePage,
    LoginPage,
    TabsPage,
    AntrianPage,
    SlidesHomePage, 
    LabAmbPage,  
    DaftarKlienPage,
    KlienLamaPage,
    DaftarHewanPage, 
    DaftarAmbulatorPage, 
    FormAmbulatorPage,
    ProfileUserPage, 
    ListHewanPage,
    TambahHewanPage, 
    TambahAmbulatorPage,  
    HapusAntrianPage,
    AntrianHewanPage, 
    AllAntrianPage,
    TambahLabPage,
    HasilLabPage,
    PilihDrhPage,
    AntriDrhPage,
    UbahPemilikHewanPage,
    CariKtpPage, 
  ],
  providers: [
    Storage,
    StatusBar,
    SplashScreen,
    Keyboard,
    ActivityService,
    WeatherProvider,
    AuthServiceProvider,
    File,
    FileOpener,
    GooglePlus,
    FileTransfer,
    DocumentViewer,
    APIProvider
  ]
})

export class AppModule {
}
