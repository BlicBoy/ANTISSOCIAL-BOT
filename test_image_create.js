const { createCanvas } = require('canvas');
const fs = require('fs');

const width = 200;
const height = 200;
const borderRadius = 20; // Raio das bordas arredondadas
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

const rank = 'A';  // Rank padrão é Ás
const suit = 'hearts';  // Naipe padrão é copas (hearts)
const suitsSymbols = {
    'hearts': '♥️',
    'diamonds': '♦️',
    'clubs': '♣️',
    'spades': '♠️'
};

function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

// Desenhar o fundo da carta
ctx.fillStyle = '#FFFFFF';
ctx.fillRect(0, 0, width, height);

// Desenhar bordas arredondadas
ctx.strokeStyle = '#000000';
ctx.lineWidth = 5;
drawRoundedRect(ctx, 0, 0, width, height, borderRadius);
ctx.stroke();

// Definir a cor para copas e ouros
ctx.fillStyle = suit === 'hearts' || suit === 'diamonds' ? '#FF0000' : '#000000';
ctx.font = 'bold 40px Arial';

// Desenhar o rank nos cantos
ctx.fillText(rank, 20, 50);
ctx.fillText(rank, width - 40, height - 10);

// Desenhar o símbolo do naipe no centro
ctx.font = 'bold 60px Arial';
const suitSymbol = suitsSymbols[suit];
const textMetrics = ctx.measureText(suitSymbol);
const x = (width - textMetrics.width) / 2;
const y = (height + textMetrics.actualBoundingBoxAscent) / 2;

ctx.fillText(suitSymbol, x, y);

// Salvar a imagem no diretório cardsImage
fs.writeFileSync(`./cardsImage/${rank}_${suit}.png`, canvas.toBuffer());
console.log('Imagem criada com sucesso!');
