import { Component } from "@angular/core";
import { NavController, 
  MenuController,
  PopoverController, 
  NavParams } from "ionic-angular"; 
import { AntrianPage} from "../antrian/antrian";
import { ProfileUserPage } from "../profile-user/profile-user";
import { AllAntrianPage } from "../all-antrian/all-antrian";
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  idResepsionis; 
  constructor(public nav: NavController, 
    public popoverCtrl: PopoverController,
    public menu: MenuController, 
    public navParams:NavParams) {       
      this.menu.enable(true);

      this.idResepsionis = localStorage.getItem('idResepsionisLocal');
      console.log("id local: "+this.idResepsionis);  
  }

  antrian(){
    this.nav.push(AntrianPage, {
      "idResepsionis":this.idResepsionis
    });    
  }
   
  goToAccount() {
    this.nav.push(ProfileUserPage, {
      "idResepsionis":this.idResepsionis
    });   
  } 
  
  allklien() {
    this.nav.push(AllAntrianPage, {
      "id":this.idResepsionis
    });
  }
}