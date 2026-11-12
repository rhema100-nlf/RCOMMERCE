using System.ComponentModel.DataAnnotations;

namespace HPlusSport.API.Models;

public class Workout
{
    public int Id { get; set; }

    [Required, StringLength(120)]
    public string Name { get; set; } = string.Empty;

    [Required, StringLength(80)]
    public string Goal { get; set; } = string.Empty;

    [Range(5, 300)]
    public int DurationMinutes { get; set; }

    [Required, StringLength(30)]
    public string Difficulty { get; set; } = string.Empty;

    public DateTime ScheduledFor { get; set; }

    public bool IsCompleted { get; set; }
}
