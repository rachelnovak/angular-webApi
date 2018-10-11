
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web_api.Models
{
   public class Game
    {
       
      
        public User Player1 { get; set; }
        public User Player2 { get; set; }
        public string CurrentTurn { get; set; }
        public Dictionary<string,string> CardArray { get; set; }
    }
}
