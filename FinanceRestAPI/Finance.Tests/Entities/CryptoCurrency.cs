using Finance.Domain.Entities;

namespace Finance.Tests.Entities
{
    public class CryptoCurrencyTests
    {
        [Fact]
        public void CryptoCurrencyProperties_ShouldSetAndGetCorrectly()
        {
            // Arrange
            var crypto = new CryptoCurrency();

            // Act
            crypto.Id = 10;
            crypto.Symbol = "BTC";
            crypto.Name = "Bitcoin";
            crypto.CurrentPrice = 25000.75m;
            crypto.MarketCap = 600000m;
            crypto.TotalVolume = 15000m;
            crypto.ImageUrl = "http://some-url.com/btc.png";
            crypto.LastUpdated = new DateTime(2023, 2, 2);

            // Assert
            Assert.Equal(10, crypto.Id);
            Assert.Equal("BTC", crypto.Symbol);
            Assert.Equal("Bitcoin", crypto.Name);
            Assert.Equal(25000.75m, crypto.CurrentPrice);
            Assert.Equal(600000m, crypto.MarketCap);
            Assert.Equal(15000m, crypto.TotalVolume);
            Assert.Equal("http://some-url.com/btc.png", crypto.ImageUrl);
            Assert.Equal(new DateTime(2023, 2, 2), crypto.LastUpdated);
        }
    }
}