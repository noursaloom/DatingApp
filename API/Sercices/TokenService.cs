using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Sercices
{
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _Key;//encript and decript the data, stay on the server
        public TokenService(IConfiguration configuration)
        {
            _Key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["TokenKey"]));
        }
        public string CreateToken(AppUser user)
        {
            var claims = new List<Claim>{
            new  Claim(JwtRegisteredClaimNames.NameId,user.UserName)
           };
            var creds = new SigningCredentials(_Key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescripter = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescripter);
            return tokenHandler.WriteToken(token);
        }
    }
}