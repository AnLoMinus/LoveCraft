const mesilatQuotes = {
  introduction: [
    {
      chapter: "הקדמה",
      source: "מסילת ישרים",
      quote:
        "כי השלמות האמיתי הוא רק הדביקות בו יתברך, וזה מתחיל בעבודת המידות בין אדם לחברו.",
      relevance: "יסוד הזוגיות הוא תיקון המידות כהכנה לדביקות בה'",
    },
  ],

  purpose_in_life: [
    {
      chapter: "פרק א' - בביאור כלל חובת האדם בעולמו",
      source: "מסילת ישרים",
      quote: "שהאדם לא נברא אלא להתענג על ה' ולהנות מזיו שכינתו",
      relevance: "הזוגיות היא כלי להגיע לתכלית של דביקות בה'",
    },
    {
      chapter: "פרק א'",
      source: "מסילת ישרים",
      quote: "כל עניני העולם הזה... אינם אלא נסיונות לאדם",
      relevance: "חיי הנישואין הם מערכת של נסיונות לזיכוך המידות",
    },
  ],

  watchfulness: [
    {
      chapter: "פרק ב' - בביאור מדת הזהירות",
      source: "מסילת ישרים",
      quote: "הזהירות הוא שיהיה האדם נזהר במעשיו ובעניניו",
      relevance: "חשיבות הזהירות בדיבור ובמעשים בחיי הנישואין",
    },
    {
      chapter: "פרק ג' - בביאור חלקי הזהירות",
      source: "מסילת ישרים",
      quote: "שיתבונן האדם על מעשיו וכל עניניו... אם טובים הם אם לא",
      relevance: "חשיבות החשבון נפש בחיי הזוגיות",
    },
  ],

  diligence: [
    {
      chapter: "פרק ו' - בביאור מדת הזריזות",
      source: "מסילת ישרים",
      quote: "הזריזות היא התגברות האדם להתחזק בעבודתו יתברך",
      relevance: "הזריזות בקיום צרכי בן/בת הזוג",
    },
  ],

  cleanliness: [
    {
      chapter: "פרק י' - בביאור מדת הנקיות",
      source: "מסילת ישרים",
      quote: "הנקיות היא תיקון המעשים והמחשבות",
      relevance: "טהרת המחשבה והמעשים בחיי הנישואין",
    },
  ],

  separation: [
    {
      chapter: "פרק יג' - בביאור מדת הפרישות",
      source: "מסילת ישרים",
      quote: "הפרישות במותרות מביא לידי קדושה",
      relevance: "איזון נכון בין צרכים גשמיים ורוחניים בבית",
    },
  ],

  piety: [
    {
      chapter: "פרק יח' - בביאור מדת החסידות",
      source: "מסילת ישרים",
      quote: "החסיד הוא העושה לפנים משורת הדין",
      relevance: "חשיבות הוויתור והנתינה מעבר למחויב בזוגיות",
    },
  ],

  humility: [
    {
      chapter: "פרק כב' - בביאור מדת הענוה",
      source: "מסילת ישרים",
      quote: "הענוה היא שורש כל המידות הטובות",
      relevance: "הענווה כיסוד לשלום בית",
    },
  ],

  holiness: [
    {
      chapter: "פרק כו' - בביאור מידת הקדושה",
      source: "מסילת ישרים",
      quote: "הקדושה היא שיהיה האדם דבק כל כך באלהיו",
      relevance: "הקדושה כתכלית חיי הנישואין",
    },
  ],
};

// פונקציות עזר
const mesilatUtils = {
  // מחזיר ציטוט אקראי מפרק מסוים
  getRandomQuoteFromChapter: (chapter) => {
    const quotes = mesilatQuotes[chapter];
    return quotes[Math.floor(Math.random() * quotes.length)];
  },

  // מחזיר את כל הציטוטים הקשורים למילת מפתח
  searchQuotes: (keyword) => {
    const results = [];
    Object.values(mesilatQuotes).forEach((chapter) => {
      chapter.forEach((quote) => {
        if (
          quote.quote.includes(keyword) ||
          quote.relevance.includes(keyword)
        ) {
          results.push(quote);
        }
      });
    });
    return results;
  },

  // מחזיר ציטוט יומי עם הקשר לזוגיות
  getDailyMesilatQuote: () => {
    const chapters = Object.keys(mesilatQuotes);
    const randomChapter = chapters[Math.floor(Math.random() * chapters.length)];
    return mesilatUtils.getRandomQuoteFromChapter(randomChapter);
  },

  // מחזיר את כל הציטוטים לפי סדר הפרקים
  getAllQuotesOrdered: () => {
    return Object.entries(mesilatQuotes).map(([key, quotes]) => {
      return {
        section: key,
        quotes: quotes,
      };
    });
  },
};

window.mesilatQuotes = mesilatQuotes;
window.mesilatUtils = mesilatUtils;

document.addEventListener("DOMContentLoaded", function () {
  const categoryBtns = document.querySelectorAll(".category-btn");
  const quoteItems = document.querySelectorAll(".quote-item");

  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const category = this.dataset.category;

      // Update active button
      categoryBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      // Filter quotes
      quoteItems.forEach((item) => {
        if (category === "all" || item.dataset.categories.includes(category)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
});
