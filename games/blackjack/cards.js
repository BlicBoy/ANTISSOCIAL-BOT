const { createCanvas, loadImage } = require("canvas"); 
const { log } = require("../../utils/winston");
const path = require('path');


//Stupid Logic to generate deck and images

const cardValues = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 
    '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': 11
};

const width = 200;  // Largura da carta
const height = 300; // Altura da carta
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

//Not deleting this code may be necessary
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

async function drawImageCard(rank, suit) {
  try {
      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext('2d');
  
      // Desenhar o fundo da carta
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 5;
      ctx.strokeRect(0, 0, width, height);
  
      // Verificar e logar o caminho da imagem
      const imagePath = path.join(__dirname, 'cardsImage', `${suit}.png`);
      log.info('Loading image from:', imagePath);
      const suitImage = await loadImage(imagePath);
      ctx.drawImage(suitImage, width / 2 - 25, height / 2 - 25, 50, 50);
  
      // Escrever o valor da carta
      ctx.fillStyle = suit === 'hearts' || suit === 'diamonds' ? '#FF0000' : '#000000'; // Vermelho para copas e ouros
      ctx.font = 'bold 40px Arial';
      ctx.fillText(rank, 20, 50);
      ctx.fillText(rank, width - 40, height - 10);
  
      // Converter para buffer
      return canvas.toBuffer();
  } catch (error) {
    log.error('Create image error: ' + error)
  }
}

module.exports =  { deck, generateDeck, calculateHand, drawCard, drawAsciiCard, drawImageCard }