import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { TikectsService } from '../service/tikects.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private sql:TikectsService,private toas:ToastController,private router:Router) { }
  ngOnInit() {
  }

  async presentToast() {
    const toast = await this.toas.create({
      message: 'Usuario y/o contraseña invalida.',
      duration: 4000
    });
    toast.present();
  }

  validar_usuario(usuario,password){
    this.sql.validar_usuario(usuario,password).then(count => {
      console.log(count);
      if(count==1){
        this.router.navigate(["/tabs"]);
      }else{
        this.presentToast();
      }
    });
    
  }
  ionViewWillEnter(){
    this.sql.validar_usuario_ya_iniciado().then(count => {
      if(count==1){
        this.router.navigate(["/tabs"]);
      }
    });
  }
}
