using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ProductSales.Models
{
    [BsonIgnoreExtraElements]
    public class Product 
    {
        public ObjectId Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public IEnumerable<string> ImageSrc { get; set; }
        public DateTime UpdateDate { get; set; }
        public TypeOfChange ChangeType { get; set; }
        public string Company { get; set; }
        public string UrlLocation { get; set; }
        public string ProductType { get; set; }
        public List<Category> Categories { get; set; } 
    }

    public class Category
    {
        public string Name { get; set; }
    }

     public enum TypeOfChange
    {
        None = 0,
        PriceDown = 1,
        PriceUp = 2,
        NewProduct = 3
    }
}