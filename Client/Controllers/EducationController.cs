using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers;

public class EducationController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}
