// --------localStorage-------

let StudentDashboard = JSON.parse(localStorage.getItem("StudentDashboard")) || [
  {
    id: 1,
    title: "AI Bootcamp",
    category: "Technology",
    seats: 30,
    registered: 12,
  },
  {
    id: 2,
    title: "Football Tournament",
    category: "Sports",
    seats: 50,
    registered: 20,
  },
  {
    id: 3,
    title: "Music Festival",
    category: "Music",
    seats: 40,
    registered: 15,
  },
];

// ------Save to Localstorage-----

function saveToLocalStorage() {
  localStorage.setItem("StudentDashboard", JSON.stringify(StudentDashboard));
}
saveToLocalStorage();

// ----------DOM------------

const addeventBtn = document.getElementById("addeventBtn");
const totalEvent = document.getElementById("totalEvent");
const totalRegistered = document.getElementById("totalRegistered");
const availableseat = document.getElementById("availableSeat");
const addEventForm = document.getElementById("addEventForm");
const eventTitle = document.getElementById("eventTitle");
const eventCategory = document.getElementById("eventCategory");
const eventSeats = document.getElementById("eventSeats");
const formErrorMsg = document.getElementById("formErrorMsg");
const eventsGridContainer = document.getElementById("eventsGridContainer");
// const noEventsMessage = document.getElementById("noEventsMessage");
const submit = document.getElementById("submit");
const searchInput = document.getElementById("searchInput");

// -------statistics--------

function updateStatistics() {
  totalEvent.textContent = StudentDashboard.length;

  const registered = StudentDashboard.reduce(
    (total, event) => total + event.registered,
    0,
  );

  totalRegistered.textContent = registered;

  const remaining = StudentDashboard.reduce(
    (total, event) => total + (event.seats - event.registered),
    0,
  );

  availableseat.textContent = remaining;
}

// ---------addbtn------

addeventBtn.addEventListener("click", function () {
  if (addEventForm.style.display === "none") {
    addEventForm.style.display = "block";
  } else {
    addEventForm.style.display = "none";
  }
});

// --------render cards--------

function renderform(filteredEvents = StudentDashboard) {
  eventsGridContainer.innerHTML = "";

  filteredEvents.forEach((event) => {
    const remainingSeats = event.seats - event.registered;

    const eventCard = document.createElement("div");

    eventCard.className = "bg-white p-5 rounded-lg shadow-lg space-y-2";

    eventCard.innerHTML = `
      <h3 class="text-xl font-bold">${event.title}</h3>

      <p>Category: ${event.category}</p>

      <p>Total Seats: ${event.seats}</p>

      <p>Registered: ${event.registered}</p>

      <p>Remaining Seats: ${remainingSeats}</p>

      <div class="flex gap-2 mt-3">

        <button
          class="registerBtn bg-green-500 text-white px-4 py-2 rounded"
          data-id="${event.id}"
        >
          Register
        </button>

        <button
          class="cancelBtn bg-red-500 text-white px-4 py-2 rounded"
          data-id="${event.id}"
        >
          Cancel
        </button>

      </div>
    `;

    eventsGridContainer.appendChild(eventCard);
  });

  // ------No Events Message------

  //   if (filteredEvents.length >= 1) {
  //     noEventsMessage.style.display = "none";
  //   } else {
  //     noEventsMessage.style.display = "block";
  //   }

//   function toggleEmptyState() {
//     eventsGridContainer.style.display =
//       filteredEvents.length == 0 ? "none" : "block";
      
//   }

  // --------Register Buttons--------

  document.querySelectorAll(".registerBtn").forEach((button) => {
    button.addEventListener("click", function () {
      const id = Number(button.dataset.id);

      const event = StudentDashboard.find((e) => e.id === id);

      if (event.registered >= event.seats) {
        alert("No seats available!");
        return;
      }

      event.registered++;

      saveToLocalStorage();
      renderform();
      updateStatistics();
    });
  });

  // --------Cancel Buttons--------

  document.querySelectorAll(".cancelBtn").forEach((button) => {
    button.addEventListener("click", function () {
      const id = Number(button.dataset.id);

      const event = StudentDashboard.find((e) => e.id === id);

    //   if (event.registered <= 0) {
    //     alert("No registrations to cancel!");
    //     return;
    //   }

      event.registered--;

      saveToLocalStorage();
      renderform();
      updateStatistics();
    });
  });
}


// --------submit event--------

// --------submit event--------

addEventForm.addEventListener("submit", function (event) {

  event.preventDefault();

  const title = eventTitle.value.trim();

  const category = eventCategory.value;

  const seats = parseInt(eventSeats.value);

  // --------Validation--------

  if (title === "" || category === "" || isNaN(seats) || seats <= 0) {

    formErrorMsg.classList.remove("hidden");

    formErrorMsg.textContent =
      "Please fill all fields correctly";

    return;
  }

  formErrorMsg.classList.add("hidden");

  // --------Create Object--------

  const newEvent = {

    id:
      StudentDashboard.length > 0
        ? Math.max(...StudentDashboard.map((e) => e.id)) + 1
        : 1,

    title: title,

    category: category,

    seats: seats,

    registered: 0,
  };

  // --------Add Event--------

  StudentDashboard.push(newEvent);

  saveToLocalStorage();

  renderform();

  updateStatistics();


  // --------Clear Inputs--------

  eventTitle.value = "";

  eventCategory.value = "";

  eventSeats.value = "";

  addEventForm.style.display = "block";

});
renderform();
updateStatistics();



//---------filter Reseach ---------

//--------- Search ---------

const searchEvent = document.getElementById("seachEvent");

searchEvent.addEventListener("input", function () {

  const searchTerm = searchEvent.value.toLowerCase().trim();

  const filteredEvents = StudentDashboard.filter((event) =>

    event.title.toLowerCase().includes(searchTerm) ||

    event.category.toLowerCase().includes(searchTerm)

  );

  renderform(filteredEvents);

});