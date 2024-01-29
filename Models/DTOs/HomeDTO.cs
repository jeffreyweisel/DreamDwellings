using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DreamDwellings.Models.DTOs;

public class HomeDTO
{
    public int Id { get; set; }

    [Url]
    public string HomeImage { get; set; }
    
    public string StreetAddress { get; set; }
    
    public string City { get; set; }
    
    public decimal SquareFeet { get; set; }
    
    public int BedNumber { get; set; }
    
    public decimal BathNumber { get; set; }
    public DateTime ListedOn { get; set; }
    public DateTime? PurchasedOn { get; set; }
    public int? UserProfileId { get; set; }
    public UserProfileDTO? HomeOwner { get; set; }
    public bool? Sold { get; set; }
    public int HomeTypeId { get; set; }
    [ForeignKey("HomeTypeId")]
    public HomeTypeDTO? HomeType { get; set; }
  
    public string? Description { get; set; }
    public List<UserSaveDTO>? UserSaves { get; set; }
    public int Price { get; set; }
     public int DaysOnMarket
    {
        get
        {
            return (DateTime.Today - ListedOn).Days;
        }
    }
}