const socket = io('http://localhost:8000', { transports: ["websocket"] });

// Geting DOM Element
const form = document.getElementById('send_content');
const messageInput = document.getElementById('input_text');
const messageContainer = document.querySelector('.container');
var audio = new Audio("ping.mp3")

// A function which will appent the info
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left_one'){
        audio.play();
    } 
}

// Ask new user for name
const Name = prompt("Enter your name for joining the chat");
socket.emit('new-user-joined', Name); 

// If new user join , recieve name from server
socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right_one');
})

// If server sends a message, recieve it from the server
socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left_one');
})

// If a user Left Chat application, append the information to the container
socket.on('user_left', name =>{
    append(`${name} left the chat`, 'right_one');
})

// If the form submit , send the message to the server
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right_one');
    socket.emit('send', message);
    messageInput.value = '';
})