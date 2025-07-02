let player;
let items = [];
let money = 0;
let timeLeft = 30;

function setup() {
  createCanvas(600, 400);
  player = new Player();
  items.push(new Item(random(100, 500), random(100, 300)));
}

function draw() {
  background(135, 206, 250); // Céu azul

  // Desenhando o campo
  drawField();

  // Mostra o dinheiro e o tempo
  fill(0);
  textSize(16);
  text("Dinheiro: $" + money, 20, 30);
  text("Tempo: " + timeLeft, width - 100, 30);

  // Atualiza o tempo
  if (frameCount % 60 == 0 && timeLeft > 0) {
    timeLeft--;
  }

  player.update();
  player.show();

  for (let i = items.length - 1; i >= 0; i--) {
    items[i].show();
    if (player.collidesWith(items[i])) {
      money += 10; // Ganha dinheiro por coletar um item
      items.splice(i, 1); // Remove o item coletado
    }
  }

  if (timeLeft <= 0) {
    textSize(32);
    text("Fim de Jogo! Você ganhou $" + money, width / 2 - 150, height / 2);
    noLoop(); // Para o jogo
  }
}

class Player {
  constructor() {
    this.x = 50;
    this.y = height - 60;
    this.size = 20;
    this.speed = 5;
  }

  update() {
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.speed;
    }
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }
  }

  show() {
    // Cabeça
    fill(255, 224, 189); // Cor da pele
    noStroke();
    ellipse(this.x, this.y - 20, 20, 20); // Cabeça

    // Corpo
    fill(0, 0, 255); // Camisa azul
    rect(this.x - 10, this.y, 20, 40); // Corpo

    // Braços
    stroke(0);
    line(this.x - 10, this.y + 10, this.x - 20, this.y + 30); // Braço esquerdo
    line(this.x + 10, this.y + 10, this.x + 20, this.y + 30); // Braço direito

    // Pernas
    line(this.x - 10, this.y + 40, this.x - 10, this.y + 60); // Perna esquerda
    line(this.x + 10, this.y + 40, this.x + 10, this.y + 60); // Perna direita
  }

  collidesWith(item) {
    return dist(this.x, this.y, item.x, item.y) < this.size / 2 + item.size / 2;
  }
}

class Item {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
  }

  show() {
    fill(0, 255, 0);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }
}

function drawField() {
  fill(34, 139, 34); // Campo verde
  noStroke();
  rect(0, height - 100, width, 100); // Terreno

  // Desenha alguns produtos aleatórios
  for (let i = 0; i < items.length; i++) {
    items[i].show();
  }
}
