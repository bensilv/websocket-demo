
// const socket = io('ws://localhost:8080');
const socket = io();
let name = undefined;

socket.on('message', message => {
    const el = document.createElement('li');
    el.classList.add('list-group-item');
    if (message.id === socket.id) {
        el.classList.add('mine');
    } else {
        el.classList.add('others');
    }
    el.innerHTML = `<h3>${message.name}</h3>${message.content}`;
    document.querySelector('ul').appendChild(el);
});

$(window).on('load', () => {
    $('#nameModal').modal('show');
});

const sendMessage = () => {
    const inputField = $('#compose-message')[0];
    const text = inputField.value;
    inputField.value = '';
    socket.emit('message', {name: name, content: text})
}

document.querySelector('button').onclick = sendMessage
document.getElementById('compose-message').onkeyup = (e) => {
    // console.log('key_hit')
    if (e.key === 'Enter' || e.keyCode === 13) {
        sendMessage();
    }
}

$('#name-submit')[0].onclick = () => {
    name = $('#name')[0].value;
    // console.log(name)
}
