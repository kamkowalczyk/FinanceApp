using Finance.ReportGenerator;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Finance.Infrastructure.Data;
using QuestPDF.Infrastructure;

namespace Finance.ReportGenerator
{
    class Program
    {
        static async Task Main(string[] args)
        {
            QuestPDF.Settings.License = LicenseType.Community;
            var serviceCollection = new ServiceCollection();
            ConfigureServices(serviceCollection);

            var serviceProvider = serviceCollection.BuildServiceProvider();

            var reportService = serviceProvider.GetService<ReportService>();
            await reportService.GeneratePdfReportAsync();
        }

        private static void ConfigureServices(IServiceCollection services)
        {
            var configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddEnvironmentVariables()
                .Build();

            services.AddSingleton<IConfiguration>(configuration);

            services.AddDbContext<FinanceDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            services.AddHttpClient();

            services.AddTransient<ReportService>();
        }
    }
}