import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { TikectsService } from '../service/tikects.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  array: any[] = [];
  resultados:boolean=false;
  constructor(
    public tikect: TikectsService
  ) {
    this.tikect.getAll().then(tasks => {
      console.log(tasks);
      this.array = tasks;
    })
    .catch( error => {
      console.error( error );
    });
  }
  cargar_datos(){
    this.tikect.getAll().then(tasks => {
      console.log(tasks);
      this.array = tasks;
    })
    .catch( error => {
      console.error( error );
    });
  }
  ionViewWillEnter(){
    this.cargar_datos();
    console.log(this.array);
  }
  ngOnInit(){
    //this.cargar_datos();
    console.log(this.array);
  }

}
