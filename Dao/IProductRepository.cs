using System.Collections.Generic;
using MakeupSales.Models;

namespace MakeupSales.Dao
{
    public interface IProductRepository
    {
         IEnumerable<Product> GetAllProducts(string orderByColumn = "Price", string orderDirection = "asc");
    }
}