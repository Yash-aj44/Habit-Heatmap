const heatmap = document.getElementById("heatmap");

// Load saved data or start empty
let habitData = JSON.parse(localStorage.getItem("habitData")) || {};

// Create tooltip
const tooltip = document.createElement("div");
tooltip.className = "tooltip";
tooltip.style.display = "none";
document.body.appendChild(tooltip);

// Function to update color based on activity
function updateColor(day, activity) {
  day.classList.remove("level-1", "level-2", "level-3", "level-4");

  if (activity >= 1 && activity <= 2) {
    day.classList.add("level-1");
  } else if (activity >= 3 && activity <= 4) {
    day.classList.add("level-2");
  } else if (activity >= 5 && activity <= 6) {
    day.classList.add("level-3");
  } else if (activity >= 7) {
    day.classList.add("level-4");
  }
}

// Generate 365 days
for (let i = 0; i < 365; i++) {

  const day = document.createElement("div");
  day.classList.add("day");

  // Create real date going backwards
  const today = new Date();
  const date = new Date();
  date.setDate(today.getDate() - i);

  const dateKey = date.toISOString().split("T")[0];

  let activity = habitData[dateKey] || 0;

  // Set initial color
  updateColor(day, activity);

  // Click to increase activity
  day.addEventListener("click", () => {
    activity++;
    habitData[dateKey] = activity;
    localStorage.setItem("habitData", JSON.stringify(habitData));
    updateColor(day, activity);
  });

  // Tooltip events
  day.addEventListener("mouseenter", () => {
    tooltip.style.display = "block";
    tooltip.textContent = `${dateKey} - ${activity} activities`;
  });

  day.addEventListener("mousemove", (e) => {
    tooltip.style.left = e.pageX + 10 + "px";
    tooltip.style.top = e.pageY + 10 + "px";
  });

  day.addEventListener("mouseleave", () => {
    tooltip.style.display = "none";
  });

  heatmap.appendChild(day);
}