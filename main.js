// Recipe collection - will be loaded from CSV
let recipes = [];
let filteredRecipes = [];

// Load recipes from CSV file
async function loadRecipes() {
  try {
    const response = await fetch("recipe_data.csv");
    const csvText = await response.text();

    // Parse CSV using Papa Parse
    const results = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
    });

    // Transform the data to match our format
    recipes = results.data.map((row) => ({
      file: row.file,
      name: row.name,
      tags: row.tags.split(",").map((tag) => tag.trim()),
    }));

    filteredRecipes = [...recipes];
    updateRecipeCount();
    console.log("Recipes loaded:", recipes.length);
  } catch (error) {
    console.error("Error loading recipes:", error);
    alert("Failed to load recipe data");
  }
}

function getRandomRecipe() {
  if (filteredRecipes.length === 0) {
    alert("No recipes match the selected filters!");
    return;
  }
  const randomIndex = Math.floor(Math.random() * filteredRecipes.length);
  const selectedRecipe = filteredRecipes[randomIndex];
  window.location.href = selectedRecipe.file;
}

function filterByTag(tag) {
  if (tag === "all") {
    filteredRecipes = [...recipes];
    updateActiveFilter("all");
  } else {
    filteredRecipes = recipes.filter((recipe) => recipe.tags.includes(tag));
    updateActiveFilter(tag);
  }
  updateRecipeCount();
}

function updateActiveFilter(activeTag) {
  document.querySelectorAll(".tag-filter").forEach((btn) => {
    btn.classList.remove("active");
  });
  const activeButton = document.querySelector(`[data-tag="${activeTag}"]`);
  if (activeButton) {
    activeButton.classList.add("active");
  }
}

function updateRecipeCount() {
  const count = filteredRecipes.length;
  const countElement = document.getElementById("recipe-count");
  if (countElement) {
    countElement.textContent = `${count} recipe${
      count !== 1 ? "s" : ""
    } available`;
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", async function () {
  await loadRecipes();
});
