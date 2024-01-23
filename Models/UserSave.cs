using System.ComponentModel.DataAnnotations;

namespace DreamDwellings.Models;

public class UserSave 
{
    public int Id { get; set; }
    [Required]
    public int UserProfileId { get; set; }
    public UserProfile UserProfile { get; set; }
    [Required]
    public int HomeId { get; set; }
    public Home Home { get; set; }
}