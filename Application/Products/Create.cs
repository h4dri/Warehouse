using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Products
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string ProductName { get; set; }
            public int PriceEa { get; set; }
            public int NumberOfProducts { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var product = new Product
                {
                    Id = request.Id,
                    ProductName = request.ProductName,
                    PriceEa = request.PriceEa,
                    NumberOfProducts = request.NumberOfProducts
                };

                _context.Products.Add(product);
                var success = await _context.SaveChangesAsync() > 0;

                if(success)
                {
                    return Unit.Value;
                }

                throw new Exception("Problem saving changes");

            }
        }
    }
}