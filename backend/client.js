// client.js
import { io } from 'socket.io-client';
const userId = "temp@gmail.com"
// Connect to the Socket.IO server
const socket = io('http://localhost:3000',{
    query: {userId}
}); // Adjust the URL if needed

// Listen for connection events
socket.on('connect', () => {
    console.log('Connected to the Socket.IO server');
});

// Listen for notifications
socket.on('notification', (data) => {
    console.log('New Notification:', data);
});


socket.on('videofeed', (data) => {
    console.log("New vid", data)
})

// Listen for disconnection events
socket.on('disconnect', () => {
    console.log('Disconnected from the server');
});
