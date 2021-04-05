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
<p>The best practices for this application are simplest the design and business processes. The idea is reducing the amount of code by reusing available components and available libraries. Avoiding creates features that are already developed and used on the software industry. Each component is clearly defined for the special tasks that are not overlap on other components. Before starting a new task, the previous task must be on resolved status and completely closed to make sure all features fully developed. After testing the separated component, the application is integrated testing components to make sure they all collaborate together as expected.</p>
