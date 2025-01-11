using Moq;
using Finance.Application.Services;
using Finance.Domain.Entities;
using Finance.Domain.Interfaces;
using Microsoft.Extensions.Logging;

namespace Finance.Tests.Services
{
    public class ExchangeRateServiceTests
    {
        [Fact]
        public async Task FetchAndStoreExchangeRatesAsync_WhenCurrencyDoesNotExist_ShouldCreateNewCurrency()
        {
            // Arrange
            var currencyRepoMock = new Mock<ICurrencyRepository>();
            var exchangeRateRepoMock = new Mock<IExchangeRateRepository>();
            var loggerMock = new Mock<ILogger<ExchangeRateService>>();

            currencyRepoMock
                .Setup(r => r.GetByCodeAsync(It.IsAny<string>()))
                .ReturnsAsync((Currency)null);

            var service = new ExchangeRateService(
                currencyRepoMock.Object,
                exchangeRateRepoMock.Object,
                loggerMock.Object
            );

            // Act
            await service.FetchAndStoreExchangeRatesAsync();

            // Assert
            currencyRepoMock
                .Verify(repo => repo.AddAsync(It.IsAny<Currency>()), Times.AtLeastOnce);

            exchangeRateRepoMock
                .Verify(repo => repo.AddAsync(It.IsAny<ExchangeRate>()), Times.AtLeastOnce);
        }
    }
}