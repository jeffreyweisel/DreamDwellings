using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace DreamDwellings.Models;

public class UserProfile
{
    public int Id { get; set; }
      public string FirstName { get; set; }
   
    public string LastName { get; set; }
    public string IdentityUserId { get; set; }

    public IdentityUser IdentityUser { get; set; }
    public List<Home>? OwnedHomes { get; set; }
    public List<UserSave>? SavedHomes { get; set; }
    public string? ProfilePicture { get; set; }
    

}