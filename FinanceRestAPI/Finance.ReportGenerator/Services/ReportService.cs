using Finance.Infrastructure.Data;
using QuestPDF.Fluent;
using QuestPDF.Infrastructure;
using QuestPDF.Helpers;
using Newtonsoft.Json.Linq;

namespace Finance.ReportGenerator
{
    public class ReportService
    {
        private readonly FinanceDbContext _context;
        private readonly HttpClient _httpClient;

        public ReportService(FinanceDbContext context, HttpClient httpClient)
        {
            _context = context;
            _httpClient = httpClient;

            QuestPDF.Settings.License = LicenseType.Community;
        }

        public async Task GeneratePdfReportAsync()
        {
            var exchangeRates = await FetchExchangeRatesForLast7DaysAsync();

            if (exchangeRates.Count == 0)
            {
                Console.WriteLine("No data fetched from NBP API.");
                return;
            }

            var groupedRates = exchangeRates
                .GroupBy(e => e.CurrencyCode)
                .ToList();

            var reportsDir = Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory()).FullName, "SharedReports");
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
                        row.RelativeColumn().Text($"Exchange Rate Report - Last 7 Days ({DateTime.UtcNow:dd.MM.yyyy})")
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

                                foreach (var rate in group.OrderBy(r => r.Date))
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

        private async Task<List<ExchangeRateDto>> FetchExchangeRatesForLast7DaysAsync()
        {
            var result = new List<ExchangeRateDto>();

            for (int i = 0; i < 7; i++)
            {
                var date = DateTime.UtcNow.AddDays(-i).ToString("yyyy-MM-dd");

                try
                {
                    var response = await _httpClient.GetStringAsync($"http://api.nbp.pl/api/exchangerates/tables/A/{date}/?format=json");
                    var data = JArray.Parse(response);

                    foreach (var item in data[0]["rates"])
                    {
                        result.Add(new ExchangeRateDto
                        {
                            CurrencyCode = item["code"].ToString(),
                            Date = DateTime.Parse(date),
                            Rate = decimal.Parse(item["mid"].ToString())
                        });
                    }
                }
                catch (HttpRequestException ex)
                {
                    Console.WriteLine($"Error fetching exchange rates for {date}: {ex.Message}");
                }
            }

            return result;
        }
    }
}
