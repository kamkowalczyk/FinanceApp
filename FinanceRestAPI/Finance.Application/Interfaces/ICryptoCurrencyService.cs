using Finance.Domain.Entities;
using System.Threading.Tasks;

namespace Finance.Application.Interfaces
{
    public interface ICryptoCurrencyService
    {
        Task FetchAndStoreCryptoDataAsync();
        Task<IEnumerable<object>> GetTop10CryptocurrenciesAsync();

    }
}