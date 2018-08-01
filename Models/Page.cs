using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ProductSales.Models
{
	 [BsonIgnoreExtraElements]
    public class Page
	{
        public ObjectId Id { get; set; }
        public int Interval { get; set; } = 60;
		public string Url { get; set; }
		public string[] SalesUrls { get; set; }
		public string IncludeSelector { get; set; }
		public string TopSelector { get; set; }
		public string ProductNameSelector { get; set; }
		public string ProductSubtitleSelector { get; set; }
		public string ProductPriceSelector { get; set; }
		public string ProductImageSelector { get; set; }
		public string ProductUrlLocation { get; set; }
		public string ExcludeSelector { get; set; }

	}
}