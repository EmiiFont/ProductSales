using System;
using System.Collections.Generic;
using MongoDB.Driver;
using ProductSales.Dao;
using ProductSales.Models;

namespace MakeupSales.Dao
{
    public class ProductRepository : IProductRepository
    {
        public static IMongoDatabase _mongoDatabase;

        public ProductRepository(string connectionString, string dbName) 
        {
             var client = new MongoClient(connectionString);
             

            _mongoDatabase = client.GetDatabase(dbName);
        }

        public IEnumerable<Product> GetAllProducts(List<string> companyEqual, List<string> productTypeEqual,
        List<string> productCategoryEqual, int page = 1, int pageSize = 10,
         string orderByColumn = "Price", string orderDirection = "asc")
        {
            var productList = _mongoDatabase.GetCollection<Product>("Products");
            var sortValue = orderDirection == "asc" ? 1 : -1;
            var mongosortp = "{" + orderByColumn + ":" + sortValue + "}";
            
            return productList.Find(FilterDefinition<Product>.Empty).Skip(page * pageSize).Limit(pageSize).Sort(mongosortp).ToList();
        }
    }
}