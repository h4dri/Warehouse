using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.User
{
    public class Login
    {
        public class Query : IRequest<AppUser>
        {
            public string UserName { get; set; }
            public string Password { get; set; }
        }
        public class Handler : IRequestHandler<Query, AppUser>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly SignInManager<AppUser> _signInManager;
            public Handler(DataContext context, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
            {
                _signInManager = signInManager;
                _userManager = userManager;
                _context = context;
            }

            public async Task<AppUser> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByNameAsync(request.UserName);

                if (user == null)
                {
                    throw new Exception("You are unautorized");
                }

                var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

                if (result.Succeeded)
                {
                    return user;
                }

                throw new Exception("You can not log in");
            }
        }
    }
}