using Finance.Application.Services;
using Finance.Domain.Entities;
using Finance.Domain.Interfaces;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;

public class CompanyServiceTests
{
    private readonly Mock<ICompanyRepository> _mockRepository;
    private readonly CompanyService _service;

    public CompanyServiceTests()
    {
        _mockRepository = new Mock<ICompanyRepository>();
        _service = new CompanyService(_mockRepository.Object, new NullLogger<CompanyService>());
    }

    [Fact]
    public async Task FetchAndStoreCompanyDataAsync_StoresDataCorrectly()
    {
        // Arrange
        var mockCompany = new Company { Symbol = "AAPL", Name = "Apple Inc.", CurrentPrice = 150m };
        _mockRepository.Setup(repo => repo.GetBySymbolAsync(It.IsAny<string>()))
                       .ReturnsAsync((Company)null);
        _mockRepository.Setup(repo => repo.AddAsync(It.IsAny<Company>()))
                       .Returns(Task.CompletedTask);

        // Act
        await _service.FetchAndStoreCompanyDataAsync();

        // Assert
        _mockRepository.Verify(repo => repo.AddAsync(It.Is<Company>(c => c.Symbol == "AAPL")), Times.Once);
    }

    [Fact]
    public void Constructor_SetsApiKeyCorrectly()
    {
        // Arrange & Act
        var apiKeyField = typeof(CompanyService).GetField("_apiKey", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
        var apiKey = (string)apiKeyField.GetValue(_service);

        // Assert
        Assert.Equal("SMH7APF3Z8TM0FFM", apiKey);
    }
}
