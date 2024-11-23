using Finance.Domain.Entities;

namespace Finance.Domain.Services
{
    public interface ICryptoCurrencyRepository
    {
        Task<IEnumerable<CryptoCurrency>> GetAllAsync();
        Task<CryptoCurrency> GetBySymbolAsync(string symbol);
        Task AddAsync(CryptoCurrency cryptoCurrency);
        Task UpdateAsync(CryptoCurrency cryptoCurrency);
    }
}