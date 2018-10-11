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
        data => {
          this.res = data;
          this.res.CardArray = Object.keys(this.res.CardArray).map(key => ({ key: key, value: this.res.CardArray[key] }));
          //update score and partner
          this.currentUser = this.userService.currentUser;
          this.currentPartner = this.userService.partnerUser;
          this.PlayerNow = data["CurrentTurn"];
          this.listRandomCardsFromServer = this.res.CardArray;
          //update values in the list that fix
          for (let g in this.listRandomCardsFix) {
            let card = this.listRandomCardsFromServer.filter(p => p["key"] == this.listRandomCardsFix[g]["key"]);
            this.listRandomCardsFix[g]["value"] = card[0]["value"];
          }

          let i;
          for (i of this.listRandomCardsFromServer) {
            if (!i["value"])
              break;
          }
          //if there is winner stop game
          if (i["value"]) {
            //untill the score will update from service
            setTimeout(() => {
              var winner = this.currentUser.Score > this.currentPartner.Score ? this.currentUser.UserName : this.currentPartner.UserName;
              alert("the winner is  " + winner);
              clearInterval(interval);
            }, 2000);
          }
        }, err => {  }
      );
    }, 5000);
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
    this.listRandomCardsFromServer = [...this.listRandomCardsFromServer.concat(this.listRandomCardsFromServer)];//twice
    var i = 0;
    while (this.listRandomCardsFromServer.length > 0) {
      this.rand = Math.floor(Math.random() * this.listRandomCardsFromServer.length);
      this.listRandomCardsFix[i++] = this.listRandomCardsFromServer[this.rand];
      this.listRandomCardsFromServer.splice(this.rand, 1);
    }
  }

  /**
 * function
 * @param card the choosen card
 */
  clicked(card) {
    card.value = "somethingToShow"

    this.isClicked++;
    if (this.isClicked == 1)
      this.listChosenCards[0] = card.key;
    if (this.isClicked == 2) {
      this.listChosenCards[1] = card.key;
      this.gameService.checkCard(this.listChosenCards).subscribe(res => {
        if (!res["end"])//not win yet
        {
          if (this.listChosenCards[1] == this.listChosenCards[0])
            alert("wonderfull");
          this.PlayerNow = res["player"];
        }
        else this.isEnd = true;
        this.gameService.getListOfCards(this.currentUser).subscribe(
          data => {
            this.res = data;
            this.res.CardArray = Object.keys(this.res.CardArray).map(key => ({ key: key, value: this.res.CardArray[key] }));
            this.PlayerNow = data["CurrentTurn"];
            this.listRandomCardsFromServer = this.res.CardArray;

          }, err => {
          }
        );
      }, err => {

        alert("NOT OK");
      });
      this.isClicked = 0;
    }

  }

}


