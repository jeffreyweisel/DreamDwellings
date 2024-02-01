using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace DreamDwellings.Models;

public class Home
{
    public int Id { get; set; }

    [Url]
    [BindNever]
    public string HomeImage { get; set; }
    [BindNever]
    public string StreetAddress { get; set; }
    [BindNever]
    public string City { get; set; }

    public decimal SquareFeet { get; set; }

    public int BedNumber { get; set; }

    public decimal BathNumber { get; set; }
    public DateTime ListedOn { get; set; }
    public DateTime? PurchasedOn { get; set; }
    public int? UserProfileId { get; set; }
    public UserProfile? HomeOwner { get; set; }
    public bool? Sold { get; set; }
    public int HomeTypeId { get; set; }
    public HomeType? HomeType { get; set; }
    public string? Description { get; set; }
    public List<UserSave>? UserSaves { get; set; }
    public int Price { get; set; }
    // public decimal? LotSize { get; set; }
    // public int? ZipCode { get; set; }
    // public int? BuiltInYear { get; set; }
    // public int? MyProperty { get; set; }
    public int? DaysOnMarket
    {
        get
        {
            return (DateTime.Today - ListedOn).Days;
        }
    }
    public decimal PricePerSqFt 
    {
        get
        {
            return Price / SquareFeet;
        }
    }
}