namespace Finance.Domain.Entities
{
    public class Currency
    {
        public int Id { get; set; }
        public string Code { get; set; } 
        public string Name { get; set; } 
        public ICollection<ExchangeRate> ExchangeRates { get; set; }
    }
}