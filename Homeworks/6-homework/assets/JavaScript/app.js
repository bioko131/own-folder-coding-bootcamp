//document ready beginning function
    $(document).ready(function(){

    //Array of topics(soccer) teams
    var topics = ["bvb", "real madrid", "liverpool", "Arsenal", "AC Milan"];

    //my giphy key f3cab18bcd1a43dba2fae468b55c2483

    // displayGifInfo function re-renders the HTML to display the appropriate content
    function displayGifInfo() {
        var gif = $(this).attr("data-gif");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=f3cab18bcd1a43dba2fae468b55c2483&limit=10";

    // Performing an AjAX request with the queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

            //Console loggin queryURL and response variables
            console.log(queryURL);
            console.log(response);
             //storing data from the AJAX request in the results variable
             var results = response.data;
        
            // Looping through each result item
            for (var i = 0; i < results.length; i++){

            // Creating a div to hold the gif
            var gifDiv = $("<div class='gif'>"); //Should I remove class?

            // Creating and storing an image tag
            var teamImage = $("<img>");

            // Setting the src attribute of the image to a property pulled off the result item

            teamImage.attr("src", results[i].images.fixed_height_small_still.url);
            teamImage.attr("data-still",results[i].images.fixed_height_small_still.url);
            teamImage.attr("data-animate",results[i].images.fixed_height_small.url); 
            teamImage.attr("data-state", "still");
            teamImage.addClass("image");

            // teamImage.attr("src", response.data[16].images[18].fixed_height[0].url); //discard 

            // Storing the rating data
            var rating = results[i].rating;
            
            // Creating an element to have the rating displayed
            var pOne = $("<p>").text("Rating: " + rating);

            // Displaying the rating
            gifDiv.prepend(pOne);
            gifDiv.prepend(teamImage);


            // Putting the gif above the previous gifs
          $("#gif-display").prepend(gifDiv);
         }
        });
    }
    

    //Function to render buttons
    function renderButtons(){
        $("#gif-display").empty();
        // Looping through the array of gifs
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each gif in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var newButton = $("<button>");
          // Adding a class of gif to our button
          newButton.addClass("gifgif");

          newButton.addClass("btn spacing");
          // Adding a data-attribute
          newButton.attr("data-gif", topics[i]);
          // Providing the initial button text
          newButton.text(topics[i]);
          // Adding the button to the buttons-view div
          $("#gif-display").append(newButton);
        }
      }

      // This function handles events where a gif button is clicked
      $("#add-gif").on("click", function(event) {
        event.preventDefault();

        
        // This line grabs the input from the textbox
        var gif = $("#gif-input").val().trim();
        // Adding gif from the textbox to our array
        topics.push(gif);


        // Calling renderButtons which handles the processing of our gif array
        renderButtons();
        });

      // Adding a click event listener to all elements with a class of "gif"
       $(document).on("click", ".gifgif", displayGifInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();


      
      //Pause stop function
    
      $("#gif-display").on("click", ".image", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

    //document ready end arguments
});