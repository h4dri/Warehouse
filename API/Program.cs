using System;
using Domain;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Persistence;

//to jest plik który uruchamia nasz backend

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope()) // Dependecy injection
            {
                var services = scope.ServiceProvider;
                try
                {
                    var context = services.GetRequiredService<DataContext>();
                    var userManager = services.GetRequiredService<UserManager<AppUser>>();
                    context.Database.Migrate(); // tworzy baze denych jezeli nie istnieje
                    Seed.SeedData(context, userManager).Wait(); // dodanie poczatkowych wartosci do bazy danych
                }
                catch(Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>(); 
                    logger.LogError(ex, "An error occured during migration");
                }
            }
        
        host.Run();

        }
        // ustawienia backendu znajduja sie w Startupp

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>(); //<---- ta linijka o tym mówi
                });
    
    }
}
