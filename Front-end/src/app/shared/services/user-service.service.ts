
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  //-----------------PROPERTIES--------------------

  URL: string = "http://localhost:58141/api";
  partnerUser: User;
  currentUser: User;
  listPartners: any;
  SubjectUser: Subject<any> = new Subject();

  
  //----------------CONSTRACTOR-------------------

  constructor(public httpClient: HttpClient, public router: Router) { }
  
  //------------------METHODS---------------------

  /**
   * function
   * @param newUser user to sign in
   * validate the user and send to the server for saving 
   * and get all the user details
   */
  registerUserValid(newUser: User): void {
    this.httpClient.post(this.URL + "/login", newUser).subscribe(
      (res) => {
        this.currentUser = newUser;
        this.router.navigate(['/choosing']);
      }, err => {//"cann't add register there is same user name"
        alert(err["error"]["Message"]);
      }
    );
    
    //get all the user details
    setInterval(() => {
      this.httpClient.get(this.URL + "/getUserDetails/" + this.currentUser.UserName).subscribe((data: User) => {
        this.currentUser = data;
        if (this.currentUser.PartnerName) {
          this.httpClient.get(this.URL + "/getUserDetails/" + this.currentUser.PartnerName).subscribe((data: User) => {
            this.partnerUser = data;
          });
        }
      })
    }, 5000);
  }
  
  /**
   * function
   * get all the users list 
   */
  getListOfUser() {
    this.httpClient.get(this.URL + "/getUsersWaitToPartner").subscribe(data => {
      this.listPartners = data;
      this.SubjectUser.next(this.listPartners);

    })
  }

  /**
 * function
 * get all the partners list 
 */
  getListPartners() {
    this.getListOfUser();
    setInterval(() => {
      this.getListOfUser();
    }, 100);
  }

  /**
 * function
 * send the choosen partner to the server for creating a new game
 */
  choosePartner(): Observable<any> {
    return this.httpClient.put(this.URL + "/ChoosingPartner/" + this.currentUser.UserName, this.partnerUser);
  }

}