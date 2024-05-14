Introduction:
    Our application will calculate an individual's blood alcohol percentage based on their height, weight, health conditions, and how many drinks they have had in a certain amount of time. This application is a great tool for college students due to drinking culture since it’ll lessen the amount of alcohol-based hospitalizations. 
Along with this, our application will tell the user their expected level of drunkenness based on their blood alcohol percentage and will alert the user when it is at or above a dangerous level.This is based on user input and consists of frontend interaction for user interaction and backend for processing data and calculation. We stored data using PouchDB. 

Set-Up Instructions:
    To get started, clone the repository with  git clone https://github.com/angho8/cs-326-project and install pm to insure the system runs on your device. To open the server use `npm start` and open your browser to `http://localhost:3000` where the BAC will begin. 

Front-end:
    The front end consists of an HTML page equipped for user input and buttons for calculating BAC as well as editing user information. We chose to do a simple design for the look of our application, especially since those who will be using it will be intoxicated. Users can begin with their personal information that can be used to attribute to calculate the BAC. This includes their gender, weight, and any underlying medical conditions that may affect blood alcohol levels. After all this information is provided they can input their details about the drinks they’ve consumed, this includes what type of drink it is (shot beer, or a cocktail) and how many. Once you hit “Calculate”, the data is sent to the server which then returns your BAC result.

Back-end Implementations:
    The server is built by configuring Express.js and handling JSON requests. The backend is built to calculate the BAC with the core logic for calculations in the `BloodAlcoholCalculator` class. It includes the correlating drink already knowing the volume and alcohol by volume of that certain drink. It listens to requests from the front end and processes the data for results. The server uses the `BloodAlcoholCalculator` class to set user information, update drink data, and perform the BAC calculation. 
    PouchDB is used as the database solution to manage user and drink data. Upon server initialization, the database checks for existence of users and drinks exist with the initiative to create them if necessary to ensure the user information and drink data are stored reliably. 


API Routes: 
	POST /calculateBAC
This route is used to calculate the BAC. When a POST request is made to this endpoint, the server expects a JSON body containing the user’s gender, weight, number of drinks, and type of drink. The backend processes this in the  `BloodAlcoholCalculator` class and returns the rBAC percentage in response.
 
    GET /users
This route retrieves all users stored in the database. When a GET request is made to this endpoint, the server responds with a JSON array of user data.

    POST /users
This route adds a new user to the database. When a POST request is made to this endpoint, the server expects a JSON body containing the user information. The server adds this information to the users collection in the database.

    PUT /users/:id
This route updates an existing user's information in the database. When a PUT request is made to this endpoint, the server expects a JSON body containing the updated user information and the user ID in the URL parameters.

    DELETE /users/:id
This route deletes a user from the database. When a DELETE request is made to this endpoint, the server expects the user ID in the URL parameters.

    Error Handling
The server implements error handling for all routes to manage and respond to different errors such as 404 (Not Found) and 500 (Server Error). Errors are logged on the server console, and appropriate responses are sent to the front-end.

Conclusion: 
    The process of creating our application had it's ups and downs but we were able to make something that we could use beyond this class. We did research about the alcohol levels and it's affects with the satisfaction of it all coming together with everything we learned through out this semester. 
    Our project was worked on a lot through VSCode live where we could work directly together without having to worry about overlapping changes of code through Github's push and pull. With that, we mostly used Angela's server to open the live and run the code which is why her contribution on Github is much greater but each person contributed to the making of this application. 
    Thank you so much for everything and have a good summer! 


