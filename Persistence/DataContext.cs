using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext //<---- DbContext możemy używać dzięki dodaniu Nugget Package Microsoft.EntityFrameWorkCore wykorzyustanie mozemy zobaczyc w pliku .csproj
    {
        // konstruktor, który umożliwi nam migrowanie danych
        public DataContext(DbContextOptions options) : base(options) 
        {
        }

        public DbSet<Product> Products { get; set; } // Tworzymy encje (tabelę), w której nazwy kolumn będą takie jak w klasie Product. Tabele nazwiemy Products
    
        protected override void OnModelCreating(ModelBuilder builder) // protected - zastrzezona. metoda moze byc uzywana tylko w tej klasie // override - nadpisuje onModelCreating wczesniej stworzone // void - nic nie zwracaj
        {
            builder.Entity<Product>() // tworzymy zmienne ktore dodadza sie po pierwszym odpaleniu
                .HasData(
                    new Product{
                        Id = 1,
                        ProductName = "paczki",
                        PriceEa = 3,
                        NumberOfProducts = 200
                    },
                    new Product{
                        Id = 2,
                        ProductName = "gwozdzie",
                        PriceEa = 2,
                        NumberOfProducts = 1000
                    },new Product{
                        Id = 3,
                        ProductName = "cukierki",
                        PriceEa = 1,
                        NumberOfProducts = 10000
                    },
                    new Product{
                        Id = 4,
                        ProductName = "wiertarki",
                        PriceEa = 300,
                        NumberOfProducts = 100
                    }
                );
        }
    }
}