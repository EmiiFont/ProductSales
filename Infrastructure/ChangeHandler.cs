using MakeupSales.Hubs;
using ProductSales.Models;
using Microsoft.AspNetCore.SignalR;
using MongoDB.Bson;
using MongoDB.Driver;

namespace MakeupSales.Infrastructure
{
    public class ChangeHandler : IChangeHandler
    {
        private IHubContext<ProductHub> _productHub;
        public ChangeHandler(IHubContext<ProductHub> productHub)
        {
            _productHub = productHub;
        }

        public void HandleUpdates()
        {
            // var mongoClient = new MongoClient("mongodb://localhost:27017");

            // var collection = mongoClient.GetDatabase("").GetCollection<Product>("");

            // //Get the whole document instead of just the changed portion
            // ChangeStreamOptions options = new ChangeStreamOptions() { FullDocument = ChangeStreamFullDocumentOption.UpdateLookup };

            // //The operationType can be one of the following: insert, update, replace, delete, invalidate
            // var pipeline = new EmptyPipelineDefinition<ChangeStreamDocument<BsonDocument>>().Match("{ operationType: { $in: [ 'replace', 'insert', 'update' ] } }");

            // var changeStream = collection.Watch(options).ToEnumerable().GetEnumerator();

            //  while (changeStream.MoveNext())
            //     {
            //         var cha = changeStream.Current;
            //         if(cha.OperationType == ChangeStreamOperationType.Insert)
            //         {
            //           _productHub.Clients.All.SendAsync("sendNewProductToAll", cha.FullDocument);
            //         }
            //         else if(cha.OperationType == ChangeStreamOperationType.Replace)
            //         {
            //          _productHub.Clients.All.SendAsync("sendChangedProductToAll", cha.FullDocument, cha.FullDocument);
            //         }
            //     }
        }
    }
}