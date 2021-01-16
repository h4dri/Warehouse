using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Persistence;

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
            services.AddControllers();
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
            
            // ta linijka mowi o tym ze nasza aplikacja uzywa autoryzacji       
            app.UseAuthorization();

            //ta to coś mowi o endpointach
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
