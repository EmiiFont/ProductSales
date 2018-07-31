
using ProductSales.Models;
using Microsoft.AspNetCore.SignalR;

namespace MakeupSales.Hubs
{
    public class ProductHub : Hub
    {
        public ProductHub()
        {
            
        }
        internal static void Init()
        {
        }

        public void sendNewProductToAll(Product product)
        {
            Clients.All.SendAsync("sendNewProductToAll", product);
        }

        public void sendChangedProductToAll(Product product)
        {
            Clients.All.SendAsync("sendChangedProductToAll", product);
        }

    }
}