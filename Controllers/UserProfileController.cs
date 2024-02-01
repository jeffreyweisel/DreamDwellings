using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DreamDwellings.Data;
using DreamDwellings.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using DreamDwellings.Models;
using Microsoft.AspNetCore.Identity;

namespace DreamDwellings.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserProfileController : ControllerBase
{
    private DreamDwellingsDbContext _dbContext;

    public UserProfileController(DreamDwellingsDbContext context)
    {
        _dbContext = context;
    }

    // Get all users with Owned and Saved Home properties included
    public IActionResult Get()
    {
        return Ok(_dbContext
            .UserProfiles
            .Include(up => up.IdentityUser)
            .Include(up => up.OwnedHomes)
            .Include(up => up.SavedHomes).ThenInclude(usave => usave.Home)
            .Select(up => new UserProfileDTO
            {
                Id = up.Id,
                FirstName = up.FirstName,
                LastName = up.LastName,
                IdentityUserId = up.IdentityUserId,
                Email = up.IdentityUser.Email,
                UserName = up.IdentityUser.UserName,
                ProfilePicture = up.ProfilePicture,
                OwnedHomes = up.OwnedHomes
                    .Select(h => new HomeDTO
                    {
                        Id = h.Id,
                        UserProfileId = h.UserProfileId,
                        HomeImage = h.HomeImage,
                        StreetAddress = h.StreetAddress,
                        City = h.City,
                        SquareFeet = h.SquareFeet,
                        BedNumber = h.BedNumber,
                        BathNumber = h.BathNumber,
                        ListedOn = h.ListedOn,
                        PurchasedOn = h.PurchasedOn,
                        Sold = h.Sold,
                        HomeTypeId = h.HomeTypeId,
                        HomeType = new HomeTypeDTO
                        {
                            Id = h.HomeType.Id,
                            HomeTypeName = h.HomeType.HomeTypeName
                        },
                        Description = h.Description

                    })
                    .ToList(),
                SavedHomes = up.SavedHomes
                .Select(savedh => new UserSaveDTO
                {
                    Id = savedh.Id,
                    UserProfileId = savedh.UserProfileId,
                    HomeId = savedh.HomeId,
                    Home = new HomeDTO
                    {
                        Id = savedh.Home.Id,
                        UserProfileId = savedh.Home.UserProfileId,
                        HomeImage = savedh.Home.HomeImage,
                        StreetAddress = savedh.Home.StreetAddress,
                        City = savedh.Home.City,
                        SquareFeet = savedh.Home.SquareFeet,
                        BedNumber = savedh.Home.BedNumber,
                        BathNumber = savedh.Home.BathNumber,
                        ListedOn = savedh.Home.ListedOn,
                        PurchasedOn = savedh.Home.PurchasedOn,
                        Sold = savedh.Home.Sold,
                        HomeTypeId = savedh.Home.HomeTypeId,
                        HomeType = new HomeTypeDTO
                        {
                            Id = savedh.Home.HomeType.Id,
                            HomeTypeName = savedh.Home.HomeType.HomeTypeName
                        },
                        Description = savedh.Home.Description
                    }
                })
                .ToList()
            })
            .ToList());
    }

    // Get users with roles
    [HttpGet("withroles")]
    [Authorize(Roles = "Admin")]
    public IActionResult GetWithRoles()
    {
        return Ok(_dbContext.UserProfiles
        .Include(up => up.IdentityUser)
        .Select(up => new UserProfileDTO
        {
            Id = up.Id,
            FirstName = up.FirstName,
            LastName = up.LastName,
            Email = up.IdentityUser.Email,
            UserName = up.IdentityUser.UserName,
            ProfilePicture = up.ProfilePicture,
            IdentityUserId = up.IdentityUserId,
            Roles = _dbContext.UserRoles
            .Where(ur => ur.UserId == up.IdentityUserId)
            .Select(ur => _dbContext.Roles.SingleOrDefault(r => r.Id == ur.RoleId).Name)
            .ToList()
        }));
    }

    
    // Get by Id with Owned and Saved Home properties included
    [HttpGet("{id}")]
    // [Authorize]
    public IActionResult GetUserProfileById(int id)
    {
        UserProfile userProfile = _dbContext
          .UserProfiles
          .Include(p => p.IdentityUser)
          .Include(p => p.OwnedHomes).ThenInclude(h => h.HomeType)
          .Include(p => p.SavedHomes).ThenInclude(savedh => savedh.Home).ThenInclude(h => h.HomeType)
          .SingleOrDefault(up => up.Id == id);

        if (userProfile == null)
        {
            return NotFound();
        }

        return Ok(new UserProfileDTO
        {
            Id = userProfile.Id,
            FirstName = userProfile.FirstName,
            LastName = userProfile.LastName,
            Email = userProfile.IdentityUser.Email,
            UserName = userProfile.IdentityUser.UserName,
            ProfilePicture = userProfile.ProfilePicture,
            OwnedHomes = userProfile.OwnedHomes
                    .Select(h => new HomeDTO
                    {
                        Id = h.Id,
                        UserProfileId = h.UserProfileId,
                        HomeImage = h.HomeImage,
                        StreetAddress = h.StreetAddress,
                        City = h.City,
                        SquareFeet = h.SquareFeet,
                        BedNumber = h.BedNumber,
                        BathNumber = h.BathNumber,
                        ListedOn = h.ListedOn,
                        PurchasedOn = h.PurchasedOn,
                        Sold = h.Sold,
                        HomeTypeId = h.HomeTypeId,
                        HomeType = new HomeTypeDTO
                        {
                            Id = h.HomeType.Id,
                            HomeTypeName = h.HomeType.HomeTypeName
                        },
                        Description = h.Description

                    })
                    .ToList(),
            SavedHomes = userProfile.SavedHomes
                .Select(savedh => new UserSaveDTO
                {
                    Id = savedh.Id,
                    UserProfileId = savedh.UserProfileId,
                    HomeId = savedh.HomeId,
                    Home = new HomeDTO
                    {
                        Id = savedh.Home.Id,
                        UserProfileId = savedh.Home.UserProfileId,
                        HomeImage = savedh.Home.HomeImage,
                        StreetAddress = savedh.Home.StreetAddress,
                        City = savedh.Home.City,
                        SquareFeet = savedh.Home.SquareFeet,
                        BedNumber = savedh.Home.BedNumber,
                        BathNumber = savedh.Home.BathNumber,
                        ListedOn = savedh.Home.ListedOn,
                        PurchasedOn = savedh.Home.PurchasedOn,
                        Sold = savedh.Home.Sold,
                        HomeTypeId = savedh.Home.HomeTypeId,
                        HomeType = new HomeTypeDTO
                        {
                            Id = savedh.Home.HomeType.Id,
                            HomeTypeName = savedh.Home.HomeType.HomeTypeName
                        },
                        Description = savedh.Home.Description
                    }
                })
                .ToList()
        });
    }


}
