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
const eventsGridContainer = document.getElementById("eventsGridContainer");
const noEventsMessage = document.getElementById("noEventsMessage");
const submit = document.getElementById("submit");

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

function renderform(){

    eventsGridContainer.innerHTML ="";
    StudentDashboard.forEach(event => {
        const eventCard = document.createElement("div");
        eventCard.className = "event-card";
        eventCard.innerHTML = `
        <h3>${event.title}</h3>
        <p>Category: ${event.category}</p>
        <p>Seats: ${event.seats}</p>
        <p>Registered: ${event.registered}</p>
        `;
        eventsGridContainer.appendChild(eventCard);
    });

    // if(StudentDashboard.length >= 1){
    //     noEventsMessage.style.display = "none";
    // } else{
    //     noEventsMessage.style.display = "block";
    // }
  
    submit.addEventListener("click", function(event){
        event.preventDefault();

        const title = eventTitle.value.trim();
        const category = eventCategory.value.trim();
        const seats = parseInt(eventSeats.value.trim());

        if(!title || !category || isNaN(seats)){
            formErrorMsg.textContent = "Please fill in all fields with valid information.";
            return;
        }

        const newEvent = {
            id: StudentDashboard.length > 0 ? Math.max(...StudentDashboard.map(e => e.id)) + 1 : 1,
            title: title,
            category: category,
            seats: seats,
            registered: 0
        };

        StudentDashboard.push(newEvent);
        saveToLocalStorage();
        renderform();
        updateStatistics();

        eventTitle.value = "";
        eventCategory.value = "";
        eventSeats.value = "";

        addEventForm.style.display = "none";

    });

    
}