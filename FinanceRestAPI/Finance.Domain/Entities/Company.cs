﻿using System;

namespace Finance.Domain.Entities
{
    public class Company
    {
        public int Id { get; set; }
        public string Symbol { get; set; } 
        public string Name { get; set; }
        public decimal? CurrentPrice { get; set; }
        public decimal? MarketCap { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}