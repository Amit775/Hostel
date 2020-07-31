using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HostelServer
{
	[Route("[controller]")]
	[ApiController]
	public class UploadController : ControllerBase
	{
		[HttpPost]
		public async void PostScript([FromBody] IFormFile file)
		{
			string filename = file.FileName;

			using FileStream output = System.IO.File.Create($"scripts/{filename}");
			await file.CopyToAsync(output);
		}

		[HttpPost]
		public async void PostIcon([FromBody] IFormFile icon)
		{
			string iconName = icon.FileName;

			using FileStream output = System.IO.File.Create($"icons");
			await icon.CopyToAsync(output);

		}
	}
}
