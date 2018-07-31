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

        public IEnumerable<Product> GetAllProducts(string orderByColumn = "Price",
         string orderDirection = "asc")
        {
            var productList = _mongoDatabase.GetCollection<Product>("Products");

            return productList.AsQueryable().ToList();
        }
    }
}