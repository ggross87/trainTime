/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
//

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBVGJlvhhbK5xbzwwuE5D6RfNBZzW7AErA",
  authDomain: "train-time-b517f.firebaseapp.com",
  databaseURL: "https://train-time-b517f.firebaseio.com",
  projectId: "train-time-b517f",
  storageBucket: "",
  messagingSenderId: "149733057043"
};
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var timeStart = moment($("#time-input").val().trim(), "HH:mm").format("X");
  var frequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    dest: destination,
    time: timeStart,
    freq: frequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.trainName);
  console.log(newTrain.destination);
  console.log(newTrain.timeStart);
  console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().role;
  var timeStart = childSnapshot.val().start;
  var frequency = childSnapshot.val().rate;

  // Train Info
  console.log(trainName);
  console.log(destination);
  console.log(timeStart);
  console.log(frequency);

  // Prettify the time input start
  var timeStartPretty = moment.unix(timeStart).format("HH:mm");

  // Calculate the  next arrival and minutes away using hardcore math

  var nextTrain = timeStart % frequency;

  // Calculate
  var minAway = frequency -  nextTrain;
  console.log(minAway);

  // Add each train's data into the table
  $("#schedule-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  timeStart + "</td><td>" + frequency "</td><td>" + nextTrain + "</td><td>" + minAway);
});
