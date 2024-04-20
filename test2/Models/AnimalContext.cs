using Microsoft.EntityFrameworkCore;
namespace Test2.Models
{
    public class AnimalContext : DbContext
    {
        public AnimalContext (DbContextOptions<AnimalContext> options)
            : base(options)
        {
        }

        public DbSet<Animal> Animal { get; set; }
        public DbSet<Users> Users { get; set; }
    }
}
