## Mahjong Game Online
# Author:
<p>Vien Nguyen</p>
# Introduction of the game and the application:
<p> Playing games is a common entertainment activity that everyone would like to spend time with their family and friends. This project aims to create a game environment for Mahjong players to play via a virtual game table. Mahjong is a traditional game in China that requires player strategy and luck to win. The game now becomes popular in the game community as it not only a fun game and tight-up socializing between players. Game rules are complicated and vary on the game versions, countries, groups where players actually can define their own rules on the general rules. Hosting a mahjong game is basically difficult as people have to equip an expensive mahjong set and an inconvenient game table to carry with four players. Gathering enough players for hosting a game event even more challenging because everyone has their own daily schedule, or physical distance does not allow them to host a game.
Mahjong game online is purposely created to provide a better condition for the mahjong players to play with their crew anytime, anywhere on a mobile device as long as they have an internet connection. Hopefully, this application will be a small social website connecting mahjong players to share the beauty of an interesting game.</p>

# High level functional requirements:
<p>The project creates a website that a mahjong game is provided where its users can play together.</p>
<p>The user can register for an account and activate it before they can log in to the website.</p>
<p>The user can invite their friend to the game via email.</p>
<p>The user can create a profile page where friends can view each other.</p>
<p>The user can also update their image profile and password since they logged in.</p>
<p>The mahjong game rules are populating to everyone so that they can learn how to play the game.</p>
<p>The user can see their friend list.</p>
<p>The administrator can view the report on the number of users, activated users, un-activated users, searching for a specific user, or removing a user.</p>
<p>The admin user can update his own password.</p>
<p>All users are accessible to the mahjong game.</p>

# None-functional requirements:
<p>
  Non-functional requirements are constraints on the application or offered by the system. The Mahjong game web app is offering compatibility as a non-functional requirement.
Goal:
- The mahjong game application can work on different web browsers: Internet Explorer, Chrome, Firefox.
- The mahjong game application is accessible to different kinds of machines: computer, mobile phone, tablet.
- The mahjong game application does support the Rest APIs that the third party can connect to the web service.
Impact:
- The mahjong game has sacrificed the interactive design to be able to compatibly work with different devices. Less animation, screen touch, drag, and drop.
- Loss functionalities. </p>

# Technology:
<p>The mahjong game web application can be implemented from different programming technologies like PHP, Java, C# that I have experienced with. However, I would like to step out of the comfort zone to create a product with newer technologies that require a lot of self-learning and research. React.js 17.0.2, Nodejs 14.15.1, Fabric.js 4.3.3, MySQL 5.7 are the major tools used in implementing this application. 
React.js is responsible for the front-end processes that features are developed in reusable components. With React.js, I can flexibly write HTML and JavaScript together.
This is an open-source framework widely used in the web developing community that will benefit if technical issues arise during the development, I could have supports from the community.
Node.js is accountable for the business at the backend. This is another open-source tool that works as JavaScript Webserver. It allows a Web socket application to be quickly developed. Node.js fits in the circumstance of building a mahjong online game because it offers connectivity between separating users. </p>
<p>The best practices for this application are simplest the design and business processes. The idea is to reduce the amount of code by reusing available components and available libraries. Avoiding creates features that are already developed and used in the software industry. Each component is clearly defined for the special tasks that do not overlap on other components. Before starting a new task, the previous task must be on the resolved status and completely closed to ensure all features are fully developed. After testing the separated component, the application is integrated testing components to ensure they all collaborate as expected.</p>
<p>The application is not going to be deployed on the cloud at this stage because it is considered a research software product that requires many improvements. It must offer the lowest price for the application to create, test, and deploy. However, the application development still applies the DevOps principles by using the GitHub repository to store, develop, and maintain the source code. Each developer can collaborate the work on different repository branches to test out the application for better features. Also, building the application from manipulating Agile methodology to monitor the processes, amount of work, issue, etc., using Jira software. Each step of the project is planned and kept on track. The weekly report is sending out every week so that the project is evaluating on the timeframe.</p>
<p>It is very challenging to build this mahjong game online using Node.js, React.js. Fabric.js and other javascript libraries. I have decided to use these technologies based on its trend in the software market, features, and concepts from the new tools so I can expand the horizon of my knowledge. 
I have learned how to build a single page application using React.js that the web components can be loaded smoothly without refreshing the page. Whenever the data stage changes, the page is automatically rendered.
Setting up the environment for a React.js application is simple using the command line. However, the developer can modify the provided components to fit in their application structure.
In this project, I learned to code the client-side and server-side in two different servers and used the customed APIs and third-party API. Also, I have been learning how to integrate the libraries from the different frameworks to create my game features. For example, I have created the game server using socket.io to link the multiple front ends' communications, sending data from one to another. Using Fabric.js library to generate the game table and mahjong set, handling the interaction on the game table so that the game indicates the current status.
I decided to use JavaScript libraries in building the game interface instead of using a game engine because they are well supported on the web platform. I properly get improved in coding JavaScript in React.js and Node.js. I am evaluating JavaScript as the future when this language can be used to do programming at the front end, back end, cross platforms for web applications, mobile applications.</p>
<p>The technical approach is to guarantee the necessary features are implemented correctly. Using the right tools and suitable technical design to do things the right way.
In this project, the goal is to create a mahjong game on a website where users can interact in real-time with other users. So, the system will have a client-server with a game engine and real-time connection.</p>

<p>Create a mahjong game online is a handful of risks and challenges. 

Applying new technologies that demand self-learning is a risk as it is time-consuming and practices on the tutorials. I spent days learning React.js on particular examples that need to be customized to complete the project's tasks. React manages the data on the website constantly. If an object changes, the components are also changed. This advanced feature makes it the project hard to control the logic when the features grew. 

I had an issue working with the socket.io library on React.js and Node.js when they were not cooperated due to version differences. I tried to install several released versions to find out the suitable one.

Fabric.js is one of the most challenging graphic tools that I had to deal with to display the tile objects onto the screen. Each tile will have a coordinated position on the screen. 
Whenever the object is modified, it must be notified for updating on other screens. For the mahjong table, 4 players are located at 4 sides. The game must display 4 ways of showing the tiles, which depend on the player positions. Before the position problems are solved, I have to learn more about the Fabric object events document on http://fabricjs.com/.
	If Fabric.js is not fully supporting the mahjong game, HTML tags and JavaScript methods might support the missing features.</p>
  
  <p>Currently, the game needs a converter for the view angle corresponding to different players. All players will see themselves at the bottom side of the game table. However, they will see their partners on three other sides. The front end must intellectually recognize the players to display correct data and graphics.</p>


