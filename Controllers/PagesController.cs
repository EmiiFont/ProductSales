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
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class PagesController : ControllerBase
    {
        ILogger<PagesController> _logger;
        IPageRepository _pageRepository;
        public PagesController(ILogger<PagesController> logger, IPageRepository pageRepository)
        {
            _logger = logger;
            _pageRepository = pageRepository;
        }

        [HttpGet("[action]")]
        public IEnumerable<Page> Get()
        {
            var pages = _pageRepository.GetAllPages();

            return pages;
        }

        [HttpPost]
        [ProducesResponseType(400)]
        public Page CreateAsync(Page newPage)
        {
            _pageRepository.AddPage(newPage);

            return newPage;
        }
    }
}