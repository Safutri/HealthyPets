import { Component } from '@angular/core';
import {NavController, 
  LoadingController, 
  ToastController, 
  NavParams, 
  AlertController, 
  App } from "ionic-angular";
import { HomePage } from "../home/home";
import { HttpClient } from '@angular/common/http';
import {Validators, FormBuilder } from '@angular/forms';
import { ApiProvider } from '../../providers/api/api';
 
@Component({
  selector: 'page-form-rm',
  templateUrl: 'form-rm.html',
})
export class FormRmPage {
  idAntrian;
amb; klien;
hewan; id_hewan;
namaHewan;
namahewan:String;
ras:String; diagnosa:String
gender:String; obat:String;
jenis: String; status_awal:String;
umur:String; terapi:String;
nama:String; id:any; idDrh; tgl;
telp:String; idAmb; lain_rm:String; 
no_reg:any; kode_hewan; namaDrh;
idAntrianResepsionis:any; 
send:any;
isenabled=null;
url = 'https://admin-web-dot-healthypets-webservice.appspot.com/_ah/api/'; 
// urlDeleteResepsionis = "https://healthypets-webservice.appspot.com/_ah/api/antrian/v1/antrian/"; 
datas = {
  nama: "",
  jenis: "",
  ras: "",
  umur: "",
  gender:""
};
idHapusKlien: any;

constructor (public navCtrl: NavController, 
  public navParams: NavParams, 
  private app:App,
  public http: HttpClient,
  public loadingCtrl: LoadingController, 
  public toastCtrl: ToastController, 
  public alerCtrl: AlertController,
  private formBuilder: FormBuilder,
  public deleteKlien: ApiProvider) {
        
        this.idAntrian = navParams.get('idAntrian');
        this.idAmb = navParams.get('idAmb');
        this.kode_hewan = navParams.get('kode_hewan'); 
        this.namaDrh = navParams.get('namaDrh');
        this.no_reg= navParams.get('no_reg'); 
        this.idDrh = navParams.get('idDrhLocal');

        this.send = this.formBuilder.group(
          {
            status_awal: ['', Validators.required],
            diagnosa: ['', Validators.required],
            terapi: ['', Validators.required],
            obat: ['', Validators.required],
            lain_rm: ['', Validators.required]
          });

        console.log('id Antrian '+this.idAntrian); 
        console.log('no reg '+this.no_reg);
        console.log('nama hewan '+this.kode_hewan);  
        console.log('idDrh '+this.idDrh);  
        console.log('idAmb '+this.idAmb);  
        console.log('namaDrh '+this.namaDrh); 
        
        this.getKlien(); 
        this.getHewan();
        this.getAmb();         
        this.getUser(this.idHapusKlien);

  }

  getUser(idHapusKlien){
    this.deleteKlien.getHapusKlien(idHapusKlien)
      .then((data)=>{
              this.datas['idHapus'] = data['id'];
              this.datas['nama'] = data['nama'];
              this.datas['jenis'] = data['jenis'];
              this.datas['ras'] = data['ras'];
              this.datas['umur'] = data['umur'];
              this.datas['gender'] = data['gender'];
              this.datas['ambs'] = data['ambs']; 
              this.datas['idPilih']=data['idPilih'];        
          })
          .catch((err) => {
            console.error('Terjadi kesalahan: '+err);
          })
          .catch(() => {
            console.error('Kembalian kosong!');
          }) 
  } 

  getAmb(){ 
    this.http.get(this.url+'ambulator/v1/ambulator/'+this.idAmb).subscribe(
      data=> { 
        this.amb = data;
          this.tgl = this.amb.tgl;
        },   
      err => {
        console.log(err);
      }
    );
  } 
  
  getKlien(){ 
    this.http.get(this.url+'klien/v1/klien/search/'+this.no_reg).subscribe(
      data=> { 
        this.klien = data;  
          this.no_reg = this.klien.no_reg; 
      },
      err => {
        console.log(err);
      }
    );
  } 
 
  getHewan(){ 
    this.http.get(this.url+'hewan/v1/data/'+this.kode_hewan).subscribe(
      data=> { 
        this.hewan = data;
          this.namahewan = this.hewan.nama;  
          this.ras = this.hewan.ras;
          this.jenis = this.hewan.jenis;
          this.umur = this.hewan.umur; 
          this.gender = this.hewan.gender; 
      },
      err => {
        console.log(err);
      }
    );
  } 
 
  simpan(){
        var body = {   
          "id":this.idAmb,
          "kode_hewan":this.kode_hewan,
          "nama_drh":this.namaDrh,
          "no_reg":this.no_reg,
          "diagnosa":this.send.value['diagnosa'],
          "obat":this.send.value['obat'],
          "status_awal":this.send.value['status_awal'],
          "terapi":this.send.value['terapi'],
          "idAmb":this.idAmb,
          "tgl":this.tgl,
          "lain":this.send.value['lain_rm']             
        };

        this.http
        .post(this.url+'rekammedik/v1/rekamedik', body)
        .subscribe(
            data => {
              console.log(data);  
                let confirm = this.alerCtrl.create({
                  title: 'Konfirmasi',
                  message: 'Anda telah mengisi rekam medik, apakah anda yakin ingin mengakhiri klien ini dari daftar antrian ?',
                  buttons: [
                    {
                      text: 'OK',
                      handler: () => {
              
                        this.http.delete(this.url+'klienantri/v1/antri/'+this.idAntrian).subscribe(
                          resp => console.log('deleted'),
                          error => console.log('error occur, delete fail')
                      );

                      this.http.delete(this.url+ 'pilihdrh/v1/pilihDrh/' + this.datas['drhPilih']).subscribe(
                        resp => console.log('deleted'),
                        error => console.log('error occur, delete fail')
                    );
              
                        let loader = this.loadingCtrl.create({
                          content: "Please wait..."
                        });

                        // getKlien antrian
                        this.http.get(this.url+'klien/v1/klien/search/'+this.no_reg).subscribe(
                          data=> { 
                            this.klien = data;  
                              this.no_reg = this.klien.no_reg; 
                              this.idAntrianResepsionis = this.klien.id;
                              console.log("id antrian di dalam "+this.idAntrianResepsionis);
                          },
                          err => {
                            console.log(err);
                          }
                        ); 
                        // show message
                        let toast = this.toastCtrl.create({
                          showCloseButton: true, 
                          message: 'Delete Success!',
                          duration: 1000,
                          position: 'bottom'
                        });
                     
                        loader.present();
                     
                        setTimeout(() => {
                          loader.dismiss();
                          toast.present(); 
                          this.app.getRootNav().push(HomePage, { 
                            'id' : this.idDrh,
                            'namaDrh': this.nama
                          });   
                        }, 3000)
                        console.log('Disagree clicked');
                      }
                    },
                    {
                      text: 'Cancel',
                      handler: () => {
                        console.log('Agree clicked');
                      }
                    }
                  ]
                });
                confirm.present()
           },
        err => {
          console.log("ERROR!: ", err);
        }
      );
    } 

}
