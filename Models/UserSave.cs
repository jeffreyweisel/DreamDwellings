using System.ComponentModel.DataAnnotations;

namespace DreamDwellings.Models;

public class UserSave 
{
    public int Id { get; set; }
    
    public int UserProfileId { get; set; }
    public UserProfile UserProfile { get; set; }
    public int HomeId { get; set; }
    public Home Home { get; set; }
}