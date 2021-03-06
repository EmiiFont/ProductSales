using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProductSales.Models;
using ProductSales.Dao;
using Microsoft.Extensions.Logging;

namespace MakeupSales.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
          IProductRepository _productRepo;
          ILogger<ProductController> _logger;
        public ProductController(IProductRepository productRepository, ILogger<ProductController> logger)
        {
            _productRepo = productRepository;
            _logger = logger;
        }

        [HttpGet("[action]")]
        public IEnumerable<Product> Sales(ProductFilter filterParams)
        {
            var ProductCategories =  filterParams.ProductCategories != null ? filterParams.ProductCategories.Split(',').ToList() : new List<string>();
            var ProductTypes =  filterParams.ProductTypes != null ? filterParams.ProductTypes.Split(',').ToList() : new List<string>();
            var Companies =  filterParams.Companies != null ? filterParams.Companies.Split(',').ToList() : new List<string>();

            var listOfProducts = _productRepo.GetAllProducts(Companies, 
            ProductTypes, ProductCategories, filterParams.Page, 
            filterParams.PageSize, filterParams.OrderByColumn, filterParams.OrderDirection);
            
            return listOfProducts;
        }
    }
}