using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
            {
                if(!userManager.Users.Any())
                {
                    var users = new List<AppUser>
                    {
                        new AppUser
                        {
                            DisplayName = "Emerle",
                            UserName = "eme",
                            Email = "eme@hb.com",
                            isAdmin = true,
                        },
                        new AppUser
                        {
                            DisplayName = "Barczak",
                            UserName = "bar",
                            Email = "bob@hb.com",
                            isAdmin = false,
                        },
                    };
                    foreach (var user in users)
                    {
                        await userManager.CreateAsync(user, "Pa$$w0rd");
                    }

                }

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