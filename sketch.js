
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  // to load the animations and to load image
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  // to create a canvas
  createCanvas(600, 600);
  

  //to declare a survival time
  var survivalTime=0;
  
  //creating monkey
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  
  // monkey.addImage(bananaImage)
  monkey.scale=0.1
  
  // to create a ground sprite,adding a velocity,making it     run infinitely and a console log for ground.X
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)

  // to create 2 groups food and obstacles respectively
  FoodGroup = new Group();
  obstaclesGroup = new Group();

  // to state the score as zero
  score = 0;
 
  
}


function draw() {
  //to create a background
  background(255);
  
  // to make the ground run infinitely 
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  
  //to make the monkey jump
  if(keyDown("space") ) {
    monkey.velocityY = -12;
  }
  
    //to give a monkey a condition of gravity  
    monkey.velocityY = monkey.velocityY + 0.8;
  
    // to make the monkey sprite collide with the ground  
    monkey.collide(ground);   
    
    spawnFood();
    spawnObstacles();
 
  drawSprites();
  
  // for giving the stroke , textsize , fill and text
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);        
  
    // to give the condition of what shouid happen to the monkey if he touches the obstacles
    if(obstaclesGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
    
    
    }
  
  // for giving the stroke , textsize , fill , text and survival time
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);
}



function spawnFood() {
  //writing code to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
