using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    [Route("api/[controller]")] // <---- info o ściezce dostepu do zapytań
    [ApiController] // <--- info dla systemy ze jest to kontroller api
    public class ProductsController : ControllerBase
    {
        private readonly DataContext _context;
        public ProductsController(DataContext context) // <---- Controller bedzie uzywał bazy danych o nazwie obiektu "context"
        {
            _context = context;  // <--- obiekt "_context" przypisz jako "context" z zewnątrz czyli bazę danych
        }

        // GET api/values // wyświetl produkty
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> Get() // tworzony jest osobny task zeby mozna bylo wysylac asynchronicznie zeby nie obciazac bazy danych
        {
            var products = await _context.Products.ToListAsync(); // przeleć po bazie danych "_context" po produktach "Products" i każdy dodaj asynchronicznie do listy
            return Ok(products); // zwróć kod Ok czyli 200 i produkty
        }

        //GET api/values/5 // wyświetl produkt po ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> Get(int id)
        {
            var products = await _context.Products.FindAsync(id); // // przeleć po bazie danych "_context" po produktach "Products" i znajdz asynchronicznie tego który ma podane id
            return Ok(products); // zwróć kod Ok czyli 200 i produkty
        }

        // POST api/values // stwórz produkt
        [HttpPost]
        public void Post([FromBody] string product) // stwórz produkt o wartosciach z [FromBody] (.json), który uzupełnisz w czasie tworzenia
        {
        }

        // PUT api/values/5 // edytuj produkt po ID
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string product) // edytuj produkt o wartosciach z [FromBody] (.json), który uzupełnisz w czasie tworzenia
        {
        }

        // DELETE api/values/5  // usun produkt po Id
        [HttpDelete("{id}")]
        public void Delete(int id) 
        {
        }
    }
}
