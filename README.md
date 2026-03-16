# W6-D3-Pagination-Mini-App

## Description

- This app displays characters from the Rick and Morty API with pagination.
- You can click through pages using the Prev and Next buttons.
- I used some Tailwind CSS for styling.

## Index.html

- results container for cards.
- status displays loading or error messages.
- prevBtn & nextBtn buttons for navigating pages.
- pageInfo shows current page number and total characters.

## Script.JS

- clearResults() clears existing cards.
- showLoading() displays loading message.
- showError(message) displays errors.
- renderCharacters(characters) creates cards for each character.
- updatePageInfo(total) updates page number and characters.
- fetchCharacters() async function to fetch and render characters.
- nextPage() & prevPage() handles pagination.
- main() loads the first page.

## How to Use

- Open in browser.
- First page of characters loads.
- Click **Prev** or **Next** to see other pages.
- A “Loading…” message appears while data is fetched.
- If there’s an error, a message will show.

### Features

- Type will only show if charcter has one.
- Responsive layout.
