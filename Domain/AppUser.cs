using Microsoft.AspNetCore.Identity;
namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplaName {get; set;}
        public bool isAdmin { get; set; }
    }
}