using API.Data;
using API.Interfaces;
using API.Sercices;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            services.AddCors();
            //availability of the service:
            //builder.Services.AddTransient: created and disposed within the api finished
            //builder.Services.AddSingleton: never dispose until the application has closed down, sutable for caching service
            //builder.Services.AddScoped:
            /*Transient objects are always different; a new instance is provided to every controller and every service.

            Scoped objects are the same within a request, but different across different requests.

            Singleton objects are the same for every object and every request.*/
            services.AddScoped<ITokenService, TokenService>();

            return services;
        }
    }
}