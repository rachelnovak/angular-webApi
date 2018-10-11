import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user-service.service';
import { User } from '../../shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choosen',
  templateUrl: './choosen.component.html',
  styleUrls: ['./choosen.component.css']
})
export class ChoosenComponent implements OnInit {

  //-----------------PROPERTIES--------------------

  currectUser: User;
  listChoosePartners: User[] = [];

  //----------------CONSTRACTOR-------------------

  constructor(public userService: UserService, public router: Router) {
    this.currectUser = this.userService.currentUser;
    this.userService.getListPartners();
  }

  //------------------METHODS---------------------

  /**
   * function
   * @param user the partner that the current user choosed to play with 
   * send the choosen partner to the service for creating a new game
   */
  choosePartner(user: User) {
    this.userService.partnerUser = user;
    this.userService.choosePartner().subscribe(data => {
      this.router.navigate(['/partner']);
    }, err => {
      console.log(err.error);
    });
  }

  ngOnInit() {
    //get the user list for choose 
    var inter = setInterval(() => {
      this.listChoosePartners = this.userService.listPartners;
      var indexOfUser = this.listChoosePartners.findIndex(i => i["UserName"] == this.currectUser.UserName);
      //remove the current user from the user list
      if (indexOfUser != -1)
        this.listChoosePartners.splice(indexOfUser, 1);
      if (this.userService.currentUser.PartnerName != null) {
        this.router.navigate(['/partner']);
        clearInterval(inter);
      }
    }, 1000);
  }

}