using Microsoft.AspNetCore.Mvc;

namespace Finance.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportsController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetReports()
        {
            // Zakładamy, że pliki PDF znajdują się w folderze "Reports" 
            // w katalogu głównym Finance.API (tam, gdzie Program.cs).
            var reportsDir = Path.Combine(Directory.GetCurrentDirectory(), "Reports");
            if (!Directory.Exists(reportsDir))
            {
                return Ok(Array.Empty<object>());
            }

            var pdfFiles = Directory.GetFiles(reportsDir, "*.pdf");

            // generujemy listę (Id, Title, PdfUrl)
            var reports = pdfFiles.Select((filePath, index) =>
            {
                var fileName = Path.GetFileName(filePath);
                var fileUrl = $"{Request.Scheme}://{Request.Host}/Reports/{fileName}";
                return new
                {
                    Id = index + 1,
                    Title = fileName,
                    PdfUrl = fileUrl
                };
            }).ToList();

            return Ok(reports);
        }
    }
}
