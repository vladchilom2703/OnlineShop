using Magazin_Online.Models;
using Microsoft.AspNetCore.Mvc;

namespace Magazin_Online.Controllers
{
    [ApiController]
    [Route("products")]
    public class ProductController : ControllerBase
    {
        private static List<Product> products = new List<Product>
        {
            new Product { Id = 1, Name = "Dulap", Category = "Obiecte de casa", Description = "Dulap de dimensiune medie", Specifications = "Lemn de mahon", Price = 100 },
            new Product { Id = 2, Name = "Masă de bucatarie", Category = "Obiecte de casa", Description = "Masă robustă pentru bucatarie", Specifications = "Picioare din lemn de fag",  Price = 125 },
            new Product { Id = 3, Name = "Lampă de birou", Category = "Obiecte de casa", Description = "Lampă modernă pentru birou", Specifications = "Sursă de lumină: LED" , Price = 150 },
            new Product { Id = 4, Name = "Paleta de tenis", Category = "Articole sportive", Description = "Paleta de tenis (din plastic)", Specifications = "Dimensiune medie" ,  Price = 175},
            new Product { Id = 5, Name = "Gantera", Category = "Articole sportive", Description = "Gantera de 10kg", Specifications = "Discuri ajustabile",  Price = 200 }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetProducts()
        {
            return Ok(products);
        }
    }
}
