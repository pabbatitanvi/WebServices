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
  createEvent(Dataob:any):Observable<any>{
    let url="http://localhost:3000/createevent"
    let result = this.http.post(url, Dataob, this.httpoptions)
    return result;
  }
  getEvents():Observable<any>{
    let url="http://localhost:3000/getevents"
    let result = this.http.get(url, this.httpoptions)
    return result;
  }
  createNewPost(Dataob:any):Observable<any>{
    console.log("received at middle man: ", Dataob)
    
    console.log("Sending post to true backend (services)")
    let url="http://localhost:3000/createpost"
    let result = this.http.post(url,Dataob,this.httpoptions)
    console.log("just sent the request to the service!")
    return  result;

  }

}
