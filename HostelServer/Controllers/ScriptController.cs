using System;
using System.Collections.Generic;
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
		public string Get()
		{
			return "Hello world";
		}
	}
}
