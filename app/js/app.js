// Create an Odd Diamond
const printDiamond = size => {
    const outputContainer = document.getElementById(`diamond-container`);
    outputContainer.innerHTML = ``;
    if (size % 2 !== 0) {
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
        // Top single asterisk
        outputContainer.innerHTML += `<div>${` `.repeat(size - 1)}* </div>`;
        let space = size / 2;
        let stars = 1;
        // Upper half
        for (let i = 0; i < size / 2; i++) {
            const starRow = `* `.repeat(stars - 1);
            if (starRow) {
                outputContainer.innerHTML += `<div>${` `.repeat(space * 2)}${starRow}</div>`;
            }
            space--;
            stars += 2;
        }
        // Lower half
        for (let i = 0; i < size / 2; i++) {
            const starRow = `* `.repeat(stars - 1);
            if (starRow) {
                outputContainer.innerHTML += `<div>${` `.repeat(space * 2)}${starRow}</div>`;
            }
            space++;
            stars -= 2;
        }
        // Bottom single asterisk
        outputContainer.innerHTML += `<div>${` `.repeat(size - 1)}* </div>`;
    }
};

// Prompt the user for the diamond size
const answer = window.prompt(`Enter the size of your diamond as a number.`);
const size = parseInt(answer, 10);

// Validate and generate the Diamond
if (isNaN(size) || size < 1) {
    window.alert(`Please reload and enter a positive integer.`);
} else {
    printDiamond(size);

    // Slide the container left to right
    const outputContainer = document.getElementById(`diamond-container`);
    let pos = parseInt(window.getComputedStyle(outputContainer).left, 10);
    if (isNaN(pos)) pos = 0;
    const speed = 2.5;
    let dir = 1;
    const slide = () => {
        pos += speed * dir;
        const max = window.innerWidth - outputContainer.offsetWidth;
        if (pos <= 0) {
            pos = 0;
            dir = 1;
        } else if (pos >= max) {
            pos = max;
            dir = -1;
        }
        outputContainer.style.left = `${pos}px`;
        window.requestAnimationFrame(slide);
    };

    // Start the sliding animation
    window.requestAnimationFrame(slide);
}
