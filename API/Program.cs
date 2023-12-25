using API.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityService(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{

}
app.UseCors(builder=>builder.AllowAnyHeader().AllowAnyHeader().WithOrigins("http://localhost:4200"));
app.UseAuthentication();//do you have a valid token
app.UseAuthorization();//what you allow to do
app.MapControllers();

app.Run();
