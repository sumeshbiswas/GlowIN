namespace GlowIN.Models
{
    public class Product
    {
        public int Id { get; set; }

        public string ProductName { get; set; } = string.Empty;

        public string Category { get; set; } = string.Empty;

        public string ShortDescription { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string ImageUrl { get; set; } = string.Empty;

        public string? SecondaryImageUrl { get; set; }

        public decimal Price { get; set; }

        public decimal? OldPrice { get; set; }

        public string Size { get; set; } = string.Empty;

        public string SkinType { get; set; } = string.Empty;

        public string Ingredients { get; set; } = string.Empty;

        public string Benefits { get; set; } = string.Empty;

        public double Rating { get; set; }

        public int ReviewCount { get; set; }

        public string? Badge { get; set; }

        public bool IsActive { get; set; }

        public bool IsFeatured { get; set; }

        public int DisplayOrder { get; set; }
    }
}