using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    [Route("api/[controller]")] // <---- info o ściezce dostepu do zapytań
    [ApiController] // <--- info dla systemy ze jest to kontroller api
    public class BaseController : ControllerBase
    {
        private IMediator _mediator;
        protected IMediator Mediator => _mediator ?? (_mediator =
        HttpContext.RequestServices.GetService<IMediator>());
    }
}