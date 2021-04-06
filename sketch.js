var playerImage,player;
var EnemyImage,Enemy, backgroundImage,Background;
var bulletImage,tempbullet,bullet,Enemy1Group,Enemy2Group,Enemy3Group,bulletGroup;
var score=0;
var heartImage,heart1,heart2,heart3;
var count=4;
var gameoverImage,gameover;
var restartImage,restart;
var gameState="play"
var coinImage,coin,coin1Group,coin2Group,coin3Group;
var countEnemy=1;
var countcoin=1;
function preload(){

  playerImage = loadImage("Player.png");
  EnemyImage = loadImage("Enemy.png");
  backgroundImage  = loadImage("Background.jpg");
  bulletImage = loadImage("Bullet.png");
  heartImage = loadImage("Heart.png")
  restartImage = loadImage("Reset.png");
  gameoverImage = loadImage("Gameover.png");
  coinImage = loadImage("Coin.png");
  
}

function setup() {
  createCanvas(500,400);

  Background = createSprite(200,200,10,10);
  Background.addImage(backgroundImage);
  Background.scale=1;
  
  
  player = createSprite(50,200,20,50);
  player.addImage(playerImage);
  player.scale=0.04;
  
  heart1 = createSprite(40,50,20,50);
  heart1.addImage(heartImage);
  heart1.scale=0.1;
  heart1.depth=player.depth-1;
  
  heart2 = createSprite(65,50,20,50);
  heart2.addImage(heartImage);
  heart2.scale=0.1;
  heart2.depth=player.depth-1;
  
  heart3 = createSprite(90,50,20,50);
  heart3.addImage(heartImage);
  heart3.scale=0.1;
  heart3.depth=player.depth-1;
  
  gameover = createSprite(250,200,10,10);
  gameover.addImage(gameoverImage);
  gameover.scale=0.3;
  
  restart = createSprite(250,265,10,10);
  restart.addImage(restartImage);
  restart.scale=0.2;
  
  Enemy1Group=createGroup();
  Enemy2Group=createGroup();
  Enemy3Group=createGroup();
  
  bulletGroup=createGroup();
  coin1Group=createGroup();
  coin2Group=createGroup();
  coin3Group=createGroup();
}

function draw() {
  background(180);
  Background.velocityX=-2;
  if(gameState==="play")
  {
    gameover.visible=false;
    restart.visible=false;
    spawnEnemys();
    spawncoins();
    player.setCollider("rectangle", 0,10,145,130);
    if(keyDown("up")&&player.y>30){
       player.y = player.y - 8;
    }
    if(keyDown("down")&&player.y<370){
       player.y = player.y + 8;
    }
    if(keyWentDown("space")){
       temp=Bullet(); 
    }
    if(bulletGroup.isTouching(Enemy1Group)){
      bulletGroup.destroyEach();
      Enemy1Group.destroyEach();
      score=score+1;   
    }
    if(bulletGroup.isTouching(Enemy2Group)){
      bulletGroup.destroyEach();
      Enemy2Group.destroyEach();
      score=score+1;   
    }
    if(bulletGroup.isTouching(Enemy3Group)){
      bulletGroup.destroyEach();
      Enemy3Group.destroyEach();
      score=score+1;   
    }
    if(player.isTouching(coin1Group)){
      coin1Group.destroyEach();
      score=score+1;   
    }
    if(player.isTouching(coin2Group)){
      coin2Group.destroyEach();
      score=score+1;   
    }
    if(player.isTouching(coin3Group)){
      coin3Group.destroyEach();
      score=score+1;   
    }
    if(player.isTouching(Enemy1Group)){
      Enemy1Group.destroyEach();
      count=count-1;
      if(count===3)
      {
          heart3.visible=false;
      }
      if(count===2)
      {
          heart2.visible=false;
      }
      if(count===1)
      {
          heart1.visible=false;
          gameState="End"
      }
    }
    if(player.isTouching(Enemy2Group)){
      Enemy2Group.destroyEach();
      count=count-1;
      if(count===3)
      {
          heart3.visible=false;
      }
      if(count===2)
      {
          heart2.visible=false;
      }
      if(count===1)
      {
          heart1.visible=false;
          gameState="End"
      }
    }  
    if(player.isTouching(Enemy3Group)){
      Enemy3Group.destroyEach();
      count=count-1;
      if(count===3)
      {
          heart3.visible=false;
      }
      if(count===2)
      {
          heart2.visible=false;
      }
      if(count===1)
      {
          heart1.visible=false;
          gameState="End"
      }
    }
  }   
  if(Background.x<0){
    Background.x=Background.width/2;
  }
  drawSprites();
  fill("lightgreen");
  textSize(22);
  text("Score: "+score,20,350)
  
  if(gameState==="End"){
    Enemy.velocityX=0;
    player.visible=false;
    Background.velocityX=0;
    gameover.visible=true;
    restart.visible=true;
    coin1Group.destroyEach();
    coin2Group.destroyEach();
    coin3Group.destroyEach();
    bulletGroup.destroyEach();
    Enemy1Group.destroyEach();
    Enemy2Group.destroyEach();
    Enemy3Group.destroyEach();
  }
  if(mousePressedOver(restart)&&gameState==="End"){
    reset();
  }
}
function Bullet()
{
  bullet=createSprite(90,200,10,10);
  bullet.addImage(bulletImage);
  bullet.scale=0.175;
  bullet.y=player.y+5;
  bullet.velocityX=10;
  bullet.lifetime=50;
  bulletGroup.add(bullet);
}

function spawnEnemys(){
  if(frameCount%80===0){
     Enemy = createSprite(470,Math.round(random(40,380))) 
     Enemy.addImage(EnemyImage);
     Enemy.scale=0.07;
     Enemy.velocityX=-(3+(score/4))
     Enemy.lifetime=166.66;
     if(countEnemy===1)
     {
       countEnemy=countEnemy+1;
       Enemy1Group.add(Enemy);
     }
     else if(countEnemy===2)
     {
       countEnemy=countEnemy+1;
       Enemy2Group.add(Enemy);
     }
     else
     {
        Enemy3Group.add(Enemy);
        countEnemy=1;
     }
  
  }
}
function spawncoins(){
  if(frameCount %60===0){
    coin=createSprite(470,Math.round(random(30,370)))
    coin.addImage(coinImage);
    coin.scale=0.1;
    coin.velocityX=-4;
    coin.lifetime=250;
    
    if(countcoin===1)
     {
       countcoin=countcoin+1;
       coin1Group.add(coin);
     }
     else if(countcoin===2)
     {
       countcoin=countcoin+1;
       coin2Group.add(coin);
     }
     else
     {
        coin3Group.add(coin);
        countcoin=1;
     }
  }
}

function reset(){
   gameState="play"
   score=0;
   gameover.visible=false;
   restart.visible=false;
   player.visible=true;
   player.y=200;
   heart1.visible=true;
   heart2.visible=true;
   heart3.visible=true;
   count=4;
}