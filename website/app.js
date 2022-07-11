/* Global Variables */
let myKey = "&appid=4974e4c07221605958a65e69998816a8&units=imperial";
let baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
let genBtn = document.getElementById("generate");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

//this code from lesson 4  . 8:Async Fetch with Web APIs Demo
genBtn.addEventListener("click", performAction); // event listner to prefor action when btn clickd

// this function will build the url  combining url , zip and apiKey
function performAction(e) {
  const zipCode = document.getElementById("zip").value;
  const content = document.getElementById("feelings").value;
  // condation to check user input and return alert if empty
  if (zipCode === "" || content === "") {
    alert("kinly entre zip code and feeling");
  } else {
    getData(baseUrl, zipCode, myKey)
      .then(function (userData) {
        postData("/add", { date: newDate, temp: userData.main.temp, content });
      })
      .then(function (newData) {
        updateUI();
      });
  }
}

// GET request to the OpenWeatherMap API to get temp  .
const getData = async (baseUrl, zipCode, myKey) => {
  const resault = await fetch(baseUrl + zipCode + myKey);

  try {
    const uiData = await resault.json();

    return uiData;
  } catch (error) {
    console.log("error", error); // appropriately handle the error
  }
};

const postData = async (url = "", data = {}) => {
  //POST Route send data to server
  const response = await fetch("/add", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content,
    }),
  });
  try {
    const newData = await response.json();

    return newData;
  } catch (error) {
    console.log(error); // appropriately handle the error
  }
};

// Dynamically Update UI
const updateUI = async () => {
  const request = await fetch("/all");

  try {
    const data = await request.json();

    // Assigning Element content Dynamically
    document.getElementById("date").innerHTML = `Date: ${data.date}`;
    document.getElementById(
      "temp"
    ).innerHTML = `Temprature: ${data.temp.toFixed(0)}°F`; // will show temp imperial
    document.getElementById("tempc").innerHTML = `Temprature: ${(
      ((data.temp - 32) * 5) /
      9
    ).toFixed(0)}°C`; // added to show celsius
    document.getElementById("content").innerHTML = data.content;
  } catch (error) {
    console.log("error", error); // appropriately handle the error
  }
};
//toggle switch between C and F
// https://stackoverflow.com/questions/44565816/javascript-toggle-switch-using-data
document.addEventListener("DOMContentLoaded", function () {
  var checkbox = document.querySelector('input[type="checkbox"]');

  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      document.getElementById("temp").style.display = "block";
      document.getElementById("tempc").style.display = "none";
    } else {
      document.getElementById("tempc").style.display = "block";
      document.getElementById("temp").style.display = "none";
    }
  });
});
