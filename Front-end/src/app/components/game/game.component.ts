import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user-service.service';
import { MemoryGameService } from '../../shared/services/memory-game-service.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {

  //-----------------PROPERTIES--------------------

  currentUser: User;
  rand: number;
  currentPartner: User;
  res: any;
  isClicked: number = 0;
  listChosenCards: string[];
  PlayerNow: string;
  isEnd: boolean = false;
  listRandomCardsFromServer: Array<string> = new Array<string>();
  listRandomCardsFix: Array<any> = new Array<any>();
  counterUser1: number = 0;
  counterUser2: number = 0;
  winner: string;

  //----------------CONSTRACTOR-------------------

  constructor(public gameService: MemoryGameService, public userService: UserService) {
    this.currentUser = userService.currentUser;
    this.currentPartner = userService.partnerUser;
    this.PlayerNow = this.currentUser.UserName;
    this.listChosenCards = new Array();

  }
  ngOnInit() {
    this.PlayerNow = this.gameService.currectTurnUser;
    var interval = setInterval(() => {
      this.gameService.getListOfCards(this.currentUser).subscribe(
        result => {
          this.res = result;
          this.res.CardArray = Object.keys(this.res.CardArray).map(key => ({ key: key, value: this.res.CardArray[key] }));

          //update partner
          this.currentUser = this.userService.currentUser;
          this.currentPartner = this.userService.partnerUser;
          this.PlayerNow = result["CurrentTurn"];
          this.listRandomCardsFromServer = this.res.CardArray;

          //update values in the list that fix
          for (let index in this.listRandomCardsFix) {
            let card = this.listRandomCardsFromServer.filter(p => p["key"] == this.listRandomCardsFix[index]["key"]);
            this.listRandomCardsFix[index]["value"] = card[0]["value"];
          }

          //counter points to each player
          this.listRandomCardsFix.forEach(p => p["value"] == this.currentUser.UserName ? this.counterUser1++ : this.counterUser2++);

          let index;
          for (index of this.listRandomCardsFromServer) {
            if (!index["value"])
              break;
          }

          //if there is winner - stop game
          if (index["value"]) {
            //setTimeout untill the score will update from service
            setTimeout(() => {
              let sum = 0;
              let winner;
              for (let index in this.listRandomCardsFix)
                if (this.listRandomCardsFix[index].value == this.currentUser.UserName)
                  sum++;
              if (sum > this.listRandomCardsFix.length / 2)
                this.winner = this.currentUser.UserName;
              else
                this.winner = this.currentPartner.UserName;
              alert("The winner is  " + winner);
              clearInterval(interval);
            }, 2000);
          }
        }, err => { }
      );
    }, 5000);

    //start new game
    setTimeout(() => {
      this.randomCards();
    }, 6000)
  }

  //------------------METHODS---------------------

  /**
   * function
   * duplicate the cards and mix them
   */
  randomCards() {
    //duplicate the cards
    this.listRandomCardsFromServer = [...this.listRandomCardsFromServer.concat(this.listRandomCardsFromServer)];
    var index = 0;
    while (this.listRandomCardsFromServer.length > 0) {
      this.rand = Math.floor(Math.random() * this.listRandomCardsFromServer.length);
      this.listRandomCardsFix[index++] = this.listRandomCardsFromServer[this.rand];
      this.listRandomCardsFromServer.splice(this.rand, 1);
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
        //not win yet
        if (!res["end"]) {
          if (this.listChosenCards[1] == this.listChosenCards[0])
            alert("well");
          this.PlayerNow = res["player"];
        }
        //win-end the game
        else
          this.isEnd = true;
        this.gameService.getListOfCards(this.currentUser).subscribe(
          res => {
            this.res = res;
            this.res.CardArray = Object.keys(this.res.CardArray).map(key => ({ key: key, value: this.res.CardArray[key] }));
            this.PlayerNow = res["CurrentTurn"];
            this.listRandomCardsFromServer = this.res.CardArray;
          }, err => { }
        );
      }, err => {
        alert("NOT OK");
      });

      this.isClicked = 0;
    }

  }

}


