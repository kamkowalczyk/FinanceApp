using Microsoft.EntityFrameworkCore;
using Finance.Domain.Entities;

namespace Finance.Infrastructure.Data
{
    public class FinanceDbContext : DbContext
    {
        public FinanceDbContext(DbContextOptions<FinanceDbContext> options)
            : base(options)
        {
        }

        public DbSet<Currency> Currencies { get; set; }
        public DbSet<ExchangeRate> ExchangeRates { get; set; }

        public DbSet<Company> Companies { get; set; }
        public DbSet<CryptoCurrency> CryptoCurrencies { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Currency>().HasData(
             new Currency { Id = 1, Code = "USD", Name = "US Dollar" },
             new Currency { Id = 2, Code = "EUR", Name = "Euro" },
             new Currency { Id = 3, Code = "GBP", Name = "British Pound" }
         );

            modelBuilder.Entity<ExchangeRate>().HasData(
                new ExchangeRate { Id = 1, CurrencyId = 1, Rate = 1.00m, Date = new DateTime(2024, 4, 25) },
                new ExchangeRate { Id = 2, CurrencyId = 2, Rate = 1.10m, Date = new DateTime(2024, 4, 25) },
                new ExchangeRate { Id = 3, CurrencyId = 3, Rate = 1.30m, Date = new DateTime(2024, 4, 25) }
            );

            modelBuilder.Entity<Company>().HasData(
                new Company
                {
                    Id = 1,
                    Symbol = "AAPL",
                    Name = "Apple",
                    CurrentPrice = 150.00m,
                    MarketCap = 2500000000m,
                    LastUpdated = new DateTime(2024, 4, 25, 10, 0, 0)
                },
                new Company
                {
                    Id = 2,
                    Symbol = "MSFT",
                    Name = "Microsoft",
                    CurrentPrice = 280.00m,
                    MarketCap = 2100000000m,
                    LastUpdated = new DateTime(2024, 4, 25, 10, 5, 0)
                }
            );

            modelBuilder.Entity<CryptoCurrency>().HasData(
                new CryptoCurrency
                {
                    Id = 1,
                    Symbol = "BTC",
                    Name = "Bitcoin",
                    CurrentPrice = 30000.00m,
                    MarketCap = 600000000000m,
                    TotalVolume = 25000000m,
                    LastUpdated = new DateTime(2024, 4, 25, 11, 0, 0)
                },
                new CryptoCurrency
                {
                    Id = 2,
                    Symbol = "ETH",
                    Name = "Ethereum",
                    CurrentPrice = 2000.00m,
                    MarketCap = 250000000000m,
                    TotalVolume = 15000000m,
                    LastUpdated = new DateTime(2024, 4, 25, 11, 5, 0)
                }
            );

            modelBuilder.Entity<Currency>()
                .HasKey(c => c.Id);

            modelBuilder.Entity<ExchangeRate>()
                .HasKey(e => e.Id);

            modelBuilder.Entity<ExchangeRate>()
                .HasOne(e => e.Currency)
                .WithMany(c => c.ExchangeRates)
                .HasForeignKey(e => e.CurrencyId);

            modelBuilder.Entity<Company>()
                .HasKey(c => c.Id);
            modelBuilder.Entity<CryptoCurrency>()
                .HasKey(c => c.Id);
            modelBuilder.Entity<Company>();
        }
    }
}