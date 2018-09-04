using System;
using System.Collections.Generic;
using System.Linq;
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

            FilterDefinition<Product> filter = FilterDefinition<Product>.Empty;

            if(companyEqual.Count > 0){
              filter = Builders<Product>.Filter
              .Where(e => companyEqual.Contains(e.Company));
            }

            if(productTypeEqual.Count > 0){
              filter = filter & Builders<Product>.Filter.Where(e => productTypeEqual.Contains(e.ProductType));
            }

            if(productCategoryEqual.Count > 0)
            {
             FilterDefinition<Product> categoryFilter = null;
             
             foreach (var category in productCategoryEqual)
             {
                 if(categoryFilter == null)
                 {
                   categoryFilter = Builders<Product>.Filter.ElemMatch(r => r.Categories, b=> b.Name == category);
                 }
                 else
                 {
                   categoryFilter = categoryFilter | Builders<Product>.Filter.ElemMatch(r => r.Categories, b=> b.Name == category);
                 }
             }
              filter = filter & categoryFilter;
            }

            return productList.Find(filter).Skip(page * pageSize).Limit(pageSize).Sort(mongosortp).ToList();
        }
    }
}