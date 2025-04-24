// Create an Odd Diamond
const printDiamond = size => {
    const outputContainer = document.getElementById(`diamond-output`);
    outputContainer.innerHTML = ``;
    if (size % 2 !== 0) {
        outputContainer.innerHTML += `<div>Diamond with a size of ${size}:</div>`;
        let space = Math.floor(size / 2);
        let stars = 1;
        // Upper half (including middle line)
        for (let i = 0; i < Math.floor(size / 2) + 1; i++) {
            outputContainer.innerHTML += `<div>${` `.repeat(space)}${`*`.repeat(stars)}</div>`;
            space--;
            stars += 2;
        }
        // Lower half
        space = 1;
        stars = size - 2;
        for (let i = 0; i < Math.floor(size / 2); i++) {
            outputContainer.innerHTML += `<div>${` `.repeat(space)}${`*`.repeat(stars)}</div>`;
            space++;
            stars -= 2;
        }

    //Create an Even Diamond
    } else {
        outputContainer.innerHTML += `<div>Diamond with a size of ${size}:</div>`;
        // Top single asterisk
        outputContainer.innerHTML += `<div>${` `.repeat(size - 1)}* </div>`;
        let space = size / 2;
        let stars = 1;
        // Upper half
        for (let i = 0; i < size / 2; i++) {
            outputContainer.innerHTML += `<div>${` `.repeat(space * 2)}${`* `.repeat(stars - 1)}</div>`;
            space--;
            stars += 2;
        }
        // Lower half
        for (let i = 0; i < size / 2; i++) {
            outputContainer.innerHTML += `<div>${` `.repeat(space * 2)}${`* `.repeat(stars - 1)}</div>`;
            space++;
            stars -= 2;
        }
        // Bottom single asterisk
        outputContainer.innerHTML += `<div>${` `.repeat(size - 1)}* </div>`;
    }
};

// build the UI inside #diamond-container
const container = document.getElementById(`diamond-container`);

const sizeInput = document.createElement(`input`);
sizeInput.id = `size-input`;
sizeInput.type = `text`;
sizeInput.placeholder = `Enter diamond size`;

const generateButton = document.createElement(`button`);
generateButton.id = `generate-btn`;
generateButton.textContent = `Generate`;

const outputContainer = document.createElement(`pre`);
outputContainer.id = `diamond-output`;

container.appendChild(sizeInput);
container.appendChild(generateButton);
container.appendChild(outputContainer);

generateButton.addEventListener(`click`, () => {
    const size = parseInt(sizeInput.value, 10);
    if (!isNaN(size)) {
        printDiamond(size);
    } else {
        outputContainer.innerHTML = `<div>Error, please enter a number</div>`;
    }
});
