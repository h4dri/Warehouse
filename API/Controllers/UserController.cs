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
        public async Task<ActionResult<User>> Login(Login.Query query)
        {
           return await Mediator.Send(query); 
        }
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register (Register.Command command)
        {
            return await Mediator.Send(command);
        }
    }
}