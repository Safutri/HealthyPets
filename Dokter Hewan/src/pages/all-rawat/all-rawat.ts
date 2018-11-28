import { Component } from '@angular/core';
import { NavController, 
  LoadingController,
  NavParams, 
  ToastController} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { TabsPage } from "../tabs/tabs";
import { ApiProvider } from '../../providers/api/api';
 
@Component({
  selector: 'page-all-rawat',
  templateUrl: 'all-rawat.html',
})

export class AllRawatPage {
  no_reg: any; 
   klien; 
   hewan;
   datam;
   namaHewan;
   amb;
   idAmb; idDrh;
   idAntrian; 
   nama:String;
   kode_hewan: String;
   namahewan: String; 
   ras: String;
   jenis: String;
   umur: String;
   tgl: any;   
   prognosa: String; 
   namaDrh: String; 
   urlKlien = 'https://healthypets-webservice.appspot.com/_ah/api/klien/v1/klien/search/';
   urlHewan = 'https://healthypets-webservice.appspot.com/_ah/api/hewan/v1/data/';
   urlAmb = 'https://healthypets-webservice.appspot.com/_ah/api/ambulator/v1/dataAmb?kode_hewan=';
   items: Array<any> = [];
   itemString: string;
   KlienReg = {
    nama: "",
    no_reg:""
  };

  HewanKD = {
    namahewan: "",
    umur:"",
    jenis:""
  };

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public allRawat: ApiProvider) { 

          
        this.idAntrian = navParams.get("idAntrian");
        this.no_reg = navParams.get("no_reg");
        this.kode_hewan = navParams.get("kode_hewan");
        this.idDrh = navParams.get("idDrh");        
        this.namaDrh = navParams.get("namaDrh");

        console.log("id Antrian "+ this.idAntrian)
        console.log("idDrh "+ this.idDrh)
        console.log("no_reg "+ this.no_reg)
        console.log("kode_hewan "+ this.kode_hewan) 

        this.getAllAmb();
        this.getKlien();  
        this.getHewan();
    } 

  // getAllAmb(kode_hewan){
  //    let loader = this.loadingCtrl.create({
  //     content: "Please wait..."
  //   }); 
  //   this.allRawat.getAllAmbulators(kode_hewan)
  //   .then(
  //     (hasil) => {
  //       console.log('mengambil daftar antrian');
  //       this.items = [];
        
  //       for(let i = 0; i < hasil['items'].length; i++) {
  //         this.items.push({
  //          idAmb : hasil['items'][i]['id'],
  //           tgl : hasil['items'][i]['tgl'] 
  //         });
  //         localStorage.setItem('idAmb', hasil['items'][i]['id']);
  //         setTimeout(() => {
  //                   loader.dismiss();  
  //                 }, 3000);
  //       } 
  //     this.itemString = JSON.stringify(this.items);
  //     })
  //   .catch(
  //     error => {
  //       console.error('Terjadi kesalahan: '+error);
  //     })
  //     .catch(
  //       () => {
  //       console.error('Kembalian kosong!');
  //     });  
      
    // let loader = this.loadingCtrl.create({
    //   content: "Please wait..."
    // }); 
    //   loader.present();
    // this.http.get(this.urlAmb+this.kode_hewan).subscribe(
    //   data => {
    //      console.log(data);
    //      this.datam = data;
    //       this.amb = this.datam.items; 
    //        setTimeout(() => {
    //         loader.dismiss();  
    //       }, 3000);
    //   }, err => {
    //     console.log(err);  
    //   }
  
    // );
  // }

  getAllAmb(){
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    }); 
      loader.present();
    this.http.get(this.urlAmb+this.kode_hewan).subscribe(
      data => {
         console.log(data);
         this.datam = data;
          this.amb = this.datam.items; 
           setTimeout(() => {
            loader.dismiss();  
          }, 3000);
      }, err => {
        console.log(err); 
        let toast = this.toastCtrl.create({
          message: 'Hewan ini belum pernah berobat',
          duration: 2000,
          position: 'middle'
        });    
        toast.present(toast);  
         
      }
  
    );
  }

  // getKlien(no_reg){ 
  //   this.allRawat.getKlienReg(no_reg)
  //   .then((data)=>{
  //     this.KlienReg['nama'] = data['nama'];
  //     this.KlienReg['no_reg'] = data['no_reg'];
  //       })
  //       .catch((err) => {
  //         console.error('Terjadi kesalahan: '+err);
  //       })
  //       .catch(() => {
  //         console.error('Kembalian kosong!');
  //       }) 
  //   // this.http.get(this.urlKlien+this.no_reg).subscribe(
  //   //   data=> { 
  //   //     this.klien = data; 
  //   //       this.nama = this.klien.nama;  
  //   //         this.no_reg = this.klien.no_reg; 
  //   //   },
  //   //   err => {
  //   //     console.log(err);
  //   //   }
  //   // );  
  // } 

  getKlien(){ 
    this.http.get(this.urlKlien+this.no_reg).subscribe(
      data=> { 
        this.klien = data; 
          this.nama = this.klien.nama;  
            this.no_reg = this.klien.no_reg; 
      },
      err => {
        console.log(err);
      }
    );  
  } 

  // getHewan(kode_hewan){ 
  //   this.allRawat.getHewanByKD(kode_hewan)
  //   .then((data)=>{
  //     this.HewanKD['namahewan'] = data['nama'];
  //     this.HewanKD['umur'] = data['umur'];
  //     this.HewanKD['jenis'] = data['jenis'];
  //       })
  //       .catch((err) => {
  //         console.error('Terjadi kesalahan: '+err);
  //       })
  //       .catch(() => {
  //         console.error('Kembalian kosong!');
  //       }) 
  //   // this.http.get(this.urlHewan+this.kode_hewan).subscribe(
  //   //   data=> { 
  //   //     this.hewan = data; 
  //   //       this.namahewan = this.hewan.nama;  
  //   //         this.ras = this.hewan.ras;
  //   //           this.jenis = this.hewan.jenis;
  //   //             this.umur = this.hewan.umur; 
  //   //   },
  //   //   err => {
  //   //     console.log(err);
  //   //   }
  //   // );
  // } 

  getHewan(){ 
    this.http.get(this.urlHewan+this.kode_hewan).subscribe(
      data=> { 
        this.hewan = data; 
          this.namahewan = this.hewan.nama;  
            this.ras = this.hewan.ras;
              this.jenis = this.hewan.jenis;
                this.umur = this.hewan.umur; 
      },
      err => {
        console.log(err);
      }
    );
  }

  famb(no_reg, kode_hewan, id){ 
         this.navCtrl.push(TabsPage, {
        'no_reg' : no_reg,
          'kode_hewan' : kode_hewan,
            'idAmb' : id,
              'idDrh' : this.idDrh,
                 'namaDrh': this.namaDrh,
                     'idAntrian' : this.idAntrian
        });
  }
   
}
