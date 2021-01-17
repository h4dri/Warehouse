using System;
using System.Collections.Generic;
using System.Linq;
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
    
        // protected override void OnModelCreating(ModelBuilder builder) // protected - zastrzezona. metoda moze byc uzywana tylko w tej klasie // override - nadpisuje onModelCreating wczesniej stworzone // void - nic nie zwracaj
        // {
            
    
    }
}