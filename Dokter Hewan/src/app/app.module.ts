import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import { File } from "@ionic-native/file";
import { FileOpener } from "@ionic-native/file-opener";
import {BrowserModule} from '@angular/platform-browser';
import { GooglePlus } from '@ionic-native/google-plus';
import {HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import { HttpModule } from "@angular/http";
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from '@ionic-native/keyboard';
import {ActivityService} from "../services/activity-service";
import {WeatherProvider} from "../services/weather";
import {MyApp} from "./app.component";
import {SettingsPage} from "../pages/settings/settings";
import {HomePage} from "../pages/home/home";
import {LoginPage} from "../pages/login/login";
import {NotificationsPage} from "../pages/notifications/notifications"; 
import { KlienLamaPage } from "../pages/klien-lama/klien-lama"; 
import { ProfileUserPage } from "../pages/profile-user/profile-user";
import { ListHewanPage } from "../pages/list-hewan/list-hewan";
import { ListKonsultasiPage } from "../pages/list-konsultasi/list-konsultasi";
import { DataKonsultasiPage } from "../pages/data-konsultasi/data-konsultasi";
import { HasilLabPage } from "../pages/hasil-lab/hasil-lab";
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { RekamMedikPage } from "../pages/rekam-medik/rekam-medik";
import { AllRawatPage } from "../pages/all-rawat/all-rawat";
import { FormRmPage } from "../pages/form-rm/form-rm";
import { AllKonsultasiPage } from "../pages/all-konsultasi/all-konsultasi";
import { AmbulatorKlienPage } from "../pages/ambulator-klien/ambulator-klien";
import { LabKlienPage } from "../pages/lab-klien/lab-klien";
import { TabsPage } from '../pages/tabs/tabs';
import { TabsDataPage } from '../pages/tabs-data/tabs-data';
import { LabsPage } from "../pages/labs/labs";
import { AllLabPage } from "../pages/all-lab/all-lab";
import { RmKlienPage } from "../pages/rm-klien/rm-klien";
import { TambahRmPage } from "../pages/tambah-rm/tambah-rm";
import { RmDrhPage } from "../pages/rm-drh/rm-drh";  
import { ApiProvider } from '../providers/api/api';
import { RmPage } from "../pages/rm/rm";
import { LabAmbPage } from "../pages/lab-amb/lab-amb";


@NgModule({
  declarations: [
    MyApp, 
    RmPage,
    TabsPage,
    RmDrhPage,
    LabsPage,
    TambahRmPage,
    RmKlienPage,
    AllLabPage,
    TabsDataPage,
    SettingsPage,
    AllRawatPage,
    HomePage,
    LoginPage, 
    NotificationsPage, 
    KlienLamaPage,   
    ProfileUserPage, 
    ListHewanPage,  
    ListKonsultasiPage, 
    DataKonsultasiPage, 
    HasilLabPage,
    RekamMedikPage,
    FormRmPage,
    AllKonsultasiPage,
    AmbulatorKlienPage,
    LabKlienPage,
    LabAmbPage
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
    RmPage,
    TabsPage,
    RmDrhPage,
    LabsPage,
    TambahRmPage,
    RmKlienPage,
    AllLabPage,
    TabsDataPage,
    SettingsPage,
    AllRawatPage,
    HomePage,
    LoginPage, 
    NotificationsPage, 
    KlienLamaPage,  
    ProfileUserPage, 
    ListHewanPage,  
    ListKonsultasiPage, 
    DataKonsultasiPage, 
    HasilLabPage,
    RekamMedikPage,
    FormRmPage,
    AllKonsultasiPage,
    AmbulatorKlienPage,
    LabKlienPage,
    LabAmbPage
    
  ],
  providers: [
    Storage,
    StatusBar,
    SplashScreen,
    Keyboard,
    ActivityService,
    WeatherProvider,
    AuthServiceProvider,
    GooglePlus,
    File,
    FileOpener,
    ApiProvider
    
  ]
})

export class AppModule {
}
