import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ZoneEvent } from '../models/zoneevent';

@Injectable({
  providedIn: 'root'
})
export class ZoneeventsService {

  RutaServidor : string = "http://localhost:8080/api";
  Recurso: string ="zoneEvents";
  
  constructor(private http:HttpClient) { }

  getList(){
    return this.http.get<ZoneEvent[]>(this.RutaServidor+ "/" + this.Recurso);}
    
  getZoneEvents(){
    return this.http.get<ZoneEvent[]>(this.RutaServidor+"/"+this.Recurso);
  }
  
  getZoneEvent(id:number){
      return this.http.get<ZoneEvent>(this.RutaServidor+"/"+this.Recurso+"/"+id.toString());
  }
  getZoneEventByDate(id:number){
    return this.http.get<ZoneEvent[]>(this.RutaServidor+"/"+this.Recurso+"/Date/"+id.toString());
  }

  addZoneEvent(zoneevent:ZoneEvent,idDateSocialEvent:number){
    return this.http.post<ZoneEvent>(this.RutaServidor+"/"+this.Recurso+"/"+idDateSocialEvent.toString(),zoneevent);
  }
}
