using System.ComponentModel.DataAnnotations;

namespace DreamDwellings.Models.DTOs;

public class RegistrationDTO
{
    public string Email { get; set; }
    public string Password { get; set; }
    public string UserName { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
   

}