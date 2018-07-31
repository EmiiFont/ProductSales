using System.Collections.Generic;
using ProductSales.Models;

namespace ProductSales.Dao
{
    public interface IPageRepository
    {
        IEnumerable<Page> GetAllPages();
        void AddPage(Page newPage);
    }
}