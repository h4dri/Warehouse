using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder) // co jest dodawane do bazy danych
        {
            migrationBuilder.CreateTable( // tworzenie tabelu
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true), //id jest autoinkrementacyjne
                    ProductName = table.Column<string>(nullable: true),
                    PriceEa = table.Column<int>(nullable: false),
                    NumberOfProducts = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder) // co jest usuwane z bazy danych
        {
            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
