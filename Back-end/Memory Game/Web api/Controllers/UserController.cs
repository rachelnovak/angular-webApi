using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Web_api.Models;
namespace Web_api.Controllers
{

    public class UserController : ApiController
    {


        [HttpPost]
        // POST: 
        [Route("SignIn")]
        public HttpResponseMessage SignIn([FromBody]User user)
        {
            if (IsValidUser(user))
            {
                lock (Db.UserList)
                {

                    Db.UserList.Add(user);
                    return Request.CreateResponse(HttpStatusCode.OK, true);
                }
            }
            else
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, new Exception());
        }



        [HttpGet]
        [Route("GetList/{userName}")]
        public HttpResponseMessage GetList(string userName)
        {
            List<User> partnerList;
            //?
            lock (Db.UserList)
            {
                partnerList = Db.UserList.Where(partner => partner.PartnerUserName == null && partner.UserName != userName).ToList();
            }
            return Request.CreateResponse(HttpStatusCode.OK, partnerList);

        }

        [HttpGet]
        [Route("GetCurrentTurnDetails/{userName}")]
        public HttpResponseMessage GetCurrentTurnDetails(string userName)
        {
            User user = new User();

            lock (Db.UserList)
            {
                user = Db.UserList.FirstOrDefault(u => u.UserName == userName);
            }
            return Request.CreateResponse(HttpStatusCode.OK, user);

        }
        [HttpPut]
        [Route("CreateGame/{partnerUserName}")]
        public HttpResponseMessage CreateGame([FromUri] string partnerUserName,[FromBody] User user)
        {
            lock (Db.UserList)
            {
                try
                {
                   User user1 = Db.UserList.FirstOrDefault(u => u.UserName == user.UserName);
                    user1.PartnerUserName = partnerUserName;
                    User partner = Db.UserList.FirstOrDefault(u => u.UserName == partnerUserName);
                    partner.PartnerUserName = user.UserName;
                 
                    Game game = new Game() { Player1 = user, Player2 = partner, CurrentTurn = user.UserName, CardArray = InitCardArray() };
                    Db.GameList.Add(game);
                    return Request.CreateResponse(HttpStatusCode.OK, true);
                }
                catch (Exception)
                {

                    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, new Exception());
                }

            }
        }
        private bool IsValidUser(User user)
        {
            User userExists;
            lock (Db.UserList)
            {
                userExists = Db.UserList.Find(p => p.UserName == user.UserName);
            }

            if (user.UserName.Length < 2 || user.UserName.Length > 10 || user.UserName == null || user.Age < 18 || user.Age > 120 || user.Age == 0 || userExists != null)
                return false;
            return true;

        }

        private Dictionary<string, string> InitCardArray()
        {
            Dictionary<string, string> randDictionery = new Dictionary<string, string>();
            for (int i = 0; i < 9; i++)
            {
                randDictionery.Add(i.ToString(), null);
            }
            return randDictionery;
        }

    }
}
