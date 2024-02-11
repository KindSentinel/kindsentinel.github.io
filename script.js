const explanations = [
    "because we prioritize your security.",
    "because trust is our foundation.",
    "because your privacy matters.",
    "because we inspire a secure future.",
    "because innovation drives our solutions."
];

const mottoElement = document.getElementById('motto');
let currentExplanationIndex = 0;
let currentExplanation = explanations[currentExplanationIndex];
let charIndex = 0;

function typeWriter() {
    if (charIndex < currentExplanation.length) {
        mottoElement.innerHTML += currentExplanation.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 50);
    } else {
        setTimeout(eraseExplanation, 1500);
    }
}

function eraseExplanation() {
    if (charIndex > 0) {
        mottoElement.innerHTML = mottoElement.innerHTML.slice(0, -1);
        charIndex--;
        setTimeout(eraseExplanation, 50);
    } else {
        currentExplanationIndex = (currentExplanationIndex + 1) % explanations.length;
        currentExplanation = explanations[currentExplanationIndex];
        setTimeout(typeWriter, 500);
    }
}

// Start the typing animation
typeWriter();