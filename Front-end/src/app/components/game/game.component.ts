import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user-service.service';
import { MemoryGameService } from 'src/app/shared/services/memory-game-service.service';
import { KeyedCollection } from '../../shared/models/game.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  //-----------------PROPERTIES--------------------

  CardGameDictionary = new KeyedCollection<string>();
  currentUser: User;
  listRandomCards: Array<string> = new Array<string>();
  rand: number;
  currentPartner: User;
  res: any;
  isClicked: number = 0;
  listChosenCards: string[];
  NameNow: string;

  ngOnInit() {
    this.NameNow = this.gameService.currectTurnUser;
    this.gameService.currectTurnUser = this.currentUser.UserName;

    setInterval(() => {
      this.gameService.getListOfCards(this.currentUser).subscribe(
        data => {
          this.res = data;
          this.res.CardArray = Object.keys(this.res.CardArray).map(key => ({ key: key, value: this.res.CardArray[key] }));

          this.NameNow = data.CurrentTurn;
          this.CardGameDictionary = data.CardArray;
          console.log(this.CardGameDictionary);
          // this.randomCards();
          this.listRandomCards = this.res.CardArray;
        }, err => {   }
      );
    }, 5000);
  }

//----------------CONSTRACTOR-------------------

  constructor(public gameService: MemoryGameService, public userService: UserService) {
    this.currentUser = userService.currentUser;
    this.currentPartner = this.userService.partnerUser;
    this.NameNow = this.currentUser.UserName;
    this.listChosenCards = new Array();
  }

  //------------------METHODS---------------------

  /**
   * function
   * duplicate the cards and mix them
   */
  randomCards() {
    var rand;
    for (var i = 0; i < 18; i++)
      this.listRandomCards[i] = "-1";

    for (var i = 0; i < 18; i++) {
      do {
        this.rand = Math.floor(Math.random() * 17 + 1);
      }
      while (this.listRandomCards[this.rand] != "-1");
      this.listRandomCards[this.rand] = Object.keys(this.CardGameDictionary)[i];
      do {
        this.rand = Math.floor(Math.random() * 17 + 1);
      }
      while (this.listRandomCards[this.rand] != "-1");
      console.log(i);
      this.listRandomCards[this.rand] = Object.keys(this.CardGameDictionary)[i];
    }
  }

  /**
   * function
   * @param card the choosen card
   */
  clicked(card) {
    this.isClicked++;
    if (this.isClicked == 1)
      this.listChosenCards[0] = card.key;
    if (this.isClicked == 2) {
      this.listChosenCards[1] = card.key;
      this.gameService.checkCard(this.listChosenCards).subscribe(res => {
        if (!res.end)//not win
        {
          this.NameNow = res.player;
        }
        else alert("the winner is" + res.player);
        // this.listChosenCards[card] = this.currentUser.userName;
        console.log("1 " + this.listChosenCards[card]);
        //this.ct.Pairs++;
        this.gameService.getListOfCards(this.currentUser).subscribe(
          data => {
            this.res = data;
            this.res.CardArray = Object.keys(this.res.CardArray).map(key => ({ key: key, value: this.res.CardArray[key] }));

            this.NameNow = data.CurrentTurn;
            this.CardGameDictionary = data.CardArray;
            console.log(this.CardGameDictionary);
            // this.randomCards();
            this.listRandomCards = this.res.CardArray;

          }, err => { }
        );
        alert("OK")
      }, err => {

        alert("NOT OK");
      });
      this.isClicked = 0;
    }
  }
}

