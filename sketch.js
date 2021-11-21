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
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

var button,blower;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr,rope2;
// creating variables for code 
var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
var airblower;
var song;
function preload()
{
  
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  //loading sound to use in functions
  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(500,700);

  frameRate(80);
  //making background song play
  bk_song.play();
  //adjusting volume
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);

  
  rope = new Rope(7,{x:245,y:30});
  ground = new Ground(200,690,600,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(420,620,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  //creating image for airblower
  airblower = createImg("balloon.png");
  //giving position for airblower
  airblower.position(10,250);
  //resizing airblower
  airblower.size(150,100);
  //calling arnav function when mouse clicks
  airblower.mouseClicked(arnav);
  //creating image to mute the song
  song = createImg("mute.png");
  //giving position to the image
  song.position(450,20);
  //giving image size
  song.size(50,50);
  //calling basketball function when mous clicked
  song.mouseClicked(basketball);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,490,690);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    //making eating sound play when bunny is eating
    eating_sound.play();
  }


  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    //making song stop when the bunny is crying/lost the game
    bk_song.stop();
    //making sad sound play when bunny is crying
    sad_sound.play();
    fruit=null;
     
   }
   
}

function drop()
{
  //making cut sound play when rope is cut
  cut_sound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
  
}


function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}
//creating function for airblower to apply force
function arnav(){
  //applying force for air on fruit at x/y positions with x force 
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0});
  //making air play when called/clicked
  air.play()
}
//creating function for background song
function basketball(){
  //when backgrounf song is playing it should stop
  if(bk_song.isPlaying()){
    bk_song.stop();
    
  }
  //otherwise make song play
  else{
    bk_song.play();
  }
}


