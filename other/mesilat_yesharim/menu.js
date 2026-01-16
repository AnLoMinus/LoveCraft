// Create and insert the menu into the page
function createMenu() {
  const menuHTML = `
    <div class="mesilat-nav">
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav w-100">
                        <div class="list-group w-100">
                            <a href="#" class="list-group-item list-group-item-action" data-chapter="introduction">הקדמת הרב המחבר</a>
                            <a href="#" class="list-group-item list-group-item-action" data-chapter="purpose_in_life">פרק א' - חובת האדם בעולמו</a>
                            <a href="#" class="list-group-item list-group-item-action" data-chapter="watchfulness">פרק ב' - מדת הזהירות</a>
                            <a href="#" class="list-group-item list-group-item-action">פרק ג' - חלקי הזהירות</a>
                            <a href="#" class="list-group-item list-group-item-action">פרק ד' - דרך קנית הזהירות</a>
                            <a href="#" class="list-group-item list-group-item-action">פרק ה' - מפסידי הזהירות</a>
                            <a href="#" class="list-group-item list-group-item-action" data-chapter="diligence">פרק ו' - מדת הזריזות</a>
                            <a href="#" class="list-group-item list-group-item-action">פרק ז' - חלקי הזריזות</a>
                            <a href="#" class="list-group-item list-group-item-action">פרק ח' - דרך קנית הזריזות</a>
                            <a href="#" class="list-group-item list-group-item-action">פרק ט' - מפסידי הזריזות</a>
                            <a href="#" class="list-group-item list-group-item-action" data-chapter="cleanliness">פרק י' - מדת הנקיות</a>
                            <a href="#" class="list-group-item list-group-item-action">פרק יא' - פרטי מדת הנקיות</a>
                            <a href="#" class="list-group-item list-group-item-action">פרק יב' - דרכי קנית הנקיות</a>
                            <a href="#" class="list-group-item list-group-item-action" data-chapter="separation">פרק יג' - מדת הפרישות</a>
                            <a href="#" class="list-group-item list-group-item-action">פרק יד' - חלקי הפרישות</a>
                            <a href="#" class="list-group-item list-group-item-action">פרק טו' - דרכי קנית הפרישות</a>
                            <a href="#" class="list-group-item list-group-item-action">פרק טז' - מדת הטהרה</a>
                            <a href="#" class="list-group-item list-group-item-action">פרק יז' - דרכי קנית הטהרה</a>
                            <a href="#" class="list-group-item list-group-item-action" data-chapter="piety">פרק יח' - מדת החסידות</a>
                            <a href="#" class="list-group-item list-group-item-action">פרק יט' - חלקי החסידות</a>
                            <a href="#" class="list-group-item list-group-item-action">פרק כ' - משקל החסידות</a>
                            <a href="#" class="list-group-item list-group-item-action">פרק כא' - דרכי קנית החסידות</a>
                            <a href="#" class="list-group-item list-group-item-action" data-chapter="humility">פרק כב' - מדת הענוה</a>
                            <a href="#" class="list-group-item list-group-item-action">פרק כג' - דרכי קנית הענוה</a>
                            <a href="#" class="list-group-item list-group-item-action">פרק כד' - יראת החטא</a>
                            <a href="#" class="list-group-item list-group-item-action">פרק כה' - דרך קנית היראה</a>
                            <a href="#" class="list-group-item list-group-item-action" data-chapter="holiness">פרק כו' - מידת הקדושה</a>
                            <a href="#" class="list-group-item list-group-item-action">חתימה</a>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    </div>`;

  document.body.insertAdjacentHTML("afterbegin", menuHTML);

  // Add event listeners to menu items
  document
    .querySelectorAll(".list-group-item[data-chapter]")
    .forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const chapter = e.target.dataset.chapter;
        if (chapter) {
          displayChapterQuotes(chapter);
        }
      });
    });
}

// Function to display quotes from a specific chapter
function displayChapterQuotes(chapter) {
  const quotes = mesilatQuotes[chapter];
  if (!quotes) return;

  const quotesContainer = document.createElement("div");
  quotesContainer.className = "quotes-container";

  quotes.forEach((quote) => {
    const quoteElement = document.createElement("div");
    quoteElement.className = "quote-item";
    quoteElement.innerHTML = `
            <h4>${quote.chapter}</h4>
            <p class="quote-text">${quote.quote}</p>
            <p class="quote-relevance">${quote.relevance}</p>
        `;
    quotesContainer.appendChild(quoteElement);
  });

  // Find or create a container for the quotes
  let container = document.querySelector(".quotes-display");
  if (!container) {
    container = document.createElement("div");
    container.className = "quotes-display";
    document.querySelector(".stages-container").appendChild(container);
  }

  container.innerHTML = "";
  container.appendChild(quotesContainer);
}

// Initialize when the document is loaded
document.addEventListener("DOMContentLoaded", createMenu);
