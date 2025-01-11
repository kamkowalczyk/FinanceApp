using Finance.Domain.Entities;

namespace Finance.Tests.Entities
{
    public class CurrencyTests
    {
        [Fact]
        public void CurrencyProperties_ShouldSetAndGetCorrectly()
        {
            // Arrange
            var currency = new Currency();

            // Act
            currency.Id = 1;
            currency.Code = "USD";
            currency.Name = "US Dollar";

            // Assert
            Assert.Equal(1, currency.Id);
            Assert.Equal("USD", currency.Code);
            Assert.Equal("US Dollar", currency.Name);
        }

        [Fact]
        public void Currency_ExchangeRatesCollection_CanBeSetAndRetrieved()
        {
            // Arrange
            var currency = new Currency();
            var rates = new List<ExchangeRate>
            {
                new ExchangeRate { Id = 101, Rate = 1.234m },
                new ExchangeRate { Id = 102, Rate = 2.345m }
            };

            // Act
            currency.ExchangeRates = rates;

            // Assert
            Assert.NotNull(currency.ExchangeRates);
            Assert.Equal(2, currency.ExchangeRates.Count);
            Assert.Contains(currency.ExchangeRates, r => r.Id == 101);
            Assert.Contains(currency.ExchangeRates, r => r.Id == 102);
        }
    }
}