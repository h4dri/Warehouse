using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Products;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    [Route("api/[controller]")] // <---- info o ściezce dostepu do zapytań
    [ApiController] // <--- info dla systemy ze jest to kontroller api
    public class ProductsController : ControllerBase
    {
        private readonly DataContext _context; //inicjuj obiekt bazy danych
        private readonly IMediator _mediator; //inicjuj obiekt mediatora
        public ProductsController(DataContext context, IMediator mediator) // <---- Controller bedzie uzywał bazy danych o nazwie obiektu "context", Mediator - używaj mediatora
        {
            _mediator = mediator; // korzystaj z mediatora
            _context = context;  // <--- obiekt "_context" przypisz jako "context" z zewnątrz czyli bazę danych
        }

        // GET api/values // wyświetl produkty
        [HttpGet]
        public async Task<ActionResult<List<Product>>> List() // tworzony jest osobny task zeby mozna bylo wysylac asynchronicznie zeby nie obciazac bazy danych
        {
            return await _mediator.Send(new List.Query());
        }

        //GET api/values/5 // wyświetl produkt po ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> Details(Guid id)
        {
            return await _mediator.Send(new Details.Query{Id = id});
        }

        // POST api/values // stwórz produkt
        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await _mediator.Send(command);
        }

        // PUT api/values/5 // edytuj produkt po ID
        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit (Guid id, Edit.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }

        // DELETE api/values/5  // usun produkt po Id
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await _mediator.Send(new Delete.Command{Id = id});
        }
    }
}
