using System.Threading.Tasks;
using Application.User;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    public class UserController : ControllerBase
    {
        private readonly DataContext _context; //inicjuj obiekt bazy danych
        private readonly IMediator _mediator; //inicjuj obiekt mediatora
        public UserController(DataContext context, IMediator mediator) // <---- Controller bedzie uzywał bazy danych o nazwie obiektu "context", Mediator - używaj mediatora
        {
            _mediator = mediator; // korzystaj z mediatora
            _context = context;  // <--- obiekt "_context" przypisz jako "context" z zewnątrz czyli bazę danych
        }

        [HttpPost("login")]
        public async Task<ActionResult<AppUser>> Login(Login.Query query)
        {
           return await _mediator.Send(query); 
        }
    }
}