
// const socket = io('ws://localhost:8080');
const socket = io();

socket.on('message', text => {
    const el = document.createElement('li');
    el.classList.add('list-group-item');
    el.innerHTML = text;
    document.querySelector('ul').appendChild(el);
});

document.querySelector('button').onclick = () => {
    const text = document.querySelector('input').value;
    socket.emit('message', text)
}