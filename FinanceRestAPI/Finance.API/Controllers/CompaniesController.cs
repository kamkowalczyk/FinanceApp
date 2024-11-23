using Finance.Domain.Entities;
using Finance.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

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
        public async Task<ActionResult<IEnumerable<Company>>> GetAll()
        {
            var companies = await _companyRepository.GetAllAsync();
            return Ok(companies);
        }

        [HttpGet("{symbol}")]
        public async Task<ActionResult<Company>> GetBySymbol(string symbol)
        {
            var company = await _companyRepository.GetBySymbolAsync(symbol);
            if (company == null)
            {
                return NotFound();
            }
            return Ok(company);
        }
    }
}