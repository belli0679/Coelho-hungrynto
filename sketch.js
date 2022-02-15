const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var ground;

var corda;

var fruty;

var linkgacao;

var fundoground, aguamelon, bunnelho, cuttar;

var coebbit;

var coeblink, coeat;

var sadbbit;


function preload(){
  fundoground = loadImage("./Imagens/background.png");
  aguamelon = loadImage("./Imagens/melon.png");
  bunnelho = loadImage("./Imagens/Rabbit-01.png");
  coeblink = loadAnimation("./Imagens/blink_1.png","./Imagens/blink_2.png","./Imagens/blink_3.png");
  coeat = loadAnimation("./Imagens/eat_0.png","./Imagens/eat_1.png","./Imagens/eat_2.png",
                        "./Imagens/eat_3.png","./Imagens/eat_4.png");

  sadbbit = loadAnimation("./Imagens/sad_1.png", "./Imagens/sad_2.png", "./Imagens/sad_3.png");

  coeblink.playing = true;
  coeat.playing = true;
  coeat.looping = false;
  sadbbit.looping = false;
}

function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;

  coeblink.frameDelay = 15;
  coeat.frameDelay = 20;
 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50)

  var fruty_options = {
    density: 0.001
  }

  ground = new Ground(200, 690, 600,20);

  corda = new Rope(6, {x: 245, y: 30});

  fruty = Bodies.circle(300, 300, 15, fruty_options);
  Matter.Composite.add(corda.body, fruty);

  linkgacao = new LinkFruty(corda, fruty);

  coebbit = createSprite(250, 620, 100, 100);
  coebbit.addImage(bunnelho);
  coebbit.scale = 0.2;
  coebbit.addAnimation("piscando", coeblink);
  coebbit.addAnimation("comendo", coeat);
  coebbit.addAnimation("triste", sadbbit);
  coebbit.changeAnimation("piscando");

  cuttar = createImg("./Imagens/cut_button.png");
  cuttar.position(220, 30);
  cuttar.size(50, 50);
  cuttar.mouseClicked(dropar);

}

function draw() 
{
  background(51);
  image(fundoground, width/2, height/2, 500, 700);

  Engine.update(engine);
   
  ground.moslay();

  corda.show();

  if(fruty !== null){  

    image(aguamelon,fruty.position.x, fruty.position.y, 60, 60);
  }

  if(colideu(fruty, coebbit) === true){

    coebbit.changeAnimation("comendo");
  }

  if(colideu(fruty, ground.body) === true){

    coebbit.changeAnimation("triste");
  }

  drawSprites();

}


function dropar(){

  corda.break();
  linkgacao.detachar();
  linkagacao = null;

}

function colideu(body, sprite){

  if(body !== null){
    var didy = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if(didy <= 80){
      World.remove(engine.world, fruty);
      fruty = null;
      return true;

    } else{
      return false;

    }
  }
}