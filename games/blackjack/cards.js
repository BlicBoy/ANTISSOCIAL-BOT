const { createCanvas, loadImage } = require("canvas"); 
const { log } = require("../../utils/winston");
const path = require('path');
const fs = require('fs');


//Stupid Logic to generate deck and images

const cardValues = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 
    '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': 11
};

const width = 200;  // Largura da carta
const height = 300; // Altura da carta
const borderRadius = 20; // Raio das bordas arredondadas
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

let deck = [];

async function generateDeck() {
    const suits = ['♠️', '♥️', '♣️', '♦️'];
    for (let suit of suits) {
        for (let card in cardValues) {
            deck.push(`${card}${suit}`);
        }
    }
    deck.sort(() => Math.random() - 0.5);
    log.info('Deck generated' + deck);
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

function drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
  }

async function drawImageCard(rank, suit) {
    try {
        // Desenhar o fundo da carta
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);

        // Desenhar bordas arredondadas
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 5;
        drawRoundedRect(ctx, 0, 0, width, height, borderRadius);
        ctx.stroke();

        ctx.fillStyle = suit === '♥️' || suit === '♦️' ? '#FF0000' : '#000000';
        ctx.font = 'bold 40px Arial';

        // Desenhar o rank nos cantos
        ctx.fillText(rank, 20, 50);
        ctx.fillText(rank, width - 40, height - 10);

        // Desenhar o símbolo do naipe no centro
        ctx.font = 'bold 60px Arial';
        const suitSymbol = suit;
        const textMetrics = ctx.measureText(suitSymbol);
        const x = (width - textMetrics.width) / 2;
        const y = (height + textMetrics.actualBoundingBoxAscent) / 2;

        ctx.fillText(suitSymbol, x, y);

        // Salvar a imagem no diretório cardsImage
        fs.writeFileSync(`./cardsImage/${rank}-${suit}.png`, canvas.toBuffer());
        log.info('Imagem criada com sucesso!');
        return true;
    } catch (error) {
        log.error('Error on drawImageCard -> ' + error);
        return false;
    }
}

module.exports =  { deck, generateDeck, calculateHand, drawCard, drawAsciiCard, drawImageCard }