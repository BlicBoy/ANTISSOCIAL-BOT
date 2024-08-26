
//Stupid Logic to generate deck and images

const cardValues = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 
    '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': 11
};

let deck = [];

async function generateDeck() {
    const suits = ['♠️', '♥️', '♣️', '♦️'];
    for (let suit of suits) {
        for (let card in cardValues) {
            deck.push(`${card}${suit}`);
        }
    }
    deck.sort(() => Math.random() - 0.5);
}

function calculateHand(hand) {
    let value = 0;
    let aceCount = 0;
    for (let card of hand) {
        let cardValue = card.slice(0, -1);
        value += cardValues[cardValue];
        if (cardValue === 'A') aceCount++;
    }
    while (value > 21 && aceCount) {
        value -= 10;
        aceCount--;
    }
    return value;
}

function drawCard(deck, hand) {
    hand.push(deck.pop());
}

function drawAsciiCard(card) {
    let rank = card.slice(0, -1);
    let suit = card.slice(-1);
    return `
    +-----+
    |${rank.padEnd(2)}   |
    |  ${suit}  |
    |   ${rank.padStart(2)}|
    +-----+`;
}

module.exports =  { deck, generateDeck, calculateHand, drawCard, drawAsciiCard }