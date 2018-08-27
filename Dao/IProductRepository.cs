using System.Collections.Generic;
using ProductSales.Models;

namespace ProductSales.Dao
{
    public interface IProductRepository
    {
         IEnumerable<Product> GetAllProducts(List<string> companyEqual, List<string> productTypeEqual,
        List<string> productCategoryEqual, int page = 1, int pageSize = 10, string orderByColumn = "Price", string orderDirection = "asc");
    }
}