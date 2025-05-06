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

    // Create an Even Diamond
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

// Hide any input or button elements
document.querySelectorAll(`input, button`).forEach(el => el.style.display = `none`);

// Prompt the user for the diamond size
const answer = window.prompt(`Enter the size of your diamond as a number.`);
const size = parseInt(answer, 10);

// Validate and generate the Diamond
if (isNaN(size) || size < 1) {
    window.alert(`Please reload and enter a positive integer.`);
} else {
    let outputContainer = document.getElementById(`diamond-output`);
    if (!outputContainer) {
        outputContainer = document.createElement(`pre`);
        outputContainer.id = `diamond-output`;
        document.getElementById(`diamond-container`).appendChild(outputContainer);
    }
    printDiamond(size);
}
