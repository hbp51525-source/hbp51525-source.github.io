
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Mobile navigation
$("#menuBtn").addEventListener("click", () => {
  $("#nav").classList.toggle("open");
});

// Close mobile menu after clicking a link
$$("nav a").forEach(link => {
  link.addEventListener("click", () => {
    $("#nav").classList.remove("open");
  });
});

// Movie filter
const filters = $$(".filter");
const movieCards = $$(".movie-card");

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(btn => btn.classList.remove("active"));
    filter.classList.add("active");

    const category = filter.dataset.filter;

    movieCards.forEach(card => {
      card.style.display =
        category === "all" || card.dataset.category === category
          ? ""
          : "none";
    });

    updateNoResults();
  });
});

// Search
$("#searchInput").addEventListener("input", (event) => {
  const query = event.target.value.toLowerCase().trim();

  movieCards.forEach(card => {
    const title = card.dataset.title.toLowerCase();
    const category = card.dataset.category.toLowerCase();

    card.style.display =
      title.includes(query) || category.includes(query)
        ? ""
        : "none";
  });

  updateNoResults();
});

function updateNoResults() {
  const visible = [...movieCards].some(card =>
    card.style.display !== "none"
  );

  $("#noResults").hidden = visible;
}

// Movie details
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

$$(".details-btn").forEach(button => {
  button.addEventListener("click", () => {
    const movie = button.dataset.movie;

    $("#modalTitle").textContent = movie;
    $("#modalDescription").textContent =
      movieDescriptions[movie] || "Original sample movie entry.";

    // Add your own official trailer URL here.
    $("#trailerLink").href = "#";

    $("#movieModal").hidden = false;
  });
});

$("#closeModal").addEventListener("click", () => {
  $("#movieModal").hidden = true;
});

$("#movieModal").addEventListener("click", (event) => {
  if (event.target === $("#movieModal")) {
    $("#movieModal").hidden = true;
  }
});

// AI tools
const toolNames = {
  script: "AI Script Maker",
  story: "AI Story Generator",
  title: "YouTube Title Maker",
  description: "YouTube Description Maker",
  prompt: "AI Image Prompt Generator",
  video: "AI Video Prompt Generator"
};

let currentTool = "script";

$$(".tool-card").forEach(card => {
  card.addEventListener("click", () => {
    currentTool = card.dataset.tool;
    $("#toolTitle").textContent = toolNames[currentTool];
    $("#toolWorkspace").hidden = false;
    $("#toolOutput").textContent =
      "Enter your idea above and click Generate.";
    $("#toolWorkspace").scrollIntoView({ behavior: "smooth" });
  });
});

$("#closeTool").addEventListener("click", () => {
  $("#toolWorkspace").hidden = true;
});

$("#generateBtn").addEventListener("click", () => {
  const idea = $("#toolInput").value.trim();

  if (!idea) {
    $("#toolOutput").textContent = "Please enter your idea first.";
    return;
  }

  $("#toolOutput").textContent = createContent(currentTool, idea);
});

function createContent(tool, idea) {
  switch (tool) {

    case "script":
      return `TITLE: ${idea}

SCENE 1:
Show the main character and introduce the story.

SCENE 2:
Create an exciting problem or adventure.

SCENE 3:
Show the character learning or discovering something new.

SCENE 4:
Add an emotional or surprising moment.

ENDING:
Finish with a strong hook for the next episode.

VOICEOVER:
Write a clear, engaging narration for a short video.`;

    case "story":
      return `STORY IDEA: ${idea}

Once upon a time, an unexpected adventure began.

The main character discovered something extraordinary.

A new challenge appeared, and the character had to find
courage, creativity, and a smart solution.

After an emotional journey, a surprising discovery
changed everything.

THE END... OR IS IT?`;

    case "title":
      return `YouTube Title Ideas:

1. ${idea} | Amazing Story
2. The Future Has Arrived 🚀
3. This Changed Everything!
4. A Journey Beyond Imagination
5. The Most Incredible Adventure`;

    case "description":
      return `${idea}

Welcome to HB AI Studio!

Watch this exciting original story and discover
a world of creativity, adventure, and imagination.

Subscribe for more AI stories, entertainment,
and creative videos.

#HBaiStudio #AIStory #ShortFilm #Adventure`;

    case "prompt":
      return `Create a cinematic, ultra-detailed image of:

${idea}

Style: Beautiful cinematic science fiction,
realistic lighting, rich details, professional
composition, high-quality digital art.

Format: Vertical 9:16
Mood: Inspiring and magical
No watermark, no distorted faces.`;

    case "video":
      return `Create a cinematic AI video:

STORY:
${idea}

Duration: 8 seconds
Format: 9:16 vertical
Style: Cinematic, realistic, high quality

CAMERA:
Smooth camera movement, professional framing.

LIGHTING:
Beautiful cinematic lighting.

ACTION:
Show the main character performing the key action.

AUDIO:
Add suitable background music and sound effects.

Keep character appearance consistent.`;

    default:
      return "Select an AI tool.";
  }
}

// Copy result
$("#copyOutput").addEventListener("click", async () => {
  const text = $("#toolOutput").textContent;

  try {
    await navigator.clipboard.writeText(text);
    $("#copyOutput").textContent = "Copied!";
    setTimeout(() => {
      $("#copyOutput").textContent = "Copy Result";
    }, 1500);
  } catch {
    $("#copyOutput").textContent = "Select and copy the text";
  }
});

// Footer year
$("#year").textContent = new Date().getFullYear();
