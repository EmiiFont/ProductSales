using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProductSales.Models;
using ProductSales.Dao;
using Microsoft.Extensions.Logging;

namespace ProductSales.Controllers
{
    [Route("api/[controller]")]
    public class PagesController : Controller
    {
        ILogger<PagesController> _logger;
        public PagesController(  ILogger<PagesController> logger)
        {
            _logger = logger;
        }

        [HttpGet("[action]")]
        public List<Page> Get()
        {

            return new List<Page>();
        }
    }
}