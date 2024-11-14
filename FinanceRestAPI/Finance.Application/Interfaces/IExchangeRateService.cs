namespace Finance.Application.Interfaces
{
    public interface IExchangeRateService
    {
        Task FetchAndStoreExchangeRatesAsync();
    }
}