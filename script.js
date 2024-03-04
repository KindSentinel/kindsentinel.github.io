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

async function walletCardMaker() {
    fetch("./wallets.json").then(response => response.json()).then(data => {
        for (const { name, network, address } of data) {
            walletCardWriter(`<div class="wallet">
    <div class="wallet-name">${name}</div>
    <div class="wallet-network">${network}</div>
    <div class="wallet-address">${address}</div>
</div>`);
        }



    }).catch(err => console.error("Error occured : " + err)).finally(async () => {
        await eventAdder();

    });
}

function walletCardWriter(walletComp) {
    document.querySelector(".wallets-wrapper").innerHTML += walletComp;
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

async function eventAdder() {
    let elements = document.querySelectorAll('.wallet-address');
    for (const element of elements) {
        ["click", "touchend", "touchcancel"].forEach(event => element.addEventListener(event, async (e) => {
            await navigator.clipboard.writeText(element.innerHTML);
            alert("Address was copied to your clipbaord")
        }, false));
    }

}


async function Main() {
    // Start the typing animation
    typeWriter();

    await walletCardMaker();

}

Main();