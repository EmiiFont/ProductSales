using System.Collections.Generic;
using ProductSales.Models;

namespace ProductSales.Dao
{
    public interface IProductRepository
    {
         IEnumerable<Product> GetAllProducts(string orderByColumn = "Price", string orderDirection = "asc");
    }
}