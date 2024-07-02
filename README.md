# Nova Tourism Server

## Description

This is the server-side code for the Nova Tourism application. It is built with Node.js, Express, and MongoDB.

**Visit the live site:** [Nova Travel](https://nova-tourism.web.app/).

[Client side repository](https://github.com/HunterMahmud/nova-tourism-client)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Install Node.js (version 14 or higher) from [nodejs.org](https://nodejs.org/).
- **npm**: Node.js package manager (npm) should be installed along with Node.js.
- **MongoDB**: Install MongoDB from [mongodb.com](https://www.mongodb.com/).

## Installation

Follow these steps to set up your development environment:

1. **Clone the repository**:

   ```sh
   git clone https://github.com/HunterMahmud/nova-tourism-server.git
   cd nova-tourism-server
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root of the project and add the necessary environment variables. For example:

   ```env
   DB_USER = your_mongodb_user
   DB_PASS = your_mongodb_password
   ACCESS_SECRET_TOKEN = your_jwt_access_token
   ```

   Replace `your_mongodb_user` , `your_mongodb_password` and `your_jwt_access_token` with your actual value.

4. **Start the server**:

   ```sh
   npm start
   ```

   The server should now be running and accessible at `http://localhost:your_port_number`.

## Scripts

- `start`: Starts the server using `node index.js`.

## Dependencies

- `cors`: ^2.8.5
- `dotenv`: ^16.4.5
- `express`: ^4.19.2
- `mongodb`: ^6.5.0

## Author

- Hasan Al Mahmud
