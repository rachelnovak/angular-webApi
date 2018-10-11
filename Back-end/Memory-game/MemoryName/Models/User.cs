using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MemoryGame.Models
{
    public class User
    {
        public string UserName { get; set; }
        public int Age { get; set; }
        public string PartnerName { get; set; }
        public int Score { get; set; }
    }
}