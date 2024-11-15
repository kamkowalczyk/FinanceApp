using System.Text;
using Finance.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Finance.ReportGenerator
{
    public class ReportService
    {
        private readonly FinanceDbContext _context;

        public ReportService(FinanceDbContext context)
        {
            _context = context;
        }

        public async Task GenerateReportAsync()
        {
            var exchangeRates = await _context.ExchangeRates
                .Include(e => e.Currency)
                .Where(e => e.Date >= DateTime.UtcNow.AddDays(-7))
                .OrderBy(e => e.Date)
                .ToListAsync();

            var groupedRates = exchangeRates
                .GroupBy(e => e.Currency.Code)
                .ToList();

            var reportBuilder = new StringBuilder();
            reportBuilder.AppendLine($"Exchange Rate Report - {DateTime.UtcNow:dd.MM.yyyy}");
            reportBuilder.AppendLine(new string('-', 50));

            foreach (var group in groupedRates)
            {
                reportBuilder.AppendLine($"Currency: {group.Key}");
                reportBuilder.AppendLine("Date\t\tRate");

                foreach (var rate in group)
                {
                    reportBuilder.AppendLine($"{rate.Date:yyyy-MM-dd}\t{rate.Rate:F4}");
                }

                reportBuilder.AppendLine();
            }

            var reportsDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Reports");
            if (!Directory.Exists(reportsDirectory))
            {
                Directory.CreateDirectory(reportsDirectory);
            }

            var fileName = $"Report_{DateTime.UtcNow:yyyyMMdd}.txt";
            var filePath = Path.Combine(reportsDirectory, fileName);

            await File.WriteAllTextAsync(filePath, reportBuilder.ToString());

            Console.WriteLine($"Report generated: {filePath}");
        }
    }
}
