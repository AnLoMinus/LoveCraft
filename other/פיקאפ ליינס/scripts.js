document.addEventListener("DOMContentLoaded", function () {
  // Initialize variables
  let currentCategory = null;
  let currentLines = [];
  let currentIndex = 0;

  // Sidebar toggle
  const sidebar = document.getElementById("sidebar");
  const content = document.getElementById("content");
  const sidebarCollapse = document.getElementById("sidebarCollapse");
  const sidebarToggleBtn = document.getElementById("sidebarToggleBtn");

  // Add statistics elements
  const totalLinesElement = document.getElementById("totalLines");
  const totalCategoriesElement = document.getElementById("totalCategories");
  const currentCategoryLinesElement = document.getElementById(
    "currentCategoryLines"
  );

  // Add this with other element selections at the top
  const currentCategoryTitle = document.getElementById("currentCategoryTitle");

  // Add these with other element selections at the top
  const prevCategoryBtn = document.getElementById("prevCategory");
  const nextCategoryBtn = document.getElementById("nextCategory");

  // Function to handle sidebar state
  function toggleSidebar(show) {
    if (show) {
      sidebar.classList.remove("active");
      content.classList.remove("active");
      sidebarToggleBtn.classList.remove("show");
    } else {
      sidebar.classList.add("active");
      content.classList.add("active");
      sidebarToggleBtn.classList.add("show");
    }
  }

  // Handle sidebar toggle button
  sidebarCollapse.addEventListener("click", () => {
    toggleSidebar(false);
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      toggleSidebar(true); // Show sidebar on desktop
    } else {
      toggleSidebar(false); // Hide sidebar on mobile
    }
  });

  // Initial state
  if (window.innerWidth > 768) {
    toggleSidebar(true); // Show sidebar on desktop
  }

  // Update statistics function
  async function updateStatistics() {
    const quotes = await loadQuotes();

    // Calculate total lines
    const totalLines = Object.values(quotes).reduce(
      (sum, category) => sum + category.length,
      0
    );
    totalLinesElement.textContent = totalLines;

    // Calculate total categories
    const totalCategories = Object.keys(quotes).length;
    totalCategoriesElement.textContent = totalCategories;

    // Update current category lines
    if (currentCategory && quotes[currentCategory]) {
      currentCategoryLinesElement.textContent = quotes[currentCategory].length;
    } else {
      currentCategoryLinesElement.textContent = "0";
    }
  }

  // Load quotes from JSON
  async function loadQuotes() {
    try {
      const response = await fetch("quotes.json");
      const quotes = await response.json();
      updateStatistics();
      return quotes;
    } catch (error) {
      console.error("Error loading quotes:", error);
      return {};
    }
  }

  // Handle mobile menu clicks
  document.querySelectorAll(".mobile-menu a").forEach((link) => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();
      const category = e.target.dataset.category;
      const quotes = await loadQuotes();

      if (quotes[category]) {
        currentCategory = category;
        currentLines = quotes[category];
        currentIndex = 0;
        shuffleArray(currentLines);
        displayCurrentLine();
        updateStatistics();
        updateCategoryTitle(category);
      }

      // Close mobile dropdown
      const bsCollapse = new bootstrap.Collapse(
        document.getElementById("mobileSidebar")
      );
      bsCollapse.hide();
    });
  });

  // Handle next line button
  document.getElementById("nextLine").addEventListener("click", () => {
    if (currentLines.length > 0) {
      currentIndex = (currentIndex + 1) % currentLines.length;
      displayCurrentLine();
    }
  });

  // Display current line
  function displayCurrentLine() {
    const lineElement = document.getElementById("currentLine");
    if (currentLines.length > 0) {
      lineElement.textContent = currentLines[currentIndex];
    } else {
      lineElement.textContent = "בחר קטגוריה מהתפריט כדי להתחיל...";
    }
  }

  // Shuffle array function
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Add event listener for the toggle button
  sidebarToggleBtn.addEventListener("click", () => {
    toggleSidebar(true);
  });

  // Handle desktop category selection
  document.querySelectorAll("#sidebar a").forEach((link) => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();
      const category = e.target.dataset.category;
      const quotes = await loadQuotes();

      if (quotes[category]) {
        currentCategory = category;
        currentLines = quotes[category];
        currentIndex = 0;
        shuffleArray(currentLines);
        displayCurrentLine();
        updateStatistics();
        updateCategoryTitle(category);
      }
    });
  });

  // Initial statistics update
  updateStatistics();

  // Add this function to update category title
  function updateCategoryTitle(category) {
    const categoryEmojis = {
      compliments: "🎯",
      creative: "🎨",
      smart: "🤔",
      light: "🥳",
      funny: "💬",
      romantic: "🌟",
      musical: "🎶",
      intelligent: "🧠",
      spontaneous: "✨",
      "light-funny": "😄",
      "romantic-deep": "❤️",
      tech: "🖥️",
      dramatic: "🎭",
      "light-compliments": "🔥",
      "creative-funny": "🎯",
      "romantic-classic": "❤️",
      "intelligent-lines": "🧠",
      philosophical: "🤔",
    };

    if (category) {
      const emoji = categoryEmojis[category] || "📁";
      const categoryText =
        document.querySelector(`a[data-category="${category}"]`)?.textContent ||
        category;
      currentCategoryTitle.innerHTML = `<i class="bi bi-folder"></i> <span>${categoryText}</span>`;
    } else {
      currentCategoryTitle.innerHTML =
        '<i class="bi bi-folder"></i> <span>בחר קטגוריה</span>';
    }

    // Update navigation buttons state
    const hasCategory = Boolean(category);
    prevCategoryBtn.disabled = !hasCategory;
    nextCategoryBtn.disabled = !hasCategory;
  }

  // Add initial category title update
  updateCategoryTitle(null);

  // Add this function to get all categories in order
  function getAllCategories() {
    return Array.from(document.querySelectorAll("#sidebar a")).map(
      (a) => a.dataset.category
    );
  }

  // Add these functions for category navigation
  function navigateCategory(direction) {
    const categories = getAllCategories();
    const currentIndex = categories.indexOf(currentCategory);

    let newIndex;
    if (direction === "next") {
      newIndex = currentIndex === categories.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex === 0 ? categories.length - 1 : currentIndex - 1;
    }

    const newCategory = categories[newIndex];
    const categoryLink = document.querySelector(
      `a[data-category="${newCategory}"]`
    );

    if (categoryLink) {
      categoryLink.click();
    }
  }

  // Add event listeners for navigation buttons
  prevCategoryBtn.addEventListener("click", () => navigateCategory("prev"));
  nextCategoryBtn.addEventListener("click", () => navigateCategory("next"));
});
