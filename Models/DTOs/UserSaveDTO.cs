using System.ComponentModel.DataAnnotations;

namespace DreamDwellings.Models.DTOs;

public class UserSaveDTO
{
    public int Id { get; set; }
    [Required]
    public int UserProfileId { get; set; }
    public UserProfileDTO UserProfile { get; set; }
    [Required]
    public int HomeId { get; set; }
    public HomeDTO Home { get; set; }
}