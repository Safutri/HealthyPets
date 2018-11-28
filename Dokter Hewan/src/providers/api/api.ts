import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
@Injectable()
export class ApiProvider {
  url = "https://admin-web-dot-healthypets-webservice.appspot.com/_ah/api/";

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  AntrianKlien(idDrh) {
    return new Promise((resolve, reject) => {
      let Antri = this.url+'klienantri/v1/antri?drh_jaga='+idDrh;
      // let headers = new HttpHeaders();
  
      // buat panggilan ke API
      this.http.get(Antri).subscribe(
        data => {
        resolve(data);
      }, err => {
        reject(err);
      }, () => {
        reject();
      });
    });
  }

   // get Klien yang akan dihapus
   getHapusKlien(idHapusKlien) {
    return new Promise((resolve, reject) => {
      let deleteKlien = this.url+'klienantri/v1/cari/'+idHapusKlien;
      // let headers = new HttpHeaders();
   
      this.http.get(deleteKlien).subscribe(
        data => {
        resolve(data);
      }, err => {
        reject(err);
      }, () => {
        reject();
      });
    });
  }

  getKlien(idDrh) {
    return new Promise((resolve, reject) => {
      let klien = this.url+'drh/v1/cari/'+idDrh;
      // let headers = new HttpHeaders();
  
      // buat panggilan ke API
      this.http.get(klien).subscribe(
        data => {
        resolve(data);
      }, err => {
        reject(err);
      }, () => {
        reject();
      });
    });
  }

  getAllAmbulators(kode_hewan) {
    return new Promise((resolve, reject) => {
      let klien = this.url+'ambulator/v1/dataAmb?kode_hewan='+kode_hewan;
      // let headers = new HttpHeaders();
  
      // buat panggilan ke API
      this.http.get(klien).subscribe(
        data => {
        resolve(data);
      }, err => {
        reject(err);
      }, () => {
        reject();
      });
    });
  }
  
  getKlienReg(no_reg) {
    return new Promise((resolve, reject) => {
      let klienReg = this.url+'klien/v1/klien/search/'+no_reg;
      // let headers = new HttpHeaders();
  
      // buat panggilan ke API
      this.http.get(klienReg).subscribe(
        data => {
        resolve(data);
      }, err => {
        reject(err);
      }, () => {
        reject();
      });
    });
  }

  getHewanByKD(kode_hewan) {
    return new Promise((resolve, reject) => {
      let hewanKD = this.url+'hewan/v1/data/'+kode_hewan;
      // let headers = new HttpHeaders();
  
      // buat panggilan ke API
      this.http.get(hewanKD).subscribe(
        data => {
        resolve(data);
      }, err => {
        reject(err);
      }, () => {
        reject();
      });
    });
  }

  getAmbByDrHewan(idAmb){
    return new Promise((resolve, reject) => {
      let Ambs = this.url+'ambulator/v1/ambulator/'+idAmb;
      // let headers = new HttpHeaders();
  
      // buat panggilan ke API
      this.http.get(Ambs).subscribe(
        data => {
        resolve(data);
      }, err => {
        reject(err);
      }, () => {
        reject();
      });
    });
  }

  getHewans(kode_hewan){
    return new Promise((resolve, reject) => {
      let kdHewan = this.url+'hewan/v1/data/'+kode_hewan;
      // let headers = new HttpHeaders();
  
      // buat panggilan ke API
      this.http.get(kdHewan).subscribe(
        data => {
        resolve(data);
      }, err => {
        reject(err);
      }, () => {
        reject();
      });
    });
  }
  

}
