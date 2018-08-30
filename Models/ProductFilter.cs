using System.Collections.Generic;

namespace ProductSales.Models
{
    public class ProductFilter : FilterCommon
    {
        public string Companies { get; set; }
        public string ProductTypes { get; set; } 
        public string ProductCategories { get; set; }
    }

    public class FilterCommon
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string OrderByColumn { get; set; }
        public string OrderDirection { get; set; } = "asc";
    }
}