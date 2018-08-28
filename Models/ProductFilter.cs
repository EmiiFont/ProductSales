using System.Collections.Generic;

namespace ProductSales.Models
{
    public class ProductFilter : FilterCommon
    {
        public List<string> Companies { get; set; } = new List<string>();
        public List<string> ProductTypes { get; set; } = new List<string>();
        public List<string> ProductCategories { get; set; } = new List<string>();
    }

    public class FilterCommon
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string OrderByColumn { get; set; }
        public string OrderDirection { get; set; } = "asc";
    }
}