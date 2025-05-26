// Recipe collection with tags
const recipes = [
  {
    file: "spaghetti-carbonara.html",
    name: "Spaghetti Carbonara",
    tags: ["italian", "pasta", "quick", "comfort"],
  },
  {
    file: "chocolate-chip-cookies.html",
    name: "Chocolate Chip Cookies",
    tags: ["dessert", "sweet", "baking", "family"],
  },
  {
    file: "chicken-stir-fry.html",
    name: "Chicken Stir Fry",
    tags: ["asian", "healthy", "quick", "vegetables"],
  },
  {
    file: "banana-bread.html",
    name: "Banana Bread",
    tags: ["breakfast", "baking", "sweet", "comfort"],
  },
  {
    file: "beef-tacos.html",
    name: "Beef Tacos",
    tags: ["mexican", "spicy", "dinner", "family"],
  },
  // Add more recipes with their tags
];

let filteredRecipes = [...recipes];

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
  document.querySelector(`[data-tag="${activeTag}"]`).classList.add("active");
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
document.addEventListener("DOMContentLoaded", function () {
  updateRecipeCount();
});
