using System;

namespace Finance.Domain.Entities
{
    public class ExchangeRate
    {
        public int Id { get; set; }
        public int CurrencyId { get; set; }
        public Currency Currency { get; set; }
        public decimal Rate { get; set; }
        public DateTime Date { get; set; }
    }
}
