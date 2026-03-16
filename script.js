"use strict";

//Variables
const results = document.getElementById("results");
const statusMsg = document.getElementById("status");
const pageInfo = document.getElementById("pageInfo");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

//Current Page
let currentPage = 1;

// Clear page
function clearResults() {
  while (results.firstChild) {
    results.removeChild(results.firstChild);
  }
}

//Loading
function showLoading() {
  statusMsg.textContent = "Loading...";
}

//Error message
function showError(message) {
  statusMsg.textContent = message;
}

// Render characters
function renderCharacters(characters) {
  clearResults();

  for (let i = 0; i < characters.length && i <9; i++) {
    const char = characters[i];

// Container 
    const card = document.createElement("div");
    card.className = "bg-[#D19C1D] p-4 rounded shadow";

// Image
    const img = document.createElement("img");
    img.src = char.image;
    img.alt = char.name;
    img.className = "w-full rounded-lg border border-[#472C1B] mb-2";

// Text 
    const textContainer = document.createElement("div");
    textContainer.className = "space-y-1";

    const name = document.createElement("p");
    name.textContent = "Name: " + char.name;

    const status = document.createElement("p");
    status.textContent = "Status: " + char.status;

    const species = document.createElement("p");
    species.textContent = "Species: " + char.species;

     const gender = document.createElement("p");
     gender.textContent = "Gender: " + char.gender;

       const type = document.createElement("p");
       type.textContent = "Type: " + char.type;

// Adding text to container
    textContainer.appendChild(name);
    textContainer.appendChild(status);
    textContainer.appendChild(species);
    textContainer.appendChild(gender);
    textContainer.appendChild(type);

    // Adding image and text to card
    card.appendChild(img);
    card.appendChild(textContainer);

    // Adding card to results
    results.appendChild(card);
  }
}

//Updated page info
function updatePageInfo(total) {
  pageInfo.textContent = `Page ${currentPage} | Total Characters: ${total}`;
}

// Fetch from API
async function fetchCharacters() {
  showLoading();

  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${currentPage}`,
    );

    if (response.status === 429 || response.status === 403) {
      throw new Error("Oops, too many requests!");
    }

    if (!response.ok) {
      throw new Error("Failed to load!");
    }

    const data = await response.json();

    renderCharacters(data.results);
    updatePageInfo(data.info.count);

    statusMsg.textContent = "";

// Disable Prev on first page
  prevBtn.disabled = currentPage === 1;
  prevBtn.classList.toggle("bg-[#90FFDC]", currentPage === 1);

// Disable Next on last page
  nextBtn.disabled = currentPage === data.info.pages;
  nextBtn.classList.toggle("bg-[#90FFDC]", currentPage === data.info.pages);

  } catch (error) {
    showError(error.message);
  }
}

// Pagination
function nextPage() {
  if (!nextBtn.disabled) {
    currentPage++;
    fetchCharacters();
  }
}

function prevPage() {
  if (!prevBtn.disabled) {
    currentPage--;
    fetchCharacters();
  }
}

//Load page 1 on start
function main() {
  nextBtn.addEventListener("click", nextPage);
  prevBtn.addEventListener("click", prevPage);

  fetchCharacters();
}

main();
