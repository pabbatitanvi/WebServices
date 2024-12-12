import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ObjectId} from 'mongodb';

/* This should 100% be split into separate files for each type of service. However, that is not a high enough priority at the
moment to consider doing it this semester. Just a note of something that (if this were to be a project that were continued)
should be done in the near future.
*/

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
      console.log(Dataob.username)
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
  
  // ----------------------------- EVENTS RELATED SERVICE CALLS -----------------------------
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
  getEventByOrgId(id: any):Observable<any>{
    let url=`http://localhost:3000/geteventbyorgid/${id}`
    let result = this.http.get(url, this.httpoptions)
    return result;
  }
  getUsers():Observable<any>{
    let url="http://localhost:3000/getusers"
    let result = this.http.get(url, this.httpoptions)
    return result;
  }
  getEventByTag(tag: string):Observable<any>{
    let url=`http://localhost:3000/geteventinfobytag/${tag}`
    let result = this.http.get(url, this.httpoptions)
    return result;
  }
  shareEvent():Observable<any>{
    let url=`http://localhost:3000/shareevent/`
    let result = this.http.get(url, this.httpoptions)
    return result;
  }
  getEventByPrice(price: any):Observable<any>{
    let url=`http://localhost:3000/geteventinfobyprice/${price}`
    let result = this.http.get(url, this.httpoptions)
    return result;
  }
  getEventByName(name: any):Observable<any>{
    let url=`http://localhost:3000/geteventbyname/${name}`
    let result = this.http.get(url, this.httpoptions)
    return result;
  }
  getEventByHost(host: any):Observable<any>{
    let url=`http://localhost:3000/geteventinfobyhost/${host}`
    let result = this.http.get(url, this.httpoptions)
    return result;
  }
  getUserByName(name: any):Observable<any>{
    let url=`http://localhost:3000/getuserbyname/${name}`
    let result = this.http.get(url, this.httpoptions)
    return result;
  }
  getEventByArea(location: any):Observable<any>{
    let url=`http://localhost:3000/geteventinfobyarea/${location}`
    let result = this.http.get(url, this.httpoptions)
    return result;
  }
  getEventByID(eventID: string):Observable<any>{
    let url = "http://localhost:3000/geteventid/" + eventID
    let result = this.http.get(url, this.httpoptions)
    return result;
  }
  modifyEvent(eventID: string, Dataob: any):Observable<any>{
    let url = "http://localhost:3000/modifyevent/" + eventID
    let result = this.http.put(url, Dataob, this.httpoptions)
    return result;
  }
  deleteEvent(eventID: ObjectId):Observable<any>{
    let url = `http://localhost:3000/deleteevent/${eventID}`
    console.log("Delete URL:", url); 
    let result = this.http.delete(url, this.httpoptions)
    return result;
  }
  
  // -------------------------------- POST RELATED CALLS ------------------------------------
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
  getPostsByTag(tag: string):Observable<any>{
    let url = "http://localhost:3000/getpostbytag/" + tag
    let result = this.http.get(url, this.httpoptions)
    return result;
  }
  getPostsByLocation(location: string):Observable<any>{
    let url = "http://localhost:3000/getpostbylocation/" + location
    let result = this.http.get(url, this.httpoptions)
    console.log("the call to the service was completed successfully")
    return result;
  }
  getPostsByUser(user: string):Observable<any>{
    let url = "http://localhost:3000/getpostbyuser/" + user
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
  editPost(postID: string, Dataob: any):Observable<any>{
    let url = "http://localhost:3000/modifypost/" + postID
    let result = this.http.put(url, Dataob, this.httpoptions)
    console.log("RESULT: " + result)
    return result;
  }

  // ----------------------------- LOCATION RELATED CALLS -----------------------------------
  getLocations():Observable<any>{
    let url = "http://localhost:3000/getlocations"
    let result = this.http.get(url, this.httpoptions)
    return result;
  }
}
