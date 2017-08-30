// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBS_PVdIKa8JQuXpTQwKjWr4kRFS4GbPVU",
    authDomain: "trains-8bf94.firebaseapp.com",
    databaseURL: "https://trains-8bf94.firebaseio.com",
    projectId: "trains-8bf94",
    storageBucket: "",
    messagingSenderId: "214725973845"
  };
  firebase.initializeApp(config);  

    // Create a variable to reference the database.
    var database = firebase.database();

    // Initial Values
    var name = "";
    var role = "";
    var startDate = 0;
    var monthlyRate = "";

    // Capture Button Click
    $("#add-user").on("click", function(event) {
      event.preventDefault();

      // Grabbed values from text boxes
      name = $("#name-input").val().trim();
      role = $("#role-input").val().trim();
      startDate = $("#startDate-input").val().trim();
      monthlyRate = $("#monthlyRate-input").val().trim();

      // Code for handling the push
      database.ref().push({
        name: name,
        role: role,
        startDate: startDate,
        monthlyRate: monthlyRate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

    });
 
 function monthDiff(dateStart, dateEnd) {
    var months = 0;
    months = (dateEnd.getFullYear() - dateStart.getFullYear()) * 12;
    months -= dateStart.getMonth() + 1;
    months += dateEnd.getMonth();
    return months <= 0 ? 0 : months;
}

    // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
    database.ref().orderByChild("dateAdded").limitToLast(10).on("child_added", function(snapshot) {
      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();

      // Console.loging the last user's data
      console.log(sv.name);
      console.log(sv.role);
      console.log(sv.startDate);
      console.log(sv.monthlyRate);

      var inputDate = new Date(sv.startDate);
      var currentDate = new Date();

      var monthsWorked = monthDiff(inputDate, currentDate);

      var totalBilled = (monthsWorked*sv.monthlyRate);

      var newRow = $("<tr>");
      newRow.append("<td>" + sv.name + "</td>");
      newRow.append("<td>" + sv.role + "</td>");
      newRow.append("<td>" + sv.startDate + "</td>");
      newRow.append("<td>" + monthsWorked + "</td>");
      newRow.append("<td>" + sv.monthlyRate + "</td>");
      newRow.append("<td>" + totalBilled + "</td>");

      $(".table").append(newRow);
      
      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });