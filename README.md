# patient monitoring system

## Goal
`patient_monitoring_system`  will store and serve patient data to AI algorithms. It will allow hardware devices (like patient monitoring wearables) to send real-time data to the system. The API will enable the frontend dashboard to fetch and display patient vitals dynamically


## features
- CRUD (Create, Read, Update, Delete) operations for patient records.
- MongoDB database to store patient data.
- An endpoint that simulates real-time updates to patient vitals
- JWT-based authentication to restrict API access using `Passportjs`

## ⚙️ Installation

- Open CMD
  
- Change directory to desktop

  `cd desktop`
   
- Clone this repository

  `git clone https://github.com/abdulrahmankolawole/patient-monitoring-system.git`

- Change the current directory

  `cd patient-monitoring-system`
  
- Install packages

  `npm install`

- Create a `.env` file in the root directory

  - Set up the `MONGO_URI` DB connection string
  - Set up the `PORT` variable
  - Set up `JWT_SECRET` in .env file
  

- Run the server

  `npm run dev`
  