using System.Collections.Generic;

namespace GlowIN.Models
{
    public class HomepageViewModel
    {
        public HomePageBanner Banner { get; set; }

        public HomePageAbout About { get; set; }

        public List<Product> FeaturedProducts { get; set; }
            = new List<Product>();
    }
}