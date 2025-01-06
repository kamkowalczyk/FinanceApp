using Finance.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using QuestPDF.Fluent;
using QuestPDF.Infrastructure;
using QuestPDF.Helpers;

namespace Finance.ReportGenerator
{
    public class ReportService
    {
        private readonly FinanceDbContext _context;

        public ReportService(FinanceDbContext context)
        {
            _context = context;
        }

        public async Task GeneratePdfReportAsync()
        {
            var exchangeRates = await _context.ExchangeRates
                .Include(e => e.Currency)
                .Where(e => e.Date >= DateTime.UtcNow.AddDays(-7))
                .OrderBy(e => e.Date)
                .ToListAsync();


            var groupedRates = exchangeRates
                .GroupBy(e => e.Currency.Code)
                .ToList();
            var reportsDir = Path.Combine(Directory.GetCurrentDirectory(), "Reports");
            if (!Directory.Exists(reportsDir))
                Directory.CreateDirectory(reportsDir);

            var fileName = $"Report_{DateTime.UtcNow:yyyyMMdd}.pdf";
            var filePath = Path.Combine(reportsDir, fileName);

            var document = Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.Margin(2, Unit.Centimetre);

                    page.Header().Row(row =>
                    {
                        row.RelativeColumn().Text($"Exchange Rate Report - {DateTime.UtcNow:dd.MM.yyyy}")
                            .FontSize(18)
                            .Bold()
                            .FontColor(Colors.Blue.Medium);
                    });

                    page.Content().Stack(stack =>
                    {
                        foreach (var group in groupedRates)
                        {
                            stack.Item().Text($"Currency: {group.Key}")
                                .FontSize(14).Bold()
                                .FontColor(Colors.Blue.Darken4);

                            stack.Item().Table(table =>
                            {
                                table.ColumnsDefinition(columns =>
                                {
                                    columns.ConstantColumn(80);
                                    columns.RelativeColumn(); 
                                });

                                table.Header(header =>
                                {
                                    header.Cell().Text("Date").Bold();
                                    header.Cell().Text("Rate").Bold();
                                });

                                foreach (var rate in group)
                                {
                                    table.Cell().Text(rate.Date.ToString("yyyy-MM-dd"));
                                    table.Cell().Text(rate.Rate.ToString("F4"));
                                }
                            });

                            stack.Spacing(10);
                        }
                    });

                    page.Footer().AlignCenter().Text(txt =>
                    {
                        txt.CurrentPageNumber();
                        txt.Span(" / ");
                        txt.TotalPages();
                    });
                });
            });

            document.GeneratePdf(filePath);

            Console.WriteLine($"PDF generated: {filePath}");
        }
    }
}
