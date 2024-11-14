using Finance.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using Colors = QuestPDF.Helpers.Colors;

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
                .ToListAsync();

            var groupedRates = exchangeRates
                .GroupBy(e => e.Currency.Code)
                .ToDictionary(g => g.Key, g => g.OrderBy(e => e.Date).ToList());

            var report = Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Margin(50);
                    page.Size(PageSizes.A4);
                    page.PageColor(Colors.White);
                    page.DefaultTextStyle(x => x.FontSize(16));

                    page.Header()
                        .Text($"Exchange Rate Report - {DateTime.UtcNow:dd.MM.yyyy}")
                        .SemiBold().FontSize(24).FontColor(Colors.Blue.Medium);

                    page.Content()
                        .PaddingVertical(10)
                        .Column(column =>
                        {
                            foreach (var currencyCode in groupedRates.Keys)
                            {
                                var rates = groupedRates[currencyCode];

                                column.Item().Text($"Currency: {currencyCode}").Bold();

                                var chartImage = GenerateChartImage(rates);

                                column.Item().Image(chartImage, ImageScaling.FitWidth);

                                column.Item().Padding(10);
                            }
                        });

                    page.Footer()
                        .AlignCenter()
                        .Text(x =>
                        {
                            x.Span("Page ");
                            x.CurrentPageNumber();
                            x.Span(" of ");
                            x.TotalPages();
                        });
                });
            });

            var reportsDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Reports");
            if (!Directory.Exists(reportsDirectory))
            {
                Directory.CreateDirectory(reportsDirectory);
            }

            var fileName = $"Report_{DateTime.UtcNow:yyyyMMdd}.pdf";
            var filePath = Path.Combine(reportsDirectory, fileName);

            report.GeneratePdf(filePath);

            Console.WriteLine($"Report generated: {filePath}");
        }

        private byte[] GenerateChartImage(System.Collections.Generic.List<Finance.Domain.Entities.ExchangeRate> rates)
        {
            var dates = rates.Select(r => r.Date.ToOADate()).ToArray();
            var values = rates.Select(r => (double)r.Rate).ToArray();

            var plt = new ScottPlot.Plot(600, 400);
            plt.AddScatter(dates, values);
            plt.XAxis.DateTimeFormat(true);
            plt.Title($"Trend for {rates.First().Currency.Code}");
            plt.XLabel("Date");
            plt.YLabel("Rate");

            return plt.GetImageBytes();
        }
    }
}
