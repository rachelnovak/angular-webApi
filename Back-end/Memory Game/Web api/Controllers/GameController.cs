using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Web_api.Models;

namespace Web_api.Controllers
{
    public class GameController : ApiController
    {

        [HttpGet]
        [Route("GetGame/{userName}")]
        public HttpResponseMessage GetGame(string userName)
        {
            Game currentGame = getCurrentGame(userName);

            return Request.CreateResponse(HttpStatusCode.OK, currentGame);
        }



        [HttpPut]
        [Route("UpdateGame/{userName}/{card2}")]
        public bool UpdateGame(string userName, [FromBody]string card1, string card2)
        {
            Game currentGame = getCurrentGame(userName);
            int scoreUser = 0;

            bool isGameOver = true;
            lock (currentGame)
            {  currentGame.CurrentTurn = currentGame.Player1.UserName == userName ? currentGame.Player2.UserName : currentGame.Player1.UserName;
                if (card1 == card2)
                {

                    currentGame.CardArray[card1] = userName;
                    foreach (KeyValuePair<string, string> card in currentGame.CardArray)
                    {
                        if (card.Value == null)
                        {
                          
                            isGameOver = false;
                        }
                    }
                    if (isGameOver)
                    {
                        foreach (KeyValuePair<string, string> card in currentGame.CardArray)
                        {
                            if (card.Value == userName)
                                scoreUser++;

                        }
                        if (scoreUser > currentGame.CardArray.Count / 2)
                        {
                            lock (Db.UserList)
                            {
                                Db.UserList.FirstOrDefault(user => user.UserName == userName).Score++;
                            }
                        }

                    }
  return true;
                }
            }
        return false;


        }
        private Game getCurrentGame(string userName)
        {

            lock (Db.GameList)
            {
                return Db.GameList.FirstOrDefault(game => game.Player1.UserName == userName || game.Player2.UserName == userName);

            }

        }
    }
}
