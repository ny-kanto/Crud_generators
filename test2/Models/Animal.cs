namespace Test2.Models{
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("animal")]

public class Animal {
    [Key]
[Column("id_animal")]
public int IdAnimal{ get; set; }


[Column("label")]
public string? Label{ get; set; }


[Column("race")]
public string? Race{ get; set; }


[Column("type")]
public string? Type{ get; set; }


[ForeignKey("id_props")]
[Column("id_props")]
public Users Users{ get; set; }



    
}
}
