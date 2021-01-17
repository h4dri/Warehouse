using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
    public class Register
    {
        public class Command : IRequest<User>
                {
                    public string DisplayName { get; set; }
                    public string UserName { get; set; }
                    public string Email { get; set; }
                    public bool isAdmin { get; set; }
                    public string Password { get; set; }
                }
        
                public class Handler : IRequestHandler<Command, User>
                {
                    private readonly DataContext _context;
                    private readonly UserManager<AppUser> _userManager;
                    private readonly IJwtGenerator _jwtGenerator;
                    public Handler(DataContext context, UserManager<AppUser> userManager,
                    IJwtGenerator jwtGenerator)
                    {
                        _jwtGenerator = jwtGenerator;
                        _userManager = userManager;
                        _context = context;
                    }
        
                    public async Task<User> Handle(Command request, CancellationToken cancellationToken)
                    {
                      //logic command handler
        
                        if (await _context.Users.AnyAsync(x => x.Email == request.Email))
                            throw new Exception("Email already exists");

                        if (await _context.Users.AnyAsync(x => x.UserName == request.UserName))
                            throw new Exception("Username already exists");

                        var user = new AppUser
                        {
                            DisplayName = request.DisplayName,
                            Email = request.Email,
                            UserName = request.UserName,
                            isAdmin = request.isAdmin
                        };

                        
                        var result = await _userManager.CreateAsync(user, request.Password);

                        if (result.Succeeded)
                        {
                            return new User
                            {
                                DisplayName = user.DisplayName,
                                Token = _jwtGenerator.CreateToken(user),
                                UserName = user.UserName,
                                IsAdmin = user.isAdmin
                            };
                        } 

                        throw new Exception("Problem creating userr");
        
                    }
                }
    }
}