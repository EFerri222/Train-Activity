$(document).ready(function() {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAY-2GM4sEPUaaih4030cpwOmyYJ00P7U0",
        authDomain: "train-activity-aee7e.firebaseapp.com",
        databaseURL: "https://train-activity-aee7e.firebaseio.com",
        projectId: "train-activity-aee7e",
        storageBucket: "train-activity-aee7e.appspot.com",
        messagingSenderId: "364181094902"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    $("#submit-btn").on("click", function(event) {

        event.preventDefault();

        var trainName = $("#train-name-input").val().trim();
        var trainDestination = $("#destination-input").val().trim();
        var firstTrainTime = $("#first-train-time-input").val().trim();
        var trainFrequency = parseInt($("#frequency-input").val().trim());

        var newTrain = {
            name: trainName,
            destination: trainDestination,
            time: firstTrainTime,
            frequency: trainFrequency
        };

        database.ref().push(newTrain);

        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-train-time-input").val("");
        $("#frequency-input").val("");
    });

    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());
      
        // Store everything into a variable.
        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var firstTrainTime = childSnapshot.val().time;
        var trainFrequency = childSnapshot.val().frequency;
      
        // Employee Info
        console.log(trainName);
        console.log(trainDestination);
        console.log(firstTrainTime);
        console.log(trainFrequency);
      
        // // Prettify the employee start
        // var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");
      
        // // Calculate the months worked using hardcore math
        // // To calculate the months worked
        // var empMonths = moment().diff(moment(empStart, "X"), "months");
        // console.log(empMonths);
      
        // // Calculate the total billed rate
        // var empBilled = empMonths * empRate;
        // console.log(empBilled);
      
        // Create the new row
        var newRow = $("<tr>").append(
          $("<td>").text(trainName),
          $("<td>").text(trainDestination),
          $("<td>").text(trainFrequency),
          $("<td>").text("Next Arrival"),
          $("<td>").text("Minutes Away"),
        );
      
        // Append the new row to the table
        $("#train-table > tbody").append(newRow);
      });

});