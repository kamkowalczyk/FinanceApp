using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace Finance.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportsController : ControllerBase
    {
        private readonly string _reportsDir;

        public ReportsController()
        {
            _reportsDir = Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory()).FullName, "SharedReports");
        }

        [HttpGet]
        public IActionResult GetReports()
        {
            if (!Directory.Exists(_reportsDir))
            {
                return Ok(Array.Empty<object>());
            }

            var pdfFiles = Directory.GetFiles(_reportsDir, "*.pdf");

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

        [HttpPost("generate")]
        public IActionResult GenerateReport()
        {
            return Ok();
        }

        [HttpDelete("{id:int}")]
        public IActionResult DeleteReport(int id)
        {
            if (!Directory.Exists(_reportsDir))
            {
                return NotFound("Reports directory not found.");
            }

            var pdfFiles = Directory.GetFiles(_reportsDir, "*.pdf");
            if (id <= 0 || id > pdfFiles.Length)
            {
                return NotFound("Report not found.");
            }

            var fileToDelete = pdfFiles[id - 1];
            System.IO.File.Delete(fileToDelete);

            return NoContent();
        }
    }
}
