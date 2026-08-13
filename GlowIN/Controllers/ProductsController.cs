using GlowIN.Services;
using Microsoft.AspNetCore.Mvc;

namespace GlowIN.Controllers
{
    public class ProductsController : Controller
    {
        private readonly ProductService _productService;


        public ProductsController(
            ProductService productService)
        {
            _productService = productService;
        }


        // =====================================================
        // PRODUCT LIST
        // =====================================================

        public IActionResult Index()
        {
            var products =
                _productService.GetAllProducts();

            return View(products);
        }


        // =====================================================
        // PRODUCT DETAILS
        // =====================================================

        public IActionResult Details(int id)
        {
            var product =
                _productService.GetProductById(id);


            if (product == null)
            {
                return NotFound();
            }


            return View(product);
        }
    }
}