const container = document.getElementById('container');
container.classList.add("container");


let userInput = prompt("Enter grid Dimension: ");



for (let i = 0 ; i < userInput; i++) {
    const div = document.createElement("div");
    div.classList.add("box");
    container.appendChild(div);
}