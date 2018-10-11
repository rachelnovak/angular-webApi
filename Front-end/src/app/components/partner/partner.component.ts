import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user-service.service';
import { User } from '../../shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {

   //----------------PROPERTIES-------------------
   
  partnerUser:User;

  //----------------CONSTRACTOR-------------------
 
  constructor(private userService:UserService,public router:Router) { 
    this.partnerUser=this.userService.partnerUser;   
  }


  //----------------METHODS-------------------
  
  ngOnInit() {
  }

  /**
   * function
   * navigate the user for starting game
   */
  StartGame(){
    this.router.navigate(['/game']);
  }
}
