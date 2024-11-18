import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

// interface Data {  
//   colour: string,
//   value: string 
// }  
  

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HttpClient) { }

  httpoptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }


  createNewUser(Dataob:any):Observable<any>{
    console.log("received at backend", Dataob)
    if (Dataob.userType=="User")
    {
      console.log("Sending to true backend")
    let url="http://localhost:3000/createuser"
    let result = this.http.post(url,Dataob,this.httpoptions)
    console.log("return from http post")
      return  result;
    }
    else if(Dataob.userType=="Organization")
    {
      let url="http://localhost:3000/creatorganization"
      let result = this.http.post(url,Dataob,this.httpoptions)
      return result;
    }
    else
    return of(Dataob)

  }


}
