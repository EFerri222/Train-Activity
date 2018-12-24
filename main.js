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
      
        // Train Info
        console.log(trainName);
        console.log(trainDestination);
        console.log(firstTrainTime);
        console.log(trainFrequency);

        var firstTimeConverted = moment(firstTrainTime, "HH:mm");
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var tRemainder = diffTime % trainFrequency;
        var tMinutesTillTrain = trainFrequency - tRemainder;
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        var nextTrainTime = moment(nextTrain).format("hh:mm");
      
        // Create the new row
        var newRow = $("<tr>").append(
          $("<td>").text(trainName),
          $("<td>").text(trainDestination),
          $("<td>").text(trainFrequency),
          $("<td>").text(nextTrainTime),
          $("<td>").text(tMinutesTillTrain),
        );
      
        // Append the new row to the table
        $("#train-table > tbody").append(newRow);
      });

});