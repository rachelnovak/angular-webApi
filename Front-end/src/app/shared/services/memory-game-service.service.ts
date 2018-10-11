import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class MemoryGameService {

  //-----------------PROPERTIES--------------------

  URL: string = "http://localhost:58141/api";
  currectTurnUser: string;

  //----------------CONSTRACTOR-------------------

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  //------------------METHODS---------------------

  /**
   * function
   * @param currentUser the player of the game
   * get the list of cards for starting game
   */
  getListOfCards(currentUser: User): Observable<any> {
    return this.httpClient.get(this.URL + "/getGame/" + currentUser.UserName);
  }

  /**
   * function
   * @param listChosenCards the choosen card
   * check the choosen card
   */
  checkCard(listChosenCards: string[]): any {
    return this.httpClient.put(this.URL + "/updateTurn/" + this.userService.currentUser.UserName, listChosenCards);
  }
}
