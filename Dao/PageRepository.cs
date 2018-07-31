using System.Collections.Generic;
using ProductSales.Models;
using MongoDB.Driver;

namespace ProductSales.Dao
{
    public class PageRepository : IPageRepository
    {
        public static IMongoDatabase _mongoDatabase;

        public PageRepository(string connectionString, string dbName) 
        {
             var client = new MongoClient(connectionString);

            _mongoDatabase = client.GetDatabase(dbName);
        }

        public IEnumerable<Page> GetAllPages()
        {
            var pagesList = _mongoDatabase.GetCollection<Page>("Pages");
            return pagesList.AsQueryable().ToList();
        }

        public void AddPage(Page newPage)
        {
            var items = _mongoDatabase.GetCollection<Page>("Pages");

            var result = items.InsertOneAsync(newPage);
        }
    }
}