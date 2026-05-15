// --------localStorage-------

let student = JSON.parse(localStorage.getItem("StudentDashboard"))||[
    {
        id: 1,
        title: "AI Bootcamp",
        category: "Technology",
        seats: 30,
        registered: 12
      },
      {
        id: 2,
        title: "Football Tournament",
        category: "Sports",
        seats: 50,
        registered: 20
      },
      {
        id: 3,
        title: "Music Festival",
        category: "Music",
        seats: 40,
        registered: 15
      }
];
// localStorage.setItem("studentDashboard",JSON.stringify());


