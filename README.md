# recognition-tagboard

Valencia College Recognition Application

# Concept

To encourage colleague and departmental recognition within Organizational Development and Human Resources (ODHR) at Valencia College, this web application leverages a full MERN (MongoDB, Express, React.js and Node.js) stack. Please note that this application is built to the specific needs of ODHR at Valencia College. 

# Project Overview

Leveraging a MERN stack, this application requires users to register before being able to access any of its primary features. Users (employees of Valencia College's ODHR division) provide key information about their employment status within ODHR, including first and last name, position, department and email address, as well as create a username and password, which utilizes passport for encryption.

Once the user registers, they can begin recognizing departments immediately. This data is hard coded (or seeded) into the system. As more ODHR employees register, users can begin recognizing. All recognition comments are then displayed via a tagboard, showing the most recent comments first. 

Users also have the ability to search for recognition comments pertaining to a specific department or employee. 

If a user changes departments within ODHR or gets married, he or she has the ability to update their information. 

If a user is designated as an administrator, he or she has the ability to manage comments and user and department information. This also gives admins the ability to designate other admins. 

# Languages and Libraries

- MongoDB
- Express.js
- Reactjs
- Node.js
- Passport
- React Bootstrap
- CSS
- Bootstrap
- Axios
- nodemail (future development)

# Looking to use this application?

If you are looking to use this application, first you will need git clone onto your local machine. 

<strong>SEEDS FILE</strong>
Be sure to NPM install, but before you NPM Start, you will need to first access the seeds file. 

To access the seeds file:

1. Navigate to scripts from the root file. 
2. Open seedDB.
3. Rename the departments within the document to match your needs.
4. Save and Close.
5. In your terminal, navigate to the root file and run "npm run seed" — this will insert the department into the database so users can select which department they work in. 
6. Run "npm start" to start us the database. 

Please note that because the default value of admin is set to false, you will need to access the the database via Robo 3T and change the value of your initial user to true. 

<strong>ENV Vile</strong>
Because this application leverages passport, you will also need to create .env file. Inside this file, you will need create a secret. 

PASSPORT_SECRET=YOURPASSWORDHERE

This secret will be used to help keep track of sessions. Please note that without this secret, the application will NOT work. 

# Future Development

- Users will be notified via email when they or their department receives a comment.
- Admins will be able to deactivate accounts so they no longer appear on recognition dropdown. 
- Admins will be able to deactivate departments so they no longer appear on recognition dropdown. 

# Suggestions?

Feel free to email me at shelby.england@knights.ucf.edu or create an issues ticket.

# URL

Due to the nature of the application, I have decided to provide you with screen casts of the the app's functionality. To view the demo: http://bit.ly/2vPUvOB
