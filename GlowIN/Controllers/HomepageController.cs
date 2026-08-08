using System.Diagnostics;
using GlowIN.Models;
using Microsoft.AspNetCore.Mvc;

namespace GlowIN.Controllers
{
    public class HomepageController : Controller
    {
        private readonly ILogger<HomepageController> _logger;

        public HomepageController(ILogger<HomepageController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
