/* =========================================================
   HB AI STUDIO - COMPLETE SCRIPT.JS
   Existing functions + AI Tools + Movie Search
   API-FREE VERSION
========================================================= */


/* =========================================================
   HELPER FUNCTIONS
========================================================= */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuBtn = $("#menuBtn");
const nav = $("#nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}


/* Close mobile menu after clicking a link */

$$("nav a").forEach((link) => {
  link.addEventListener("click", () => {
    if (nav) {
      nav.classList.remove("open");
    }
  });
});


/* =========================================================
   MOVIE FILTER
========================================================= */

const filters = $$(".filter");
const movieCards = $$(".movie-card");

filters.forEach((filter) => {

  filter.addEventListener("click", () => {

    filters.forEach((btn) => {
      btn.classList.remove("active");
    });

    filter.classList.add("active");

    const category = filter.dataset.filter;

    movieCards.forEach((card) => {

      const cardCategory =
        (card.dataset.category || "").toLowerCase();

      card.style.display =
        category === "all" ||
        cardCategory === category.toLowerCase()
          ? ""
          : "none";
    });

    updateNoResults();

  });

});


/* =========================================================
   MOVIE SEARCH
========================================================= */

const searchInput = $("#searchInput");

if (searchInput) {

  searchInput.addEventListener("input", (event) => {

    const query =
      event.target.value.toLowerCase().trim();

    movieCards.forEach((card) => {

      const title =
        (card.dataset.title || "").toLowerCase();

      const category =
        (card.dataset.category || "").toLowerCase();

      card.style.display =
        title.includes(query) ||
        category.includes(query)
          ? ""
          : "none";

    });

    updateNoResults();

  });

}


/* =========================================================
   NO RESULTS MESSAGE
========================================================= */

function updateNoResults() {

  const noResults = $("#noResults");

  if (!noResults) {
    return;
  }

  const visible = [...movieCards].some(
    (card) => card.style.display !== "none"
  );

  noResults.hidden = visible;
}


/* =========================================================
   MOVIE DESCRIPTIONS
========================================================= */

const movieDescriptions = {

  "Galaxy Quest":
    "A fictional science-fiction adventure about a journey beyond the stars.",

  "Future World":
    "A fictional futuristic adventure in a world of advanced technology.",

  "Beyond Stars":
    "A fictional emotional space drama about dreams and discovery.",

  "AI Planet":
    "A fictional story about the future of artificial intelligence."

};


/* =========================================================
   MOVIE DETAILS MODAL
========================================================= */

$$(".details-btn").forEach((button) => {

  button.addEventListener("click", () => {

    const movie = button.dataset.movie;

    const modalTitle = $("#modalTitle");
    const modalDescription = $("#modalDescription");
    const trailerLink = $("#trailerLink");
    const movieModal = $("#movieModal");

    if (modalTitle) {
      modalTitle.textContent = movie;
    }

    if (modalDescription) {
      modalDescription.textContent =
        movieDescriptions[movie] ||
        "Original sample movie entry.";
    }

    /*
      YouTube official trailer search
    */

    if (trailerLink) {

      trailerLink.href =
        "https://www.youtube.com/results?search_query=" +
        encodeURIComponent(
          movie + " official trailer"
        );

      trailerLink.target = "_blank";
      trailerLink.rel = "noopener noreferrer";

    }

    if (movieModal) {
      movieModal.hidden = false;
    }

  });

});


/* Close modal */

const closeModal = $("#closeModal");

if (closeModal) {

  closeModal.addEventListener("click", () => {

    const movieModal = $("#movieModal");

    if (movieModal) {
      movieModal.hidden = true;
    }

  });

}


/* Click outside modal */

const movieModal = $("#movieModal");

if (movieModal) {

  movieModal.addEventListener("click", (event) => {

    if (event.target === movieModal) {
      movieModal.hidden = true;
    }

  });

}


/* =========================================================
   MOVIE ACTIONS
========================================================= */


/* Clean movie name */

function cleanMovieName(name) {

  return String(name || "")
    .trim()
    .replace(/\s+/g, " ");

}


/* Watch Trailer */

function watchTrailer(movieName) {

  movieName = cleanMovieName(movieName);

  if (!movieName) {
    alert("Movie name not found.");
    return;
  }

  const url =
    "https://www.youtube.com/results?search_query=" +
    encodeURIComponent(
      movieName + " official trailer"
    );

  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );

}


/* Official streaming / download search */

function watchOfficial(movieName) {

  movieName = cleanMovieName(movieName);

  if (!movieName) {
    alert("Movie name not found.");
    return;
  }

  const url =
    "https://www.google.com/search?q=" +
    encodeURIComponent(
      movieName +
      " official streaming watch download"
    );

  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );

}


/* Movie details */

function movieDetails(movieName) {

  movieName = cleanMovieName(movieName);

  if (!movieName) {
    alert("Movie name not found.");
    return;
  }

  const url =
    "https://www.google.com/search?q=" +
    encodeURIComponent(
      movieName + " movie details"
    );

  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );

}


/* Search movie on Google */

function searchMovie(movieName) {

  movieName = cleanMovieName(movieName);

  if (!movieName) {
    alert("Enter a movie name.");
    return;
  }

  const url =
    "https://www.google.com/search?q=" +
    encodeURIComponent(
      movieName + " movie"
    );

  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );

}


/* =========================================================
   CREATE MOVIE BUTTONS
========================================================= */

function createMovieButtons(movieName) {

  const safeName =
    String(movieName)
      .replace(/\\/g, "\\\\")
      .replace(/'/g, "\\'");

  return `

    <div class="movie-actions">

      <button
        onclick="watchTrailer('${safeName}')">
        ▶ Watch Trailer ↗
      </button>

      <button
        onclick="watchOfficial('${safeName}')">
        ▶ Watch / Download Officially ↗
      </button>

      <button
        onclick="movieDetails('${safeName}')">
        ℹ Movie Details ↗
      </button>

    </div>

  `;

}


/* =========================================================
   AI TOOLS
========================================================= */

const toolNames = {

  script:
    "AI Script Maker",

  story:
    "AI Story Generator",

  title:
    "YouTube Title Maker",

  description:
    "YouTube Description Maker",

  prompt:
    "AI Image Prompt Generator",

  video:
    "AI Video Prompt Generator"

};


let currentTool = "script";


/* =========================================================
   AI TOOL PROMPTS
========================================================= */

const aiPrompts = {

  script: `
Create a complete professional YouTube video script based on this idea:

{IDEA}

Requirements:
- Create an attractive title
- Strong opening hook
- Clear introduction
- Well-structured main content
- Interesting examples
- Natural narration
- Strong ending
- Call to action
- Suitable for YouTube
`,

  story: `
Create a creative and engaging story based on this idea:

{IDEA}

Requirements:
- Interesting opening
- Main characters
- Story development
- Conflict or challenge
- Emotional or exciting moments
- Strong ending
- Suitable for video narration
`,

  title: `
Generate 15 attractive YouTube titles based on this idea:

{IDEA}

Requirements:
- SEO friendly
- High curiosity
- Easy to understand
- No misleading clickbait
- Mix of different title styles
`,

  description: `
Create a professional YouTube description based on this idea:

{IDEA}

Include:
- Strong introduction
- Video summary
- Important keywords naturally
- Viewer benefit
- Call to action
- Relevant hashtags
`,

  prompt: `
Create a detailed AI image-generation prompt based on this idea:

{IDEA}

Include:
- Main subject
- Characters
- Environment
- Lighting
- Camera angle
- Composition
- Mood
- Colors
- Realistic details
- Cinematic style
- No watermark
`,

  video: `
Create a detailed AI video-generation prompt based on this idea:

{IDEA}

Include:
- Scene description
- Character movement
- Camera movement
- Environment
- Lighting
- Cinematic style
- Visual effects
- Audio
- Character consistency
- 16:9 composition
`

};


/* =========================================================
   AI TOOL CARDS
========================================================= */

$$(".tool-card").forEach((card) => {

  card.addEventListener("click", () => {

    currentTool =
      card.dataset.tool || "script";

    const toolTitle = $("#toolTitle");
    const toolWorkspace = $("#toolWorkspace");
    const toolOutput = $("#toolOutput");

    if (toolTitle) {
      toolTitle.textContent =
        toolNames[currentTool] ||
        "HB AI Studio";
    }

    if (toolWorkspace) {
      toolWorkspace.hidden = false;

      toolWorkspace.scrollIntoView({
        behavior: "smooth"
      });
    }

    if (toolOutput) {
      toolOutput.textContent =
        "Enter your idea above and click Generate.";
    }

  });

});


/* =========================================================
   CLOSE AI WORKSPACE
========================================================= */

const closeTool = $("#closeTool");

if (closeTool) {

  closeTool.addEventListener("click", () => {

    const toolWorkspace =
      $("#toolWorkspace");

    if (toolWorkspace) {
      toolWorkspace.hidden = true;
    }

  });

}


/* =========================================================
   GENERATE AI CONTENT
========================================================= */

const generateBtn = $("#generateBtn");

if (generateBtn) {

  generateBtn.addEventListener("click", () => {

    const toolInput = $("#toolInput");
    const toolOutput = $("#toolOutput");

    if (!toolInput || !toolOutput) {
      return;
    }

    const idea =
      toolInput.value.trim();

    if (!idea) {

      toolOutput.textContent =
        "Please enter your idea first.";

      return;
    }


    /*
      API-free local generator
    */

    toolOutput.textContent =
      createContent(
        currentTool,
        idea
      );

  });

}


/* =========================================================
   LOCAL AI CONTENT GENERATOR
========================================================= */

function createContent(tool, idea) {

  switch (tool) {


    /* ================= SCRIPT ================= */

    case "script":

      return `TITLE:
${idea}

HOOK:
Imagine a world where ${idea.toLowerCase()}...

INTRODUCTION:
Welcome to HB AI Studio. Today we are exploring:
${idea}

SCENE 1:
Introduce the main subject and establish the situation.

SCENE 2:
Introduce the main challenge or problem.

SCENE 3:
Show the development of the story or idea.

SCENE 4:
Add an exciting, emotional, or surprising moment.

SCENE 5:
Show the result or important discovery.

ENDING:
Finish with a memorable conclusion and a strong hook.

CALL TO ACTION:
Like the video, subscribe to the channel, and follow HB AI Studio for more creative content.`;


    /* ================= STORY ================= */

    case "story":

      return `STORY TITLE:
${idea}

OPENING:
Something unexpected was about to change everything.

STORY:
The journey began with an ordinary moment connected to:
${idea}

MAIN CHARACTER:
Create a relatable character who discovers something unusual.

CONFLICT:
A difficult challenge appears and changes the direction of the story.

DEVELOPMENT:
The character searches for an answer and faces unexpected obstacles.

CLIMAX:
The biggest discovery or turning point changes everything.

ENDING:
The character finally understands the true meaning of the journey.

THE END... OR IS IT?`;


    /* ================= TITLES ================= */

    case "title":

      return `YOUTUBE TITLE IDEAS FOR:

${idea}

1. ${idea} – Everything You Need to Know

2. The Truth About ${idea}

3. ${idea} Explained in Simple Words

4. What Happens When ${idea}?

5. The Future of ${idea}

6. You Won't Believe What Happens Next

7. ${idea}: The Story Behind It

8. The Amazing World of ${idea}

9. Why Everyone Is Talking About ${idea}

10. ${idea} – A Journey Beyond Imagination

11. The Secret Behind ${idea}

12. ${idea} Changed Everything

13. What Nobody Tells You About ${idea}

14. The Complete Story of ${idea}

15. ${idea} – Explained in 10 Minutes`;


    /* ================= DESCRIPTION ================= */

    case "description":

      return `${idea}

Welcome to HB AI Studio!

In this video, we explore ${idea} in an engaging and easy-to-understand way.

Discover the story, important ideas, interesting details, and creative possibilities connected with this topic.

If you enjoy AI, technology, stories, entertainment, creativity, and learning, subscribe to HB AI Studio for more videos.

👍 Like
💬 Comment
🔔 Subscribe

#HBaiStudio
#AI
#Technology
#Story
#CreativeContent`;


    /* ================= IMAGE PROMPT ================= */

    case "prompt":

      return `AI IMAGE PROMPT:

Create a cinematic, highly detailed image showing:

${idea}

VISUAL STYLE:
Ultra-detailed cinematic realism.

SUBJECT:
Clearly show the main subject related to the idea.

ENVIRONMENT:
Create a visually rich and believable environment.

LIGHTING:
Professional cinematic lighting with realistic highlights and shadows.

CAMERA:
Professional camera composition with cinematic depth of field.

MOOD:
Atmospheric, dramatic, inspiring and visually engaging.

DETAIL:
High-quality textures, realistic materials, natural proportions and detailed background.

COMPOSITION:
Strong foreground, middle ground and background.

QUALITY:
High detail, professional digital artwork, cinematic photography style.

NEGATIVE:
No watermark, no logo, no text, no distorted faces, no extra fingers.

ASPECT RATIO:
16:9`;


    /* ================= VIDEO PROMPT ================= */

    case "video":

      return `AI VIDEO PROMPT:

Create a cinematic video based on:

${idea}

SCENE:
Create a realistic cinematic environment related to the idea.

ACTION:
Show the main character or subject performing the key action naturally.

CAMERA:
Use smooth professional camera movement.

MOVEMENT:
Natural character movement and realistic environmental motion.

LIGHTING:
Cinematic lighting with realistic shadows and highlights.

STYLE:
Realistic, cinematic, high-quality visual storytelling.

AUDIO:
Add suitable background music and realistic sound effects.

CHARACTER CONSISTENCY:
Keep the same character appearance throughout the scene.

CAMERA MOVEMENT:
Slow cinematic tracking shot with smooth movement.

QUALITY:
Professional film-quality visuals.

FORMAT:
16:9 landscape.

DURATION:
8–10 seconds.`;


    default:

      return "Select an AI tool.";

  }

}


/* =========================================================
   OPEN CHATGPT WITH PREPARED PROMPT
========================================================= */

function openChatGPT(tool, idea) {

  if (!idea) {

    alert(
      "Please enter your idea first."
    );

    return;

  }

  const promptTemplate =
    aiPrompts[tool];

  if (!promptTemplate) {

    alert(
      "AI tool not found."
    );

    return;

  }

  const prompt =
    promptTemplate.replace(
      "{IDEA}",
      idea
    );

  const chatGPTUrl =
    "https://chatgpt.com/?q=" +
    encodeURIComponent(prompt);

  window.open(
    chatGPTUrl,
    "_blank",
    "noopener,noreferrer"
  );

}


/* =========================================================
   MAKE BUTTON FUNCTIONS
========================================================= */

function makeScript() {

  const input = $("#toolInput");

  openChatGPT(
    "script",
    input ? input.value.trim() : ""
  );

}


function makeStory() {

  const input = $("#toolInput");

  openChatGPT(
    "story",
    input ? input.value.trim() : ""
  );

}


function makeYouTubeTitles() {

  const input = $("#toolInput");

  openChatGPT(
    "title",
    input ? input.value.trim() : ""
  );

}


function makeDescription() {

  const input = $("#toolInput");

  openChatGPT(
    "description",
    input ? input.value.trim() : ""
  );

}


function makeImagePrompt() {

  const input = $("#toolInput");

  openChatGPT(
    "prompt",
    input ? input.value.trim() : ""
  );

}


function makeVideoPrompt() {

  const input = $("#toolInput");

  openChatGPT(
    "video",
    input ? input.value.trim() : ""
  );

}


/* =========================================================
   COPY RESULT
========================================================= */

const copyOutput = $("#copyOutput");

if (copyOutput) {

  copyOutput.addEventListener(
    "click",
    async () => {

      const toolOutput =
        $("#toolOutput");

      if (!toolOutput) {
        return;
      }

      const text =
        toolOutput.textContent;

      try {

        await navigator.clipboard.writeText(
          text
        );

        copyOutput.textContent =
          "Copied!";

        setTimeout(() => {

          copyOutput.textContent =
            "Copy Result";

        }, 1500);

      } catch {

        copyOutput.textContent =
          "Select and copy the text";

      }

    }
  );

}


/* =========================================================
   FOOTER YEAR
========================================================= */

const year = $("#year");

if (year) {

  year.textContent =
    new Date().getFullYear();

}


/* =========================================================
   MOVIE SEARCH BOX - ENTER KEY
========================================================= */

const movieSearch =
  $("#movieSearch");

if (movieSearch) {

  movieSearch.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Enter") {

        event.preventDefault();

        searchMovie(
          movieSearch.value
        );

      }

    }
  );

}


/* =========================================================
   AI INPUT - CTRL + ENTER
========================================================= */

const toolInput =
  $("#toolInput");

if (toolInput) {

  toolInput.addEventListener(
    "keydown",
    (event) => {

      if (
        event.ctrlKey &&
        event.key === "Enter"
      ) {

        event.preventDefault();

        if (generateBtn) {
          generateBtn.click();
        }

      }

    }
  );

}


/* =========================================================
   PAGE READY
========================================================= */

console.log(
  "HB AI Studio JavaScript loaded successfully."
);
