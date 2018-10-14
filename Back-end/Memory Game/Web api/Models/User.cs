using System.ComponentModel.DataAnnotations;

namespace Web_api.Models
{
    public class User
    {
        [Required(ErrorMessage = "User name is required")]
        [MinLength(2, ErrorMessage = "User name must be minimum 10 chars")]
        [MaxLength(10, ErrorMessage = "User name must be maximum 10 chars")]
        public string UserName { get; set; }
        [Range(18, 120, ErrorMessage = "Age must be between 18 and 120")]
        public int Age { get; set; }
        public string PartnerUserName { get; set; }
        public int Score { get; set; }

        public User()
        {
            Score = 0;
        }
    }
}
