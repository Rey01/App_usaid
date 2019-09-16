import { Injectable } from '@angular/core';
import { HttpClientModule,HttpClient  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApirestService {
  url:any="https://grupoitmed.com/samu/mercados/api.php";
  constructor(private http: HttpClient) { }
  get_usuarios(){
    let data = this.http.get(this.url+"?accion=get_all_user");
    return data;
  }
  
  up_data(id_tikect,tipo,precio,puesto,fecha_creacion){
     return this.http.get(this.url+"?accion=up_data&id_tikect="+id_tikect+"&tipo="+tipo+"&precio="+precio+"&puesto="+puesto+"&fecha_creacion="+fecha_creacion).subscribe(rs => {
        console.log(rs);
        return rs;
     });
  }
}
