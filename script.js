"use strict";

//Variables
const results = document.getElementById("results");
const statusMsg = document.getElementById("status");
const pageInfo = document.getElementById("pageInfo");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

//Current Page
let currentPage = 1;

//Loading
function showLoading() {
  statusMsg.textContent = "Loading...";
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
