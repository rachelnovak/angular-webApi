using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MemoryGame.Models
{
    public class Game
    {
        public User Player1 { get; set; }
        public User Player2 { get; set; }
        public string CurrentTurn { get; set; }
        /// <summary>
        /// The key is the card content
        /// The value  is the name of the user that found the pair
        /// </summary>
        public Dictionary<string, string> CardArray { get; set; } = new Dictionary<string, string>();
    }
}