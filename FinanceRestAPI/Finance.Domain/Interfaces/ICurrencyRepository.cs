using Finance.Domain.Entities;

namespace Finance.Domain.Interfaces
{
    public interface ICurrencyRepository
    {
        Task<IEnumerable<Currency>> GetAllAsync();
        Task<Currency> GetByCodeAsync(string code);
        Task AddAsync(Currency currency);

    }
}