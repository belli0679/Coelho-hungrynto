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


function preload(){
  fundoground = loadImage("./Imagens/background.png");
  aguamelon = loadImage("./Imagens/melon.png");
  bunnelho = loadImage("./Imagens/Rabbit-01.png");
}

function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
 
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

  coebbit = createSprite(250, 650, 100, 100);
  coebbit.addImage(bunnelho);
  coebbit.scale = 0.2;

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

  image(aguamelon,fruty.position.x, fruty.position.y, 60, 60);

  drawSprites();

}


function dropar(){

  corda.break();
  linkgacao.detachar();
  linkagacao = null;

}