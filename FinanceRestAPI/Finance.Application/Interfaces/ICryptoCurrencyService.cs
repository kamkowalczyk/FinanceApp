using System.Threading.Tasks;

namespace Finance.Application.Interfaces
{
    public interface ICryptoCurrencyService
    {
        Task FetchAndStoreCryptoDataAsync();
    }
}