using GlowIN.Models;

namespace GlowIN.Services
{
    public class ProductService
    {
        private readonly List<Product> _products;

        public ProductService()
        {
            _products = new List<Product>
            {
                new Product
                {
                    Id = 1,

                    ProductName = "Botanical Glow Serum",

                    Category = "Face Care",

                    ShortDescription =
                        "A lightweight botanical serum for naturally radiant skin.",

                    Description =
                        "A thoughtfully crafted botanical serum designed to hydrate, nourish and enhance your skin's natural glow.",

                    ImageUrl =
                        "/Images/Products/product1.jpg",

                    SecondaryImageUrl =
                        "/Images/products/botanical-glow-serum-2.jpg",

                    Price = 899,

                    OldPrice = 1099,

                    Size = "30 ml",

                    SkinType = "All Skin Types",

                    Ingredients =
                        "A botanical blend of aloe vera, rose extract and plant-based oils.",

                    Benefits =
                        "Hydrates skin, supports natural radiance and leaves the skin feeling soft and refreshed.",

                    Rating = 4.9,

                    ReviewCount = 128,

                    Badge = "BESTSELLER",

                    IsActive = true,

                    IsFeatured = true,

                    DisplayOrder = 1
                },


                new Product
                {
                    Id = 2,

                    ProductName = "Herbal Radiance Cream",

                    Category = "Face Care",

                    ShortDescription =
                        "A nourishing herbal cream for soft and luminous skin.",

                    Description =
                        "A rich yet lightweight botanical cream created to nourish the skin and support a healthy-looking glow.",

                    ImageUrl =
                        "/Images/products/product2.jpg",

                    SecondaryImageUrl =
                        "/Images/products/herbal-radiance-cream-2.jpg",

                    Price = 749,

                    OldPrice = 899,

                    Size = "50 g",

                    SkinType = "Normal to Dry",

                    Ingredients =
                        "Shea butter, botanical extracts and naturally derived nourishing oils.",

                    Benefits =
                        "Helps nourish dry skin while leaving it soft, smooth and comfortable.",

                    Rating = 4.8,

                    ReviewCount = 96,

                    Badge = "POPULAR",

                    IsActive = true,

                    IsFeatured = true,

                    DisplayOrder = 2
                },


                new Product
                {
                    Id = 3,

                    ProductName = "Pure Botanical Cleanser",

                    Category = "Cleansing",

                    ShortDescription =
                        "A gentle botanical cleanser for a fresh and balanced feel.",

                    Description =
                        "A gentle everyday cleanser that removes impurities while maintaining the skin's natural comfort.",

                    ImageUrl =
                        "/Images/products/product3.jpg",

                    SecondaryImageUrl =
                        "/Images/products/botanical-cleanser-2.jpg",

                    Price = 599,

                    OldPrice = 699,

                    Size = "100 ml",

                    SkinType = "All Skin Types",

                    Ingredients =
                        "Botanical extracts, aloe vera and gentle plant-derived cleansing ingredients.",

                    Benefits =
                        "Gently cleanses the skin without leaving it feeling stripped.",

                    Rating = 4.7,

                    ReviewCount = 74,

                    Badge = "NEW",

                    IsActive = true,

                    IsFeatured = true,

                    DisplayOrder = 3
                },


                new Product
                {
                    Id = 4,

                    ProductName = "Sage Hydration Mist",

                    Category = "Hydration",

                    ShortDescription =
                        "A refreshing botanical mist for instant hydration.",

                    Description =
                        "A refreshing face mist designed to provide a light burst of botanical hydration throughout the day.",

                    ImageUrl =
                        "/Images/products/product4.jpg",

                    SecondaryImageUrl =
                        "/Images/products/product4(a).jpg",

                    Price = 499,

                    OldPrice = 599,

                    Size = "80 ml",

                    SkinType = "All Skin Types",

                    Ingredients =
                        "Sage, rose water and botanical hydrating extracts.",

                    Benefits =
                        "Refreshes and lightly hydrates the skin whenever it needs a boost.",

                    Rating = 4.6,

                    ReviewCount = 51,

                    Badge = null,

                    IsActive = true,

                    IsFeatured = true,

                    DisplayOrder = 4
                }
            };
        }


        // =====================================================
        // GET ALL PRODUCTS
        // =====================================================

        public List<Product> GetAllProducts()
        {
            return _products
                .Where(x => x.IsActive)
                .OrderBy(x => x.DisplayOrder)
                .ToList();
        }


        // =====================================================
        // GET FEATURED PRODUCTS
        // =====================================================

        public List<Product> GetFeaturedProducts()
        {
            return _products
                .Where(x =>
                    x.IsActive &&
                    x.IsFeatured)
                .OrderBy(x => x.DisplayOrder)
                .ToList();
        }


        // =====================================================
        // GET PRODUCT BY ID
        // =====================================================

        public Product? GetProductById(int id)
        {
            return _products
                .FirstOrDefault(x =>
                    x.Id == id &&
                    x.IsActive);
        }


        // =====================================================
        // GET PRODUCTS BY CATEGORY
        // =====================================================

        public List<Product> GetProductsByCategory(
            string category)
        {
            return _products
                .Where(x =>
                    x.IsActive &&
                    x.Category.Equals(
                        category,
                        StringComparison.OrdinalIgnoreCase))
                .OrderBy(x => x.DisplayOrder)
                .ToList();
        }
    }
}