using System.Threading.Tasks;
using Application.User;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    public class UserController : BaseController
    {
        [HttpPost("login")]
        public async Task<ActionResult<AppUser>> Login(Login.Query query)
        {
           return await Mediator.Send(query); 
        }
    }
}