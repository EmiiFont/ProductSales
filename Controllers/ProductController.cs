using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MakeupSales.Models;
using MakeupSales.Dao;
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
        public IEnumerable<Product> Sales()
        {
            var listOfProducts = _productRepo.GetAllProducts();
            return listOfProducts;
        }
    }
}