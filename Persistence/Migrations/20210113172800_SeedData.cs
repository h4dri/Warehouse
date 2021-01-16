using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class SeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "NumberOfProducts", "PriceEa", "ProductName" },
                values: new object[] { 1, 200, 3, "paczki" });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "NumberOfProducts", "PriceEa", "ProductName" },
                values: new object[] { 2, 1000, 2, "gwozdzie" });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "NumberOfProducts", "PriceEa", "ProductName" },
                values: new object[] { 3, 10000, 1, "cukierki" });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "NumberOfProducts", "PriceEa", "ProductName" },
                values: new object[] { 4, 100, 300, "wiertarki" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);
        }
    }
}
