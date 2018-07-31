using System;
using System.Collections.Generic;
using MakeupSales.Models;
using MongoDB.Driver;
using ProductSales.Dao;
using ProductSales.Models;

namespace MakeupSales.Dao
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
    }
}