using System;

namespace Domain
{
    public class Product
    {
        public Guid Id { get; set; }
        public string ProductName { get; set; }
        public float PriceEa { get; set; }
        public int NumberOfProducts { get; set; }
    }
}
