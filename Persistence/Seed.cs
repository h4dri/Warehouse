using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext context)
            {
                if(!context.Products.Any()) // jezeli nie ma zadnych produktow to zainicjuj te ponizej 
                {
                    var products = new List<Product>
                    {
                        new Product
                        {
                            ProductName = "paczki",
                            PriceEa = 2,
                            NumberOfProducts = 200,
                        },
                        new Product
                        {
                            ProductName = "gwozdzie",
                            PriceEa = 1,
                            NumberOfProducts = 1000,
                        },
                    };

                    context.Products.AddRange(products);
                    context.SaveChanges();

                }
            }
    }
}