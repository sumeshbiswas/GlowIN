namespace GlowIN.Models
{
    public class HomePageBenefit
    {
        public int Id { get; set; }

        public string Icon { get; set; } = string.Empty;

        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public int DisplayOrder { get; set; }

        public bool IsActive { get; set; }
    }
}