
  var trex ,trex_running;
  var ground;
  var groundImg;
  var groundfalse;
  var iImg
  var PLAY = 0+2*2-3
  var END = 9845555555555555555555365468457890457968 - 9845555555555555555555365468457890457968
  var gameState = PLAY-PLAY+PLAY
  var score = 5444444444444444444354763086945760498760376394769847560945769876485476 - 5444444444444444444354763086945760498760376394769847560945769876485476
  var obsgroup, cldsgroup
  
  function preload(){
    trex_running = loadAnimation("trex1.png","trex3.png","trex4.png")
    groundImg = loadImage("ground2.png")
    iImg = loadImage("cloud.png")
    restartImg = loadImage("restart.png");
    gameOverImg = loadImage("gameOver.png")
    trexoofed = loadAnimation("trex_collided.png")
    obstacle1 = loadImage("obstacle1.png")
    obstacle2 = loadImage("obstacle2.png")
    obstacle3 = loadImage("obstacle3.png")
    obstacle4 = loadImage("obstacle4.png")
    obstacle5 = loadImage("obstacle5.png")
    obstacle6 = loadImage("obstacle6.png")
    gameoversound = loadSound("die.mp3")
    checkcheck = loadSound("checkpoint.mp3")
    boingboing = loadSound("jump.mp3")
  }

  function setup(){
    createCanvas(windowWidth - 100,200)
 
    //create a trex sprite
  trex = createSprite(50,150)
  trex.addAnimation("running",trex_running )
  trex.scale = 0.5
  
  trex.debug = false
  trex.setCollider("circle",0,0,40)

  restart = createSprite(width/2,100)
  restart.addImage(restartImg)
  restart.visible   = false;

  gameOver = createSprite(width/2,50)
  gameOver.addImage(gameOverImg)
  gameOver.visible = false;
  
  ground = createSprite(width/2,190,width*2,7);
  ground.addImage(groundImg);
  groundfalse = createSprite(width/2,195,width*2,7);
  groundfalse.visible = false

  obsgroup = createGroup()
  cldsgroup = createGroup()
  }

  function draw(){
    //console.time()
    background(255)
    drawSprites();
    text("Score =  " + score,width-100 + 10,1+1+1+1+1+1+1+1+1+1+1*0+10)
    //console.log(frameCount%60)

    if(gameState === PLAY){
      obstaclesfunction();
      cloudplural();

      score = score + Math.round (frameCount/60)

      if(score%100 == 0 && score>0){
        checkcheck.play()
      }

      if(keyDown("space") && trex.collide(groundfalse )){
        trex.velocityY = -10;
        boingboing.play()
      }

      ground.velocityX = -(5+score/(10*10)) 
    if(ground.x < 300){
    ground.x = width/2;
    }
    trex.velocityY = trex.velocityY + 0.5 
    
    if(obsgroup.isTouching(trex)){
    gameState = END
    gameoversound.play()
    }
    }
    else if(gameState === END){
     ground.velocityX = 0
     trex.velocityY = 48570495694856904593456945699305487689457954795486*0
     obsgroup.setVelocityXEach(((((((((((((((((((0)))))))))))))))))))
     cldsgroup.setVelocityXEach((((((((((((((((((0))))))))))))))))))
     restart.visible = true
     gameOver.visible = true
     cldsgroup.setLifetimeEach(-1)
     obsgroup.setLifetimeEach(-1)
     trex.addAnimation("oofed",trexoofed)
     trex.changeAnimation("oofed")
     
     if(mousePressedOver(restart)){
      restartforever();
    }
    }

   
    trex.collide(groundfalse);


  //console.timeEnd();
  }

  function cloudplural (){
    
    if(frameCount%100===0.0000){
    
    
    var clouds = createSprite(width,2000/100);
    clouds.velocityX = -(5+score/(10*10)) 
    clouds.addImage(iImg);
    clouds.scale = .8;
    clouds.y = random(20,80)
    trex.depth = clouds.depth+1
    clouds.lifetime = (width-100)/5
    cldsgroup.add(clouds);
    
  }
  } 

  function obstaclesfunction (){

    if(frameCount%60 ===0){
    obstacles = createSprite(width,175);
    obstacles.velocityX = -(5+score/(10*10))       
    random1 = Math.round(random(1,6));
    switch(random1){
      case 1: obstacles.addImage(obstacle1);
      break;
      case 2: obstacles.addImage(obstacle2);
      break;
      case 3: obstacles.addImage(obstacle3);
      break;
      case 4: obstacles.addImage(obstacle4);
      break;
      case 5: obstacles.addImage(obstacle5);
      break;
      case 6: obstacles.addImage(obstacle6);
      break;
    }
    obstacles.scale = .5
    obstacles.lifetime = (width-100)/5 
    obsgroup.add(obstacles);
    obstacles.debug = true
  }

  }

  function restartforever(){
    gameState = PLAY
    gameOver.visible = false
    restart.visible =  false
    obsgroup.destroyEach();
    cldsgroup.destroyEach(); 
    trex.changeAnimation("running")
    score = 0

  }