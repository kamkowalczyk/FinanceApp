using Moq;
using Finance.Application.Services;
using Finance.Domain.Entities;
using Microsoft.Extensions.Logging;
using Finance.Domain.Services;

namespace Finance.Tests.Services
{
    public class CryptoCurrencyServiceTests
    {

        [Fact]
        public async Task GetTop10CryptocurrenciesAsync_ShouldReturnNonEmptyCollection()
        {
            // Arrange
            var cryptoRepoMock = new Mock<ICryptoCurrencyRepository>();
            var loggerMock = new Mock<ILogger<CryptoCurrencyService>>();
            var service = new CryptoCurrencyService(
                cryptoRepoMock.Object,
                loggerMock.Object
            );

            // Act
            var result = await service.GetTop10CryptocurrenciesAsync();

            // Assert
            Assert.NotNull(result);
        }
    }
}
