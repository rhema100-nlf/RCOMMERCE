const API_BASE_URL = "http://localhost:5271/api/workouts";

const workoutForm = document.querySelector("#workout-form");
const workoutsContainer = document.querySelector("#products");
const statusMessage = document.querySelector("#status");
const refreshButton = document.querySelector("#refresh-button");
const totalStat = document.querySelector("#total-stat");
const completedStat = document.querySelector("#completed-stat");
const minutesStat = document.querySelector("#minutes-stat");

function setStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.dataset.error = String(isError);
}

async function request(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const details = await response.text();
    throw new Error(details || `Request failed (${response.status})`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

function createWorkoutCard(workout) {
  const card = document.createElement("article");
  card.className = "product-card";

  const image = document.createElement("img");
  image.className = "product-image";
  image.src = getWorkoutImage(workout);
  image.alt = `${workout.name} workout illustration`;
  image.loading = "lazy";

  const name = document.createElement("h3");
  name.textContent = workout.name;

  const goal = document.createElement("p");
  goal.className = "product-description";
  goal.textContent = workout.goal;

  const details = document.createElement("p");
  details.className = "product-meta";
  details.textContent = `${workout.durationMinutes} minutes · ${workout.difficulty}`;

  const date = document.createElement("p");
  date.className = "product-meta";
  date.textContent = `Scheduled: ${new Date(workout.scheduledFor).toLocaleString()}`;

  const completion = document.createElement("label");
  completion.className = "availability";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = workout.isCompleted;
  checkbox.addEventListener("change", () => updateCompletion(workout, checkbox.checked));
  completion.append(checkbox, " Completed");

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => deleteWorkout(workout.id));

  card.append(image, name, goal, details, date, completion, deleteButton);
  return card;
}

function getWorkoutImage(workout) {
  const searchText = `${workout.name} ${workout.goal}`.toLowerCase();
  if (searchText.includes("run") || searchText.includes("endurance") || searchText.includes("cardio")) {
    return "images/running.svg";
  }
  if (searchText.includes("mobility") || searchText.includes("flex") || searchText.includes("stretch")) {
    return "images/mobility.svg";
  }
  if (searchText.includes("strength") || searchText.includes("muscle")) {
    return "images/strength.svg";
  }
  return "images/workout.svg";
}

function updateStats(workouts) {
  totalStat.textContent = workouts.length;
  completedStat.textContent = workouts.filter(workout => workout.isCompleted).length;
  minutesStat.textContent = workouts.reduce((total, workout) => total + workout.durationMinutes, 0);
}

async function loadWorkouts() {
  setStatus("Loading workouts...");
  workoutsContainer.replaceChildren();

  try {
    const workouts = await request(API_BASE_URL);
    updateStats(workouts);
    for (const workout of workouts) {
      workoutsContainer.append(createWorkoutCard(workout));
    }

    setStatus(
      workouts.length === 0
        ? "No workout goals yet. Add one above."
        : `${workouts.length} workout goal(s) loaded.`
    );
  } catch (error) {
    setStatus(`Could not load workouts: ${error.message}`, true);
  }
}

async function addWorkout(event) {
  event.preventDefault();
  const formData = new FormData(workoutForm);
  const workout = {
    name: formData.get("name").trim(),
    goal: formData.get("goal").trim(),
    durationMinutes: Number(formData.get("durationMinutes")),
    difficulty: formData.get("difficulty"),
    scheduledFor: new Date(formData.get("scheduledFor")).toISOString(),
    isCompleted: formData.has("isCompleted")
  };

  try {
    await request(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workout)
    });
    workoutForm.reset();
    setStatus("Workout goal added.");
    await loadWorkouts();
  } catch (error) {
    setStatus(`Could not add workout: ${error.message}`, true);
  }
}

async function updateCompletion(workout, isCompleted) {
  try {
    await request(`${API_BASE_URL}/${workout.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...workout, isCompleted })
    });
    setStatus(isCompleted ? "Workout marked complete." : "Workout marked incomplete.");
  } catch (error) {
    setStatus(`Could not update workout: ${error.message}`, true);
    await loadWorkouts();
  }
}

async function deleteWorkout(id) {
  try {
    await request(`${API_BASE_URL}/${id}`, { method: "DELETE" });
    setStatus("Workout goal deleted.");
    await loadWorkouts();
  } catch (error) {
    setStatus(`Could not delete workout: ${error.message}`, true);
  }
}

workoutForm.addEventListener("submit", addWorkout);
refreshButton.addEventListener("click", loadWorkouts);
loadWorkouts();
