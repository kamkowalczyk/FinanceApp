
using Finance.Domain.Entities;

namespace Finance.Tests.Entities
{
    public class ExchangeRateTests
    {
        [Fact]
        public void ExchangeRateProperties_ShouldSetAndGetCorrectly()
        {
            // Arrange
            var exchangeRate = new ExchangeRate();
            var now = DateTime.UtcNow.Date;

            // Act
            exchangeRate.Id = 10;
            exchangeRate.CurrencyId = 1;
            exchangeRate.Rate = 4.567m;
            exchangeRate.Date = now;

            // Assert
            Assert.Equal(10, exchangeRate.Id);
            Assert.Equal(1, exchangeRate.CurrencyId);
            Assert.Equal(4.567m, exchangeRate.Rate);
            Assert.Equal(now, exchangeRate.Date);
        }

        [Fact]
        public void ExchangeRate_CurrencyReference_CanBeSetAndRetrieved()
        {
            // Arrange
            var currency = new Currency { Id = 2, Code = "EUR", Name = "Euro" };
            var exchangeRate = new ExchangeRate();

            // Act
            exchangeRate.Currency = currency;
            exchangeRate.CurrencyId = currency.Id;

            // Assert
            Assert.Equal(2, exchangeRate.CurrencyId);
            Assert.NotNull(exchangeRate.Currency);
            Assert.Equal("EUR", exchangeRate.Currency.Code);
        }
    }
}