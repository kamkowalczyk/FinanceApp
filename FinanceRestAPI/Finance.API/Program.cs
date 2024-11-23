using Finance.Application.Interfaces;
using Finance.Application.Services;
using Finance.Domain.Interfaces;
using Finance.Domain.Services;
using Finance.Infrastructure.Data;
using Finance.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<FinanceDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddScoped<ICurrencyRepository, CurrencyRepository>();
builder.Services.AddScoped<IExchangeRateRepository, ExchangeRateRepository>();
builder.Services.AddScoped<ICryptoCurrencyRepository, CryptoCurrencyRepository>();
builder.Services.AddScoped<ICompanyRepository, CompanyRepository>();


builder.Services.AddScoped<IExchangeRateService, ExchangeRateService>();
builder.Services.AddScoped<ICryptoCurrencyService, CryptoCurrencyService>();



var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<FinanceDbContext>();
    dbContext.Database.Migrate();

    var cryptoService = scope.ServiceProvider.GetRequiredService<ICryptoCurrencyService>();
    await cryptoService.FetchAndStoreCryptoDataAsync();

    var exchangeRateService = scope.ServiceProvider.GetRequiredService<IExchangeRateService>();
    await exchangeRateService.FetchAndStoreExchangeRatesAsync();

}
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
