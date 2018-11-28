import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
@Injectable()
export class APIProvider {
  idResepsionis:any;
  url = "https://admin-web-dot-healthypets-webservice.appspot.com/_ah/api/";

  constructor(public http: HttpClient) {
    console.log('Hello AntrianProvider Provider');
  }

  // AntrianKlien(idResepsionis) {
  //   return new Promise((resolve, reject) => {
  //     let Antri = this.url+'antrian/v1/daftar/'+idResepsionis;
  //     // let headers = new HttpHeaders();
  
  //     // buat panggilan ke API
  //     this.http.get(Antri).subscribe(
  //       data => {
  //       resolve(data);
  //     }, err => {
  //       reject(err);
  //     }, () => {
  //       reject();
  //     });
  //   });
  // }
  AntrianKlien(idResepsionis) {
    return new Promise((resolve, reject) => {
      let Antri = this.url+'klienantri/v1/daftarAntrian/'+idResepsionis;
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

  AllKlien(idResepsionis) {
    return new Promise((resolve, reject) => {
      let AllAntri = this.url+'klien/v1/daftarbyResepsionis/'+idResepsionis;
      // let headers = new HttpHeaders();
   
      this.http.get(AllAntri).subscribe(
        data => {
        resolve(data);
      }, err => {
        reject(err);
      }, () => {
        reject();
      });
    });
  }

  // get data klien 
  Profile(idResepsionis) {
    return new Promise((resolve, reject) => {
      let Profile = this.url+'resepsionis/v1/cari/'+idResepsionis;
      // let headers = new HttpHeaders();
   
      this.http.get(Profile).subscribe(
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

  // Hapus Klien
  HapusKlien(hapusKlienid) {
    return new Promise((resolve, reject) => {
      let deleteKlien = this.url+'klienantri/v1/antri/'+hapusKlienid;
      // let headers = new HttpHeaders();
   
      this.http.delete(deleteKlien).subscribe(
        data => {
        resolve(data);
      }, err => {
        reject(err);
      }, () => {
        reject();
      });
    });
  }

   // get Klien yang akan di update
   getUpdateKlien(idUser) {
    return new Promise((resolve, reject) => {
      let ubahUserPemilik = this.url+'klien/v1/klien/'+idUser;
 
      this.http.get(ubahUserPemilik).subscribe(
        data => {
        resolve(data);
      }, err => {
        reject(err);
      }, () => {
        reject();
      });
    });
  }

  //   // Hapus Klien
  //   /**
  //  * API untuk halaman konfirmasi NPM (update email dan foto berdasarkan npm) (DONE)
  //  * @param nama
  //  * @param ktp
  //  * @param telp
  //  * @param alamat
  //  * @param idUser
  //  * @param email
  //  * @param email_klinik
  //  * @param no_reg 
  //  */
  //   UpdateKlienPemilik(nama, ktp, telp, alamat, idUser, email, email_klinik, no_reg) {
  //     return new Promise((resolve, reject) => {
  //       let getUser = this.url+'klien/v1/ubah'; 
  //       this.http.put(getUser, "").subscribe(
  //         data => {
  //         resolve(data);
  //       }, err => {
  //         reject(err);
  //       }, () => {
  //         reject();
  //       });
  //     });
  //   }
  

  // Profile Resepsionis
  ProfileResepsionis(idResepsionis) {
    return new Promise((resolve, reject) => {
      let profRes = this.url+'resepsionis/v1/cari/'+idResepsionis;

      this.http.get(profRes).subscribe(
        data => {
        resolve(data);
      }, err => {
        reject(err);
      }, () => {
        reject();
      });
    });
  }

    // Cari Pemilik Hewan
    CariPemilik(idResepsionis, no_reg) {
      return new Promise((resolve, reject) => {
        let cariPemilikHewan = this.url+'klien/v1/data/'+idResepsionis+'/'+no_reg;
  
        this.http.get(cariPemilikHewan).subscribe(
          data => {
          resolve(data);
        }, err => {
          reject(err);
        }, () => {
          reject();
        });
      });
    }

      // Cari Pemilik Hewan
      getHewan(idUser) {
        return new Promise((resolve, reject) => {
          let dataHewan = this.url+'hewan/v1/daftar/'+idUser;
    
          this.http.get(dataHewan).subscribe(
            data => {
            resolve(data);
          }, err => {
            reject(err);
          }, () => {
            reject();
          });
        });
      }

        // get data Ambulator
        getAmb(idHewan) {     //items
          return new Promise((resolve, reject) => {
            let dataAmb = this.url+'ambulator/v1/jsonambulator/'+idHewan;
      
            this.http.get(dataAmb).subscribe(
              data => {
              resolve(data);
            }, err => {
              reject(err);
            }, () => {
              reject();
            });
          });
        }

          // get data Hewan
          getHewanById(idHewan) {   //per data
            return new Promise((resolve, reject) => {
              let dataHewan = this.url+'hewan/v1/cari/'+idHewan;
        
              this.http.get(dataHewan).subscribe(
                data => {
                resolve(data);
              }, err => {
                reject(err);
              }, () => {
                reject();
              });
            });
          }

           // get data Hasil Lab
           getLab(idHewan) {   //items
            return new Promise((resolve, reject) => {
              let dataLab = this.url+'lab/v1/daftar/'+idHewan;
        
              this.http.get(dataLab).subscribe(
                data => {
                resolve(data);
              }, err => {
                reject(err);
              }, () => {
                reject();
              });
            });
          } 

            // get data Hasil Lab
            getAmbById(idAmb) {   //items
              return new Promise((resolve, reject) => {
                let dataAmbById = this.url+'ambulator/v1/ambulator/'+idAmb;
          
                this.http.get(dataAmbById).subscribe(
                  data => {
                  resolve(data);
                }, err => {
                  reject(err);
                }, () => {
                  reject();
                });
              });
            }

            // "id" :this.idResepsionis, 
            // "email_klinik":this.email_klinik,
            // "nama": this.send.value['nama'],
            // "email": this.send.value['email'], 
            // "alamat": this.send.value['alamat'],
            // "no_reg": this.send.value['no_reg'],
            // "telp": this.send.value['telp'],
            // "ktp": this.send.value['ktp'] 
 
  /**
   * API untuk halaman konfirmasi NPM (update email dan foto berdasarkan npm) (DONE)
   * @param idResepsionis
   * @param email_klinik
   * @param nama
   * @param email
   * @param alamat 
   * @param no_reg 
   * @param telp
   * @param ktp
   */

   postDaftarKlien(idResepsionis, email_klinik, nama, email, alamat, no_reg, telp, ktp){
     return new Promise((resolve, reject)=>{
       let UrlDaftarPemilik = this.url + 'klien/v1/data/';
        let headers = new HttpHeaders();

       let data = { idResepsionis:idResepsionis, email_klinik:email_klinik, nama:nama, email:email, alamat:alamat, 
      no_reg:no_reg, telp:telp, ktp:ktp }

      this.http.post(UrlDaftarPemilik, data, { headers:headers }).subscribe(
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
  