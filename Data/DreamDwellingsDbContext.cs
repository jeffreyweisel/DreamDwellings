using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using DreamDwellings.Models;
using Microsoft.AspNetCore.Identity;

namespace DreamDwellings.Data;
public class DreamDwellingsDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;
    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<Home> Homes { get; set; }
    public DbSet<HomeType> HomeTypes { get; set; }
    public DbSet<UserSave> UserSaves { get; set; }

    public DreamDwellingsDbContext(DbContextOptions<DreamDwellingsDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser
        {
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            UserName = "Administrator",
            Email = "phil@example.com",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        });

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
        });
        modelBuilder.Entity<UserProfile>().HasData(new UserProfile
        {
            Id = 1,
            IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            FirstName = "Phil",
            LastName = "Dunphy",
        });
        modelBuilder.Entity<Home>().HasData(new Home[]
{
    new Home
    {
        Id = 1,
        HomeImage = "https://dhp.dreeshomes.com/cms/images/5vlwKrt_41I8s7yG-NZKFW?quality=80&width=1200",
        StreetAddress = "123 Main St",
        City = "Franklin",
        SquareFeet = 1500,
        BedNumber = 3,
        BathNumber = 2,
        ListedOn = new DateTime(2023, 10, 20),
        PurchasedOn = null,
        UserProfileId = null,
        Sold = false,
        HomeTypeId = 1,
        Description = "Welcome to this charming 3-bedroom, 2-bathroom home offering 1500 sq ft of comfortable living space. This residence boasts a spacious interior, perfect for both relaxation and entertainment. The well-appointed bedrooms provide ample space for rest, while the inviting common areas create a warm and welcoming atmosphere. With its desirable features and prime location, this home presents an ideal opportunity for a new chapter of comfortable living.",
        Price = 450000
    },
    new Home
    {
        Id = 2,
        HomeImage = "https://dhp.dreeshomes.com/cms/images/D-TyO6d0q1L9l-S5Jg6Ouw?quality=80&width=1200",
        StreetAddress = "456 Elm St",
        City = "Franklin",
        SquareFeet = 2000,
        BedNumber = 4,
        BathNumber = 2.5M,
        ListedOn = new DateTime(2023, 11, 21),
        PurchasedOn = null,
        UserProfileId = null,
        Sold = false,
        HomeTypeId = 1,
        Description = "Step into luxury with this stunning 4-bedroom, 2.5-bathroom home spanning across 2000 sq ft of modern elegance. The well-designed layout offers spacious living areas and an upgraded kitchen perfect for culinary enthusiasts. Unwind in the generous bedrooms, including a master suite with a private bath. With its impressive features and generous square footage, this home provides an exceptional blend of comfort and style, making it an ideal retreat for you and your family.",
        Price = 292000


    },
    new Home
    {
        Id = 3,
        HomeImage = "https://nhs-dynamic-secure.akamaized.net/Images/Homes/Drees/69096216-230623.jpg?maxwidth=900&maxheight=600&format=jpg&progressive=true",
        StreetAddress = "789 Oak St",
        City = "Brentwood",
        SquareFeet = 1800,
        BedNumber = 3,
        BathNumber = 2,
        ListedOn = new DateTime(2023, 12, 12),
        PurchasedOn = null,
        UserProfileId = null,
        Sold = false,
        HomeTypeId = 1,
        Description = "Discover the perfect harmony of space and comfort in this inviting 3-bedroom, 2-bathroom home spanning 1800 sq ft. The well-designed layout creates a seamless flow between living and sleeping areas, providing both functionality and charm. Enjoy the tranquility of a spacious master suite, and relish the convenience of a thoughtfully designed kitchen. With its cozy ambiance and desirable features, this home offers a wonderful haven for relaxation and everyday living.",
        Price = 399000
    },
    new Home
    {
        Id = 4,
        HomeImage = "https://www.hersindex.com/wp-content/uploads/2020/04/Drees-Austin-Header-scaled.jpg",
        StreetAddress = "101 Pine St",
        City = "Brentwood",
        SquareFeet = 2200,
        BedNumber = 4,
        BathNumber = 3,
        ListedOn = new DateTime(2023, 01, 09),
        PurchasedOn = null,
        UserProfileId = null,
        Sold = false,
        HomeTypeId = 1,
        Description = "Indulge in the spacious luxury of this captivating 4-bedroom, 3-bathroom home boasting an expansive 2200 sq ft floor plan. This residence is designed for both comfort and style, featuring generous bedrooms, including a lavish master suite with a private bath retreat. The open-concept living areas seamlessly connect, providing a perfect setting for gatherings and entertainment. With its impressive square footage and modern amenities, this home offers a blend of elegance and functionality, creating an inviting sanctuary for you and your family.",
        Price = 299000
    },
    new Home
    {
        Id = 5,
        HomeImage = "https://www.dreeshomes.com/globalassets/production-ready/design---distinctive-design/lauren-ii-a_drees.jpg",
        StreetAddress = "202 Maple St",
        City = "Smyrna",
        SquareFeet = 1600,
        BedNumber = 3,
        BathNumber = 2.5M,
        ListedOn = new DateTime(2023, 12, 31),
        PurchasedOn = null,
        UserProfileId = null,
        Sold = false,
        HomeTypeId = 1,
        Description = "Welcome to this delightful 3-bedroom, 2.5-bathroom home offering 1600 sq ft of cozy and efficient living space. The thoughtfully designed layout features a bright and airy atmosphere, blending practicality with style. Relax in the comfortable bedrooms, including a charming master suite with a convenient ensuite bath. With its modest yet well-utilized square footage, this home provides a perfect balance of comfort and modern living, creating a warm and inviting retreat for you and your loved ones.",
        Price = 305000
    }
});
        modelBuilder.Entity<HomeType>().HasData(new HomeType[]
{
    new HomeType
    {
        Id = 1,
        HomeTypeName = "Single Family Home"
    },
    new HomeType
    {
        Id = 2,
        HomeTypeName = "Condo"
    },
    new HomeType
    {
        Id = 3,
        HomeTypeName = "Townhouse"
    },
    new HomeType
    {
        Id = 4,
        HomeTypeName = "Apartment"
    }
});
        modelBuilder.Entity<UserSave>().HasData(new UserSave[]
{
    new UserSave
    {
        Id = 1,
        UserProfileId = 1,
        HomeId = 1
    },
    new UserSave
    {
        Id = 2,
        UserProfileId = 1,
        HomeId = 3
    }
});

    }
}