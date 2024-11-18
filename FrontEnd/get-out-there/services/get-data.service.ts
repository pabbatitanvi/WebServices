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
      return  of(result);
    }
    else if(Dataob.userType=="Organization")
    {
      let url="http://localhost:3000/creatorganization"
      let result = this.http.post(url,Dataob,this.httpoptions)
      return of(result);
    }
    else
    return of(Dataob)

  }

  enterUserData(dataob:any):Observable<any>{
    let url="http://localhost:3000/adduserdata"
    let result= this.http.post(url, dataob, this.httpoptions)
    return result;
  }

  checkUserEntry(dataob:any):Observable<any>{
    console.log("checkUserEntry")
    let url="http://localhost:3000/finduserdata"
    let result= this.http.get(url, dataob)
    return result;
  }



}
