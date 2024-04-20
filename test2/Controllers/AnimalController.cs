namespace Test2.Controllers{
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Test2.Models;


[Route("api/[controller]")]
[ApiController]
public class AnimalController  : Controller{
    private readonly AnimalContext _context;
private readonly UsersContext _contextUsers;

    public AnimalController(AnimalContext context,UsersContext contextUsers){_context = context; _contextUsers = contextUsers;
}

    [HttpGet]
// GER: api/Animal
public async Task<ActionResult<IEnumerable<Animal>>> GetAnimal()
{
   return await _context.Animal.Include(e=>e.Users).ToListAsync();
}
[HttpPost]
// POST: api/Animal
public async Task<ActionResult<Animal>> PostAnimal(Animal animal)
{
    _context.Animal.Add(animal);
    await _context.SaveChangesAsync();

    return CreatedAtAction("GetAnimal", new { id = animal.IdAnimal }, animal);
}
[HttpPut("{id}")]
// PUT: api/Animal/5
public async Task<IActionResult> PutAnimal(int id, Animal animal)
{
    _context.Entry(animal).State = EntityState.Modified;

    try
    {
        await _context.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
        if (!AnimalExists(id))
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
// DELETE: api/Animal/5
public async Task<IActionResult> DeleteAnimal(int id)
{
    var animal = await _context.Animal.FindAsync(id);
    if (animal == null)
    {
        return NotFound();
    }

    _context.Animal.Remove(animal);
    await _context.SaveChangesAsync();

    return NoContent();
}
private bool AnimalExists(int id)
{
    return (_context.Animal?.Any(e => e.IdAnimal == id)).GetValueOrDefault();
}

}
}
