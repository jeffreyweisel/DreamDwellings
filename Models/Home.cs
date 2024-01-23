using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DreamDwellings.Models;

public class Home
{
    public int Id { get; set; }

    [Url]
    [Required]
    public string HomeImage { get; set; }
    [Required]
    public string StreetAddress { get; set; }
    [Required]
    public string City { get; set; }
    [Required]
    public decimal SquareFeet { get; set; }
    [Required]
    public int BedNumber { get; set; }
    [Required]
    public decimal BathNumber { get; set; }
    public DateTime ListedOn { get; set; }
    public DateTime? PurchasedOn { get; set; }
    public int? UserProfileId { get; set; }
    public UserProfile? HomeOwner { get; set; }
    public bool? Sold { get; set; }
    [Required]
    [ForeignKey("HomeType")]
    public int HomeTypeId { get; set; }
    public HomeType HomeType { get; set; }
    [Required]
    public string? Description { get; set; }
    public List<UserSave>? UserSaves { get; set; }
}