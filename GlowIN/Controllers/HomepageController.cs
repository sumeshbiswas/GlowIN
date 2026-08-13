using GlowIN.Models;
using GlowIN.Services;
using Microsoft.AspNetCore.Mvc;

namespace GlowIN.Controllers
{
    public class HomepageController : Controller
    {
        private readonly ProductService _productService;

        public HomepageController(ProductService productService)
        {
            _productService = productService;
        }


        public IActionResult Index()
        {
            // ==========================================
            // BANNER
            // ==========================================

            var banner = new HomePageBanner
            {
                Id = 1,

                Badge = "BOTANICAL SKINCARE",

                Title = "Nature, Refined for",

                HighlightText = "Your Natural Glow",

                Description =
                    "Pure botanical skincare thoughtfully crafted for healthy, radiant skin.",

                ButtonText = "Explore Collection",

                ButtonUrl = "#products",

                ImageUrl = "/Images/home/banner1.png",

                IsActive = true,

                DisplayOrder = 1
            };


            // ==========================================
            // ABOUT
            // ==========================================

            var about = new HomePageAbout
            {
                Id = 1,

                Eyebrow = "OUR STORY",

                Title = "Beauty begins",

                HighlightText = "with nature.",

                Description =
                    "GlowIN was created around a simple belief — skincare should work in harmony with nature. We bring together carefully selected botanical ingredients and thoughtful formulations to create a gentle, conscious skincare ritual.",

                ImageUrl = "/Images/home/about-glowin.jpg",

                ButtonText = "Discover Our Story",

                ButtonUrl = "#about-story",

                IsActive = true,

                DisplayOrder = 1
            };


            // ==========================================
            // FEATURED PRODUCTS
            // ==========================================

            var products =
                _productService.GetFeaturedProducts();


            // ==========================================
            // HOMEPAGE VIEW MODEL
            // ==========================================

            var model = new HomepageViewModel
            {
                Banner = banner,

                About = about,

                FeaturedProducts = products
            };


            // ==========================================
            // RETURN HOMEPAGE
            // ==========================================

            return View(model);
        }


        public IActionResult Privacy()
        {
            return View();
        }
    }
}