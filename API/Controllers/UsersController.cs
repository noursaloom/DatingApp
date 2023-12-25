using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]

    public class UsersController : BaseApiController
    {
        private readonly DataContext _context;

        public UsersController(DataContext context)
        {
            _context = context;
        }
        [AllowAnonymous]
        [HttpGet]
        //Task:asynchronuc operation can return a value
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            var user = await _context.Users.ToListAsync();

            return user;
        }
        [HttpGet("{id}")] //Alt +shift +f
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            return await _context.Users.FindAsync(id);
        }
    }
}