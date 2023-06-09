import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  rutaServer: string="http://localhost:8080/api";
  recurso:string="categories";

  constructor(private Http:HttpClient) { }

  getCartegories(){
    return this.Http.get<Category[]>(this.rutaServer+"/"+this.recurso)
  }

  getCategory(id:number){
    return this.Http.get<Category>(this.rutaServer+"/"+this.recurso+ "/" + id.toString());
  }

}
