using GlowIN.Services;
using Microsoft.AspNetCore.Mvc;

namespace GlowIN.Controllers
{
    public class CartController : Controller
    {
        private readonly ProductService _productService;


        public CartController(
            ProductService productService)
        {
            _productService = productService;
        }


        // =====================================================
        // CART PAGE
        // =====================================================

        public IActionResult Index()
        {
            return View();
        }


        // =====================================================
        // GET PRODUCT
        // Used by JavaScript / future cart logic
        // =====================================================

        [HttpGet]
        public IActionResult GetProduct(int id)
        {
            var product =
                _productService.GetProductById(id);


            if (product == null)
            {
                return NotFound();
            }


            return Json(new
            {
                id = product.Id,
                productName = product.ProductName,
                imageUrl = product.ImageUrl,
                size = product.Size,
                price = product.Price
            });
        }
    }
}