import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ObjectId} from 'mongodb';

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

    login(Dataob:any):Observable<any>{
      console.log("getdataservices LOGIN Passed")
      console.log(Dataob.userType)
      let url = "http://localhost:3000/userlogin"

      if(Dataob.userType=='User'){
        url = "http://localhost:3000/userlogin"
      }
      else if(Dataob.userType=='Organization'){
        url = "http://localhost:3000/orglogin"

      }
      else{
        url = "http://localhost:3000/userlogin"

      }
        let result = this.http.post(url,Dataob)
        return result;
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
      let url="http://localhost:3000/createorganization"
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
  // Get all posts, used for the user's profile screen (will be replaced by searching for all posts by the current user once
  //login is implemented)
  getPosts():Observable<any>{
    let url = "http://localhost:3000/getposts"
    let result = this.http.get(url, this.httpoptions)
    return result;
  }
  deletePosts(postID: ObjectId):Observable<any>{
    let url = "http://localhost:3000/deletepost/" + postID
    let result = this.http.delete(url, this.httpoptions)
    return result;
  }
  getPostInfo(postID: string):Observable<any>{
    let url = "http://localhost:3000/getpostinfo/" + postID
    let result = this.http.get(url, this.httpoptions)
    console.log("RESULT: " + result)
    return result;
  }

}
