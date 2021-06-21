// const socket = io('https://chat-2-point-0.herokuapp.com', { transports: ["websocket"] });
// const socket = io('https://localhost:8080', { transports: ["websocket"] });
const socket = io();
// Geting DOM Element
const form = document.getElementById('send_content');
const messageInput = document.getElementById('input_text');
const messageContainer = document.querySelector('.container');
var audio = new Audio("ping.mp3")

// A function which will appent the info
// const append = (message, position)=>{
//     const messageElement = document.createElement('div');
//     messageElement.innerText = message;
//     messageElement.classList.add('message');
//     messageElement.classList.add(position);
//     messageContainer.append(messageElement);
//     if(position == 'left_one'){
//         audio.play();
//         messageElement.classList.add('color_left');
//     } 
//     if(position == 'right_one'){
//         messageElement.classList.add('color_right');
//     } 
// }

const append = (sp, message, position)=>{
    const messageElement = document.createElement('div');

    const spanElement = document.createElement('span');
    spanElement.textContent = sp + ' :~ ';
    console.log(sp)
    console.log(spanElement)
    spanElement.classList.add('text_message')

    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);

    messageElement.prepend(spanElement);

    messageContainer.append(messageElement);
    if(position == 'left_one'){
        audio.play();
        messageElement.classList.add('color_left');
    } 
    if(position == 'right_one'){
        messageElement.classList.add('color_right');
    } 
}

const appendTest = (sp, message, position)=>{
    const mE = document.createElement('div');
    const spanElement = document.createElement('span');
    spanElement.textContent = sp;
    console.log(sp)
    console.log(spanElement)
    spanElement.classList.add('join_left')

    mE.innerText = message;
    mE.classList.add('message_join_left');
    mE.classList.add(position);

    mE.prepend(spanElement);

    messageContainer.append(mE);

    if(position == 'left_one'){
        audio.play();
        mE.classList.add('color_left');
    } 
    if(position == 'right_one'){
        mE.classList.add('color_right');
    } 
}

// Ask new user for name
const Name = prompt("Enter your name for joining the chat");
socket.emit('new-user-joined', Name); 

// If new user join , recieve name from server

// socket.on('user-joined', name =>{
//     append(`${name}</b> joined the chat`, 'right_one');
// })

socket.on('user-joined', name =>{
    appendTest(name, ' joined the chat', 'right_one');
})

// If server sends a message, recieve it from the server

// socket.on('receive', data =>{
//     append(`${data.name}: ${data.message}`, 'left_one');
// })

socket.on('receive', data =>{
    append(data.name, data.message, 'left_one');
})

// If a user Left Chat application, append the information to the container

// socket.on('user_left', name =>{
//     append(`${name} left the chat`, 'right_one');
// })

socket.on('user_left', name =>{
    appendTest(name, ' left the chat', 'right_one');
})

// If the form submit , send the message to the server
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const message = messageInput.value;
    // append(`You: ${message}`, 'right_one');
    var n = message.localeCompare("");
    if(n != 0){
    append('You', message, 'right_one');
    socket.emit('send', message);
    }
    messageInput.value = '';
})
