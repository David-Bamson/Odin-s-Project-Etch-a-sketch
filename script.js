// Random color function
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return {r, g, b};
}

// Color darkening function
function darkenColor(r, g, b, percentage) {
    const factor = (100 - percentage) / 100;
    return {
        r: Math.floor(r * factor),
        g: Math.floor(g * factor),
        b: Math.floor(b * factor)
    };
}

// Box generator function
function generateBox(userInput) {
    const container = document.getElementById('container');
    const para = document.getElementById('para');

    container.innerHTML = "";
    container.classList.add("container");


    userInput = parseInt(userInput);

    if (isNaN(userInput)|| userInput < 1 || userInput > 100) {
        para.textContent = "Number must not exceed 100!";
        para.style.color = "red";
        return;
    } else {
        para.textContent = `${userInput} x ${userInput} grid created - start coloring`;
        para.style.color = "green";
    }

    // Container and Box size calculator
    const totalboxes = userInput * userInput;
    const gap = 2;
    const containerSize = 960;
    const totalGapSize = (userInput - 1) * gap;
    const boxSize = (containerSize - totalGapSize) / userInput;

    container.style.gap = `${gap}px`;

    // Iterator based on user input
    for (let i = 0; i < totalboxes; i++) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.style.width = `${boxSize}px`;
        box.style.aspectRatio = ' 1 / 1';

        box.dataset.interactions = '0';
        box.dataset.originalR = '';
        box.dataset.originalG = '';
        box.dataset.originalB = '';

        // Event Listener to keep track of the boxes and darken them
       box.addEventListener('mouseenter', function() {
        let interactions = parseInt(this.dataset.interactions);

        if(interactions === 0) {
            const randomColor = getRandomColor();
            this.dataset.originalR = randomColor.r;
            this.dataset.originalG = randomColor.g;
            this.dataset.originalB = randomColor.b;

            this.style.backgroundColor = `rgb(${randomColor.r}, ${randomColor.g}, ${randomColor.b})`;
        }
        else if(interactions < 10) {
            const originalR = parseInt(this.dataset.originalR);
            const originalG = parseInt(this.dataset.originalG);
            const originalB = parseInt(this.dataset.originalB);

            const darkenedColor = darkenColor(originalR, originalG, originalB, interactions * 10);

            this.style.backgroundColor = `rgb(${darkenedColor.r}, ${darkenedColor.g}, ${darkenedColor.b})`;
        }

        if(interactions < 10) {
            this.dataset.interactions = interactions + 1;
        }

        this.style.transform = 'scale(0.95)';
       });


       box.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
       });

    //    Puts everything in a div 
        container.appendChild(box);
    }
}

const Input = document.getElementById('Input');
const btn = document.getElementById('btn');

// Sets the generate button to create the grids when clicked
btn.addEventListener('click', () => {
const userInput = Input.value;
generateBox(userInput);
});

// Allows the enter key to generate the grid when pressed
Input.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {

        const userInput = Input.value;
        generateBox(userInput);

    }
});

// Optional display of a grid when the site loads
window.addEventListener('load', () => {
    generateBox(16);
});