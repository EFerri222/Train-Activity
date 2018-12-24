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
    });

});