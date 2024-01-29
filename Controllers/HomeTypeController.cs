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
public class HomeTypeController : ControllerBase
{
    private DreamDwellingsDbContext _dbContext;

    public HomeTypeController(DreamDwellingsDbContext context)
    {
        _dbContext = context;
    }

    // Get all home types 
    public IActionResult Get()
    {
        return Ok(_dbContext
            .HomeTypes
            .Select(ht => new HomeTypeDTO
            {
                Id = ht.Id,
                HomeTypeName = ht.HomeTypeName
            })
            .ToList());
    }


   
}
