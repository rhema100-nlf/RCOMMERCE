using HPlusSport.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HPlusSport.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WorkoutsController : ControllerBase
{
    private readonly ShopContext _context;

    public WorkoutsController(ShopContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Workout>>> GetWorkouts()
    {
        return await _context.Workouts
            .OrderBy(workout => workout.ScheduledFor)
            .ToListAsync();
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Workout>> GetWorkout(int id)
    {
        var workout = await _context.Workouts.FindAsync(id);

        return workout is null ? NotFound() : workout;
    }

    [HttpPost]
    public async Task<ActionResult<Workout>> CreateWorkout(Workout workout)
    {
        _context.Workouts.Add(workout);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetWorkout), new { id = workout.Id }, workout);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateWorkout(int id, Workout workout)
    {
        if (id != workout.Id)
        {
            return BadRequest();
        }

        _context.Entry(workout).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteWorkout(int id)
    {
        var workout = await _context.Workouts.FindAsync(id);

        if (workout is null)
        {
            return NotFound();
        }

        _context.Workouts.Remove(workout);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
