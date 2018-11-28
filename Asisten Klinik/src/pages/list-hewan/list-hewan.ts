import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TambahHewanPage } from "../tambah-hewan/tambah-hewan"; 
import { HttpClient } from '@angular/common/http';
import { UbahPemilikHewanPage } from '../ubah-pemilik-hewan/ubah-pemilik-hewan';
import { APIProvider } from '../../providers/api/api';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-list-hewan',
  templateUrl: 'list-hewan.html',
})
export class ListHewanPage { 
  idUser: any; 
  users: any;
  hewan: any; email_klinik:string;
  datam:any
  items: Array<any> = [];
  itemString: string;
  idResepsionis:any;

  datas = {
    nama: "",
    no_reg: "",
    alamat: "",
    email: "",
    ktp:"",
    telp:""
  };
 
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public loadingCtrl: LoadingController,
    public Hewan: APIProvider,
    public http: HttpClient) {

        this.idUser = navParams.get("id");
        console.log("id Klien di page list hewan "+this.idUser); 
        
        this.idResepsionis = localStorage.getItem('idResepsionisLocal');
        console.log("id local di halaman daftar: "+this.idResepsionis);   

        this.email_klinik= localStorage.getItem('emailLocal');
        console.log("email klinik local dihalaman daftar: "+this.email_klinik);
 

    this.getUser(this.idUser);
    this.getHewan(this.idUser);
  }

  getUser(idUser){ 
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    }); 

    this.Hewan.getUpdateKlien(idUser)
        .then((data)=>{            
          this.datas['nama'] = data['nama'];
          this.datas['no_reg'] = data['no_reg'];
          localStorage.setItem('noregLocal', this.datas['no_reg']);
          this.datas['alamat'] = data['alamat'];
          this.datas['telp'] = data['telp'];
          this.datas['email'] = data['email'];
          this.datas['ktp'] = data['ktp'];
          localStorage.setItem('ktpLocal', this.datas['ktp']);
          loader.present();
          setTimeout(() => {
            loader.dismiss();
          }, 3000)
            })
            .catch((err) => {
              console.error('Terjadi kesalahan: '+err);
            })
            .catch(() => {
              console.error('data tidak ada di datastore!');
            })  
  } 
 

  getHewan(idUser){ 
    this.Hewan.getHewan(idUser)
    .then(
      (hasil) => {
        console.log('mengambil daftar antrian');
        this.items = [];
        
        for(let i = 0; i < hasil['items'].length; i++) {
          this.items.push({
            idHewan : hasil['items'][i]['id'],
            namaHewan : hasil['items'][i]['nama'],
            jenis: hasil['items'][i]['jenis'],
            ras : hasil['items'][i]['ras'],
          });
        } 
      this.itemString = JSON.stringify(this.items);
      })
    .catch(
      error => {
        console.error('Terjadi kesalahan: '+error);
      })
      .catch(
        () => {
          console.error('data tidak ada di datastore!');
      });  
  }
   
  amb(id){
    this.navCtrl.push(TabsPage, {
      "id": id,
      "idUser": this.idUser
    });
    console.log("idHewan"+ id);

  }

  tbhewan(id){
      this.navCtrl.push(TambahHewanPage, {
        "id": this.idUser  
      });
    console.log("id"+this.idUser);
   }


   ubahPemilik(){
     this.navCtrl.push(UbahPemilikHewanPage, {
       "idUser": this.idUser
     })
   }
}
