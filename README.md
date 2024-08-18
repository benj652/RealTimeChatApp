# RTChatapp

This application is a real-time chat application inspired by the tutorial found at [YouTube](https://www.youtube.com/watch?v=HwCqsOis894). It is built using the [MERN stack](<https://en.wikipedia.org/wiki/MERN_(stack_framework)>) and utilizes the [Socket.io](https://socket.io/) library for real-time communication between clients. The application allows users to create and join group chats, as well as send and receive messages in those chats. It also includes features for user authentication and profile management.

## Getting Started

To get started with RTChatapp, follow these steps:

1. Clone the repository: `git clone https://github.com/benj652/rtchatapp.git`
2. Navigate to the project directory: `cd rtchatapp`
3. Install dependencies: `npm install`
4. Sign up for a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account and create a new cluster.
5. Create a new database user with readWrite permissions.
6. Create a `.env` file in the root directory of the project and add the following lines:
   MONGO_DB_URI=<YOUR_DATABASE_URI>
   JWT_SECRET=<YOUR_JWT_SECRET>
   PORT=<YOUR_PORT>
   NODE_ENV=<YOUR_NODE_ENV>
7. In the root directory of the project, start the server: `npm run server`
8. In the root directory of the project, start the client: `npm run client`
9. Open your browser and navigate to `http://localhost:3000`

## Features

- Real-time messaging between users
- Create and join group chats
- View and send images and videos
- Search for users in the sidebar
- View online users in the sidebar
- Profile page with profile picture and username
- User authentication

## Technologies Used

- React
- Node.js
- Express
- MongoDB
- Socket.io
- Tailwind CSS
- React Hot Toast
- DaisyUI
- Robohash.org
