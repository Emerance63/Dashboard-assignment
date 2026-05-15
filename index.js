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

const addeventBtn = document.getElementById("addeventBtn");
const totalEvent = document.getElementById("totalEvent");
const totalRegistered = document.getElementById("totalRegistered");
const availableseat = document.getElementById("availableSeat");
const addEventForm = document.getElementById("addEventForm");
const eventTitle = document.getElementById("eventTitle");
const eventCategory = document.getElementById("eventCategory");
const eventSeats = document.getElementById("eventSeats");
const formErrorMsg = document.getElementById("formErrorMsg");
const eventCountBadge = document.getElementById("eventCountBadge");
const noEventsMessage = document.getElementById("noEventsMessage");

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
  if(addEventForm.style.display === "none"){
    addEventForm.style.display = "block";
  } else{
    addEventForm.style.display = "none";
  }
  
});

