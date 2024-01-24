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
public class UserSaveController : ControllerBase
{
    private DreamDwellingsDbContext _dbContext;

    public UserSaveController(DreamDwellingsDbContext context)
    {
        _dbContext = context;
    }

    // Get all user saves
    [HttpGet]
    public IActionResult Get()
    {
        var userSaves = _dbContext.UserSaves
            .Include(usave => usave.UserProfile)
            .Include(usave => usave.Home)
                .ThenInclude(home => home.HomeType)
            .ToList();

        return Ok(userSaves);
    }


    // Get user save by Id
    [HttpGet("{id}")]
    // [Authorize]
    public IActionResult GetUserSaveById(int id)
    {
        UserSave usave = _dbContext
          .UserSaves
          .Include(us => us.UserProfile)
          .Include(us => us.Home)
          .SingleOrDefault(h => h.Id == id);

        if (usave == null)
        {
            return NotFound();
        }

        return Ok(usave);
    }

    // Delete a user save
    [HttpDelete("{id}")]
    // [Authorize]
    public IActionResult DeleteUserSave(int id)
    {
        UserSave gettingDeleted = _dbContext.UserSaves.SingleOrDefault(usave => usave.Id == id);

        if (gettingDeleted == null)
        {
            return NotFound();
        }

        _dbContext.UserSaves.Remove(gettingDeleted);
        _dbContext.SaveChanges();

        return NoContent();
    }




}