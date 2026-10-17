/* ARRAY of OBJECTS*/

const restaurants = [
  {
    id: 1,
    name: "Pepper's Jerk Centre",
    categories: ["Jerk"],
    area: "Half Way Tree",
    price: 2,
    rating: 4.9,
    openNow: true,
    description: "Kingston favourite for smoky jerk chicken, jerk pork and festival. Lunch rush daily 12-3pm.",
    image: "images/jerk.svg",
    imageAlt: "Jerk chicken plate with rice and peas"
  },
  {
    id: 2,
    name: "Harbour View Fish Hut",
    categories: ["Seafood"],
    area: "Harbour View",
    price: 3,
    rating: 4.4,
    openNow: false,
    description: "Fresh fried fish with bammy and escovitch, plus steamed fish on weekends.",
    image: "images/seafood.svg",
    imageAlt: "Fried fish with bammy and festival"
  },
  {
    id: 3,
    name: "Tasty Treat Delights",
    categories: ["Bakery"],
    area: "New Kingston",
    price: 1,
    rating: 4.2,
    openNow: true,
    description: "Fresh patties, coco bread and spiced bun baked every morning. Cakes and pastries for special occasions.",
    image: "images/bakery.svg",
    imageAlt: "Jamaican beef patties and coco bread"
  },
  {
    id: 4,
    name: "Papine Breakfast Yard",
    categories: ["Breakfast", "Soups"],
    area: "Papine",
    price: 2,
    rating: 4.5,
    openNow: true,
    description: "Early morning spot for ackee and saltfish, liver and banana, plus manish water and red peas soup on Saturdays.",
    image: "images/breakfast.svg",
    imageAlt: "Ackee and saltfish breakfast plate"
  },
  {
    id: 5,
    name: "Downtown Soup House",
    categories: ["Soups", "Jerk"],
    area: "Downtown Kingston",
    price: 2,
    rating: 4.0,
    openNow: false,
    description: "Coronation Market style soups - fish tea, mannish water and chicken foot soup. Jerk chicken on Fridays.",
    image: "images/soup.svg",
    imageAlt: "Steaming bowl of Jamaican red peas soup"
  },
  {
    id: 6,
    name: "Constant Spring Grill Spot",
    categories: ["Jerk", "Grill"],
    area: "Constant Spring",
    price: 2,
    rating: 4.3,
    openNow: true,
    description: "Mix grill platters - grilled lobster, jerk wings and steak. Good for after-work lime.",
    image: "images/grill.svg",
    imageAlt: "Mixed grill platter with lobster and jerk chicken"
  }
];
 
/* SMALL HELPER FUNCTIONS*/
// Turns numbers into price decription
function priceSymbols(price) {
  if (price === 1) {
    return "Budget-friendly";
  } else if (price === 2) {
    return "Moderate";
  } else {
    return "Pricey";
  }
}
 
// Turns true/false into words.
function statusText(openNow) {
  if (openNow) {
    return "Open now";
  } else {
    return "Closed";
  }
}
 
// Returns today's date as "YYYY-MM-DD" 
function getTodayString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return year + "-" + month + "-" + day;
}
 
/* HOME PAGE: show the top 3 rated restaurants */
const featuredEl = document.getElementById("featuredList");
 
function renderFeatured() {
  // Copy the array, sort it from highest to lowest rating, keep the first 3.
  const topThree = [...restaurants]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
 
  let html = "";
  for (const r of topThree) {                     // LOOP: runs once per restaurant
    html += `
      <div class="col-12 col-md-6 col-lg-4">
        <article class="card h-100">
          <img src="${r.image}" class="card-img-top" alt="${r.imageAlt}">
          <div class="card-body">
            <h3 class="card-title h5">${r.name}</h3>
            <p class="card-text mb-1">${r.categories.join(", ")} in ${r.area}</p>
            <p class="card-text">Rated ${r.rating} out of 5</p>
            <a href="explore.html" class="btn btn-outline-dark">Find out more</a>
          </div>
        </article>
      </div>`;
  }
  featuredEl.innerHTML = html;
}
 
if (featuredEl) {
  renderFeatured();
}
 
/* EXPLORE PAGE: cards, filter, details modal */
const listEl = document.getElementById("restaurantList");
const countEl = document.getElementById("resultCount");
 
// Builds the HTML for ONE card from ONE restaurant object.
function createCardHTML(r) {
  return `
    <div class="col-12 col-md-6 col-lg-4">
      <article class="card h-100">
        <img src="${r.image}" class="card-img-top" alt="${r.imageAlt}">
        <div class="card-body d-flex flex-column">
          <div class="mb-2">
          ${r.categories.map(c => `<span class="badge category-badge me-1">${c}</span>`).join("")}
          </div>
          <h2 class="card-title h5">${r.name}</h2>
          <p class="card-text mb-1">${r.area} &bull; ${priceSymbols(r.price)} &bull; ${r.rating} out of 5</p>
          <p class="card-text">${statusText(r.openNow)}</p>
          <button type="button" class="btn btn-dark details-btn mt-auto" data-id="${r.id}">View details</button>
        </div>
      </article>
    </div>`;
}
 
// Draws a list of restaurants on the page.
function renderCards(items) {
  let html = "";
  for (const r of items) {                        // LOOP: one card per restaurant
    html += createCardHTML(r);
  }
  listEl.innerHTML = html;
 
  // Update the "Showing restaurants" text
  if (items.length === 1) {
    countEl.textContent = "Showing 1 restaurant";
  } else {
    countEl.textContent = "Showing " + items.length + " restaurants";
  }
 
  // jQuery feature #1: fade the new cards in
  $("#restaurantList .card").hide().fadeIn(300);
}
 
// Shows only the restaurants in the chosen category.
function filterByCategory(category) {
  if (category === "All") {
    renderCards(restaurants);
  } else {
    const filtered = restaurants.filter(r => r.categories.includes(category));
    renderCards(filtered);
  }
}
 
// Makes the clicked filter button dark and the others outlined.
function setActiveButton(clickedButton) {
  const allButtons = document.querySelectorAll(".filter-btn");
  for (const btn of allButtons) {
    btn.classList.remove("btn-dark");
    btn.classList.add("btn-outline-dark");
  }
  clickedButton.classList.remove("btn-outline-dark");
  clickedButton.classList.add("btn-dark");
}
 
// Fills the modal with one restaurant's details and opens it.
function openDetails(id) {
  const r = restaurants.find(item => item.id === id);
 
  document.getElementById("modalTitle").textContent = r.name;
  document.getElementById("modalBody").innerHTML = `
    <p class="mb-2"><strong>Food types:</strong> ${r.categories.join(", ")}</p>
    <p class="mb-2"><strong>Area:</strong> ${r.area}</p>
    <p class="mb-2"><strong>Price:</strong> ${priceSymbols(r.price)}</p>
    <p class="mb-2"><strong>Rating:</strong> ${r.rating} out of 5</p>
    <p class="mb-2"><strong>Status:</strong> ${statusText(r.openNow)}</p>
    <p class="mb-0">${r.description}</p>`;
 
  const modal = new bootstrap.Modal(document.getElementById("detailsModal"));
  modal.show();
}
 
if (listEl) {
  // Show all restaurants when the page first loads
  renderCards(restaurants);
 
  // EVENT: clicking a filter button
  const filterButtons = document.querySelectorAll(".filter-btn");
  for (const btn of filterButtons) {
    btn.addEventListener("click", function () {
      filterByCategory(btn.dataset.category);
      setActiveButton(btn);
    });
  }
 
  // EVENT: clicking "View details" on any card.
  // The cards are created by JavaScript
  // check which button was clicked (event delegation).
  listEl.addEventListener("click", function (event) {
    const button = event.target.closest(".details-btn");
    if (button) {
      openDetails(Number(button.dataset.id));
    }
  });
}
 
/* RESERVE PAGE: form, validation, confirmation */

const formEl = document.getElementById("reserveForm");
 
// Adds one option to the dropdown for every restaurant.
function fillRestaurantSelect() {
  const select = document.getElementById("restaurant");
  for (const r of restaurants) {                  // LOOP
    const option = document.createElement("option");
    option.value = r.id;
    option.textContent = r.name + " (" + r.area + ")";
    select.appendChild(option);
  }
}
 
// Shows a red or green outline on a field.
function setFieldState(id, isValid) {
  const field = document.getElementById(id);
  if (isValid) {
    field.classList.remove("is-invalid");
    field.classList.add("is-valid");
  } else {
    field.classList.remove("is-valid");
    field.classList.add("is-invalid");
  }
}
 
// Removes all red/green outlines (used after a successful submit).
function clearFieldStates() {
  const fields = formEl.querySelectorAll(".form-control, .form-select");
  for (const field of fields) {
    field.classList.remove("is-valid", "is-invalid");
  }
}
// Checks every field. Returns true only if ALL of them are OK.
function validateForm(values) {
  let allValid = true;
 
  // Name: not empty
  const nameOk = values.name !== "";
  setFieldState("name", nameOk);
  if (!nameOk) { allValid = false; }
 
  // Email: must look like something@something.something
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //[^\s@]+ means: one or more characters that are not a space and not an @ symbol.
  const emailOk = emailPattern.test(values.email);
  setFieldState("email", emailOk);
  if (!emailOk) { allValid = false; }
 
  // Restaurant: one must be chosen
  const restaurantOk = values.restaurantId !== "";
  setFieldState("restaurant", restaurantOk);
  if (!restaurantOk) { allValid = false; }
 
  // Date: must be chosen, and not in the past
  const dateOk = values.date !== "" && values.date >= getTodayString();
  setFieldState("date", dateOk);
  if (!dateOk) { allValid = false; }
 
  // Group size: whole number from 1 to 12
  const sizeOk = Number.isInteger(values.groupSize) && values.groupSize >= 1 && values.groupSize <= 12;
  setFieldState("groupSize", sizeOk);
  if (!sizeOk) { allValid = false; }
 
  return allValid;
}
 
// Shows the green confirmation box and the Bootstrap toast.
function showConfirmation(values) {
  const chosen = restaurants.find(r => r.id === Number(values.restaurantId));
  const guestWord = values.groupSize === 1 ? "guest" : "guests";
  const message = "Thanks, " + values.name + "! Your request for " + values.groupSize + " " +
                  guestWord + " at " + chosen.name + " on " + values.date + " has been sent.";
 
  // Green box on the page
  const box = document.getElementById("confirmation");
  box.textContent = message;
  box.classList.remove("d-none");
 
  // Bootstrap toast pop-up
  document.getElementById("toastBody").textContent = "Reservation request sent!";
  const toast = new bootstrap.Toast(document.getElementById("successToast"), { delay: 5000 });
  toast.show();
}
 
if (formEl) {
  fillRestaurantSelect();
 
  // Don't allow past dates in the date picker
  document.getElementById("date").min = getTodayString();
 
  // EVENT: the form being submitted
  formEl.addEventListener("submit", function (event) {
    event.preventDefault();   // stop the page from reloading
 
  // Read what the user typed
    const values = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      restaurantId: document.getElementById("restaurant").value,
      date: document.getElementById("date").value,
      groupSize: Number(document.getElementById("groupSize").value)
    };
 
    if (validateForm(values)) {
      showConfirmation(values);
      formEl.reset();
      clearFieldStates();
    } else {
      document.getElementById("confirmation").classList.add("d-none");
    }
  });
}
 
 
/* ---------------------------------------------------------------------
   6. jQuery feature #2: cards get a bigger shadow when the mouse is over them.
   $(document).on(...) also works for cards that JavaScript creates later.
   --------------------------------------------------------------------- */
$(document).on("mouseenter", ".card", function () {
  $(this).addClass("shadow-lg");
});
$(document).on("mouseleave", ".card", function () {
  $(this).removeClass("shadow-lg");
});
