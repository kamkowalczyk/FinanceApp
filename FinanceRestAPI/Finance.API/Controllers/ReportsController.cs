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
            var reportsDir = Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory()).FullName, "SharedReports");
            if (!Directory.Exists(reportsDir))
            {
                return Ok(Array.Empty<object>());
            }

            var pdfFiles = Directory.GetFiles(reportsDir, "*.pdf");

            var reports = pdfFiles.Select((filePath, index) =>
            {
                var fileName = Path.GetFileName(filePath);
                var fileUrl = $"{Request.Scheme}://{Request.Host}/SharedReports/{fileName}";
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