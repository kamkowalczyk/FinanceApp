using Finance.Domain.Entities;
namespace Finance.Domain.Interfaces
{
    public interface ICompanyRepository
    {
        Task<IEnumerable<Company>> GetAllAsync();
        Task<Company> GetBySymbolAsync(string symbol);
        Task AddAsync(Company company);
        Task UpdateAsync(Company company);
    }
}