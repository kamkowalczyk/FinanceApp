using Finance.Domain.Entities;

namespace Finance.Tests.Entities
{
    public class CompanyTests
    {
        [Fact]
        public void CompanyProperties_ShouldSetAndGetCorrectly()
        {
            // Arrange
            var company = new Company();

            // Act
            company.Id = 1;
            company.Symbol = "AAPL";
            company.Name = "Apple Inc.";
            company.CurrentPrice = 150.5m;
            company.MarketCap = 2000m;
            company.LastUpdated = new DateTime(2023, 1, 1);

            // Assert
            Assert.Equal(1, company.Id);
            Assert.Equal("AAPL", company.Symbol);
            Assert.Equal("Apple Inc.", company.Name);
            Assert.Equal(150.5m, company.CurrentPrice);
            Assert.Equal(2000m, company.MarketCap);
            Assert.Equal(new DateTime(2023, 1, 1), company.LastUpdated);
        }
    }
}
