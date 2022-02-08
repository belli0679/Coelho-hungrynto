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

function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

  var fruty_options = {
    density: 0.001
  }

  ground = new Ground(200, 690, 600,20);

  corda = new Rope(6, {x: 245, y: 30});

  fruty = Bodies.circle(300, 300, 15, fruty_options);
  Matter.Composite.add(corda.body, fruty);

  linkgacao = new LinkFruty(corda, fruty);

}

function draw() 
{
  background(51);
  Engine.update(engine);
   
  ground.moslay();

  corda.show();

  ellipse(fruty.position.x, fruty.position.y, 15, 15);

}




