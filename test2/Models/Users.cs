namespace Test2.Models{
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("users")]

public class Users {
    [Key]
[Column("id_users")]
public int IdUsers{ get; set; }


[Column("label")]
public string? Label{ get; set; }


[Column("prenom")]
public string? Prenom{ get; set; }



    
}
}
