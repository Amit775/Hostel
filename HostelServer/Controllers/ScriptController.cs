using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace HostelServer.Controllers
{
	[Route("[controller]")]
	public class ScriptController : ControllerBase
	{
		[HttpGet]
		public FileResult Get(string name, bool includeMap)
		{
			string path = Path.Combine("scripts", name);

		}
	}
}
