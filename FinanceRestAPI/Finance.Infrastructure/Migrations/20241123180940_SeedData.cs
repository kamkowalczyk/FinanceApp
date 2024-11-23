using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Finance.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class SeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Companies",
                columns: new[] { "Id", "CurrentPrice", "LastUpdated", "MarketCap", "Name", "Symbol" },
                values: new object[,]
                {
                    { 1, 150.00m, new DateTime(2024, 4, 25, 10, 0, 0, 0, DateTimeKind.Unspecified), 2500000000m, "Apple", "AAPL" },
                    { 2, 280.00m, new DateTime(2024, 4, 25, 10, 5, 0, 0, DateTimeKind.Unspecified), 2100000000m, "Microsoft", "MSFT" }
                });

            migrationBuilder.InsertData(
                table: "CryptoCurrencies",
                columns: new[] { "Id", "CurrentPrice", "LastUpdated", "MarketCap", "Name", "Symbol", "TotalVolume" },
                values: new object[,]
                {
                    { 1, 30000.00m, new DateTime(2024, 4, 25, 11, 0, 0, 0, DateTimeKind.Unspecified), 600000000000m, "Bitcoin", "BTC", 25000000m },
                    { 2, 2000.00m, new DateTime(2024, 4, 25, 11, 5, 0, 0, DateTimeKind.Unspecified), 250000000000m, "Ethereum", "ETH", 15000000m }
                });

            migrationBuilder.InsertData(
                table: "Currencies",
                columns: new[] { "Id", "Code", "Name" },
                values: new object[,]
                {
                    { 1, "USD", "US Dollar" },
                    { 2, "EUR", "Euro" },
                    { 3, "GBP", "British Pound" }
                });

            migrationBuilder.InsertData(
                table: "ExchangeRates",
                columns: new[] { "Id", "CurrencyId", "Date", "Rate" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2024, 4, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 1.00m },
                    { 2, 2, new DateTime(2024, 4, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 1.10m },
                    { 3, 3, new DateTime(2024, 4, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 1.30m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Companies",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Companies",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "CryptoCurrencies",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "CryptoCurrencies",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "ExchangeRates",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "ExchangeRates",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "ExchangeRates",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Currencies",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Currencies",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Currencies",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
