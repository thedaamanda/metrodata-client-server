using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers;

[Authorize(Roles = "User")]
public class UniversityController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}
