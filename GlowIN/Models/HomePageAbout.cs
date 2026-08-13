namespace GlowIN.Models
{
    public class HomePageAbout
    {
        public int Id { get; set; }

        public string Eyebrow { get; set; } = string.Empty;

        public string Title { get; set; } = string.Empty;

        public string HighlightText { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string ImageUrl { get; set; } = string.Empty;

        public string ButtonText { get; set; } = string.Empty;

        public string ButtonUrl { get; set; } = string.Empty;

        public bool IsActive { get; set; }

        public int DisplayOrder { get; set; }
    }
}