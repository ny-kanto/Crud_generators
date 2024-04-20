namespace Test2.Controllers{
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Test2.Models;


[Route("api/[controller]")]
[ApiController]
public class UsersController  : Controller{
    private readonly UsersContext _context;

    public UsersController(UsersContext context){_context = context; }

    [HttpGet]
// GER: api/Users
public async Task<ActionResult<IEnumerable<Users>>> GetUsers()
{
   return await _context.Users.ToListAsync();
}
[HttpPost]
// POST: api/Users
public async Task<ActionResult<Users>> PostUsers(Users users)
{
    _context.Users.Add(users);
    await _context.SaveChangesAsync();

    return CreatedAtAction("GetUsers", new { id = users.IdUsers }, users);
}
[HttpPut("{id}")]
// PUT: api/Users/5
public async Task<IActionResult> PutUsers(int id, Users users)
{
    _context.Entry(users).State = EntityState.Modified;

    try
    {
        await _context.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
        if (!UsersExists(id))
        {
            return NotFound();
        }
        else
        {
            throw;
        }
    }

    return NoContent();
}
[HttpDelete("{id}")]
// DELETE: api/Users/5
public async Task<IActionResult> DeleteUsers(int id)
{
    var users = await _context.Users.FindAsync(id);
    if (users == null)
    {
        return NotFound();
    }

    _context.Users.Remove(users);
    await _context.SaveChangesAsync();

    return NoContent();
}
private bool UsersExists(int id)
{
    return (_context.Users?.Any(e => e.IdUsers == id)).GetValueOrDefault();
}

}
}
