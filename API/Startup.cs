using Application.Products;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Persistence;
using Microsoft.AspNetCore.Identity;
using Application.Interfaces;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.AspNetCore.Authorization;
using System.Text;

// Jest to plik konfiguracji - tworzony przy komendzie "dotnet new webapi -n API"

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(opt => // "=>" wyrazenie lambda chodzi o to ze chcemy ustawic ze baza danych korzysta z :
            {
                opt.UseSqlite(Configuration.GetConnectionString("DefaultConnection")); // korzysta z Sqlite i łączy się do niego przez connection stringa którego pobiera za pomoca GetConnectionString("DefaultConnection") // default connection jest w appsettings.json w API 
            }); //mówimy programowi ze bedziemy uzywac serwisu DBcontext, który bedzie typu DataContext
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000").AllowCredentials();
                });
            });
            services.AddControllers();
            services.AddMediatR(typeof(List.Handler).Assembly); // skorzystaj z serwisu MediatR
            var builder = services.AddIdentityCore<AppUser>();
            var identityBuilder = new IdentityBuilder(builder.UserType, builder.Services);
            identityBuilder.AddEntityFrameworkStores<DataContext>();
            identityBuilder.AddSignInManager<SignInManager<AppUser>>();
            // services.AddAuthorization(opt =>
            // {
            //     opt.AddPolicy("IsActivityHost", policy =>
            //     {
            //         policy.Requirements.Add(new IsHostRequirement());
            //     });
            // });

            //services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["TokenKey"]));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme);

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateAudience = false,
                        ValidateIssuer = false
                    };
                });
            services.AddScoped<IJwtGenerator, JwtGenerator>();

            services.AddAuthentication();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //wyłączamy https
            //app.UseHttpsRedirection();
            
            // ta linijka mowi o tym ze nasza aplikacja uzywa routing
            app.UseRouting();
            app.UseCors("CorsPolicy");
            
            // ta linijka mowi o tym ze nasza aplikacja uzywa autoryzacji   
            app.UseAuthentication();    
            app.UseAuthorization();

            //ta to coś mowi o endpointach
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
