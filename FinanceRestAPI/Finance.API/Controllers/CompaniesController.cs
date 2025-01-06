using Finance.Domain.Entities;
using Finance.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Finance.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompaniesController : ControllerBase
    {
        private readonly ICompanyRepository _companyRepository;

        public CompaniesController(ICompanyRepository companyRepository)
        {
            _companyRepository = companyRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var companies = await _companyRepository.GetAllAsync();
            var result = companies.Select(c => new
            {
                Id = c.Id,
                Symbol = c.Symbol,
                Name = c.Name,
                CurrentPrice = c.CurrentPrice,
                MarketCap = c.MarketCap,
                LastUpdated = c.LastUpdated
            });
            return Ok(result);
        }

        [HttpGet("{symbol}")]
        public async Task<IActionResult> GetBySymbol(string symbol)
        {
            var company = await _companyRepository.GetBySymbolAsync(symbol);
            if (company == null)
                return NotFound();

            return Ok(company);
        }
    }
}