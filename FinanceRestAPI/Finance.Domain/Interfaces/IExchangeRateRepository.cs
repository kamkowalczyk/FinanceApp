using Finance.Domain.Entities;

namespace Finance.Domain.Interfaces
{
    public interface IExchangeRateRepository
    {
        Task<IEnumerable<ExchangeRate>> GetByCurrencyCodeAsync(string currencyCode);
        Task AddAsync(ExchangeRate exchangeRate);
    }
}