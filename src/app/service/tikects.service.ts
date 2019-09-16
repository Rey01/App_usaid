import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Alert } from 'selenium-webdriver';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApirestService } from './apirest.service';
import { IfStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class TikectsService {

  db: SQLiteObject = null;
  data: any=[];
  
  developers = new BehaviorSubject([]);
  products = new BehaviorSubject([]);
  constructor(private sqlite: SQLite,private api: ApirestService) { }

  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }

  public getDb(){
    return this.sqlite.create({
      name: "data.db",
      location: "default"
    });
  }

  public createdatabase(){
    return this.getDb().
    then((db : SQLiteObject) => {
      this.db=db;
      this.setDatabase( db );
      this.createtable( db );
    }).
    catch(e=>console.log(e));
  }
  private createtable(db : SQLiteObject){
    let sql = 'CREATE TABLE IF NOT EXISTS tikects(id_tikect INTEGER PRIMARY KEY AUTOINCREMENT, tipo VARCHAR(100), precio VARCHAR(100), puesto VARCHAR(100), fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP)';
    this.db.executeSql(sql, []);
    let sql1 = 'CREATE TABLE IF NOT EXISTS usuarios(idusuario INTEGER PRIMARY KEY AUTOINCREMENT, usuario VARCHAR(100), password VARCHAR(100), nombre VARCHAR(100), estado VARCHAR(1))';
    this.db.executeSql(sql1, []);
    this.api.get_usuarios().subscribe(data => {
      for (let i = 0; i < data["valores"].length; i++) {
        let data2 = data["valores"][i];
        let sql2 = 'INSERT INTO usuarios(idusuario,usuario, password, nombre, estado) VALUES(?,?,?,?,?);';
        this.db.executeSql(sql2, [ data2["idusuario"],data2["usuario"],data2["password"],data2["nombre"], 0]);
      }
    });
    
  }
  
  eliminar_historial(){
    let sql = 'DELETE FROM tikects;';
    let data = this.db.executeSql(sql, []);
    return data;
    
  }
  insert(tipo: any,precio: any,numero: any){
    let sql = 'INSERT INTO tikects(tipo, precio, puesto) VALUES(?,?,?);';
    let data = this.db.executeSql(sql, [tipo,precio,numero]);
    return data;
  }
  validar_usuario_ya_iniciado(){
    let sql = 'SELECT * FROM usuarios WHERE estado=1;';
    return this.db.executeSql(sql, [])
    .then(response => {
      let validar = 0;
      if( response.rows.length>0) {
        validar = 1;
      }
      console.log(response.rows.length);
      console.log(validar);
      return  validar ;
    })
    .catch(error => Promise.reject(error));
  }
  validar_usuario(usuario,password){
    let sql = 'SELECT * FROM usuarios WHERE usuario=? AND password=? ';
    return this.db.executeSql(sql, [usuario,password])
    .then(response => {
      for (let index = 0; index < response.rows.length; index++) {
        let idusuario = response.rows.item(index).idusuario;
        let sql2 = 'UPDATE usuarios SET estado=1 WHERE idusuario=?;';
        this.db.executeSql(sql2, [ idusuario ]);
      }
      let validar: number = 0;
      if( response.rows.length>0) {
        validar = 1;
      }
      console.log(response.rows.length);
      console.log(validar);
      return validar;
    })
    .catch(error => Promise.reject(error));
  }
  getAll(){
    let sql = 'SELECT * FROM tikects';
    console.log(sql)
    return this.db.executeSql(sql, [])
    .then(response => {
      let tasks = [];
      for (let index = 0; index < response.rows.length; index++) {
        let array = {
          "id_tikect":response.rows.item(index).id_tikect,
          "tipo":response.rows.item(index).tipo,
          "precio":response.rows.item(index).precio,
          "puesto":response.rows.item(index).puesto
        };
        tasks.push(array);
        console.log(array);
      }
      console.log(tasks);
      return  tasks ;
    })
    .catch(error => Promise.reject(error));
  }

  
  subir_informacion(){
    let sql = "SELECT id_tikect,tipo,precio,puesto,datetime(fecha_creacion, 'localtime') AS fecha FROM tikects";
    console.log(sql)
    return this.db.executeSql(sql, [])
    .then(response => {
      for (let index = 0; index < response.rows.length; index++) {
          let id_tikect = response.rows.item(index).id_tikect;
          let tipo = response.rows.item(index).tipo;
          let precio = response.rows.item(index).precio;
          let puesto = response.rows.item(index).puesto;
          let fecha_creacion = response.rows.item(index).fecha;
          this.api.up_data(id_tikect,tipo,precio,puesto,fecha_creacion);
      }
      return true ;
    })
    .catch(error => Promise.reject(error));
  }
}
