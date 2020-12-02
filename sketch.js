var dog,dogImg,hdogImg,database,foodS,foodStock
var fedTime,lastFed,feed,addFoodS,FoodObj
var bedRoomImg,GardenImg,WashRoomImg,sadDogImg

function preload()
{

  dogImg = loadImage("images/dogImg.png")
  hdogImg = loadImage("images/dogImg1.png")
  bedRoomImg = loadImage("images/Bed Room.png")
  GardenImg = loadImage("images/Garden.png")
  WashRoomImg = loadImage("images/Wash Room.png")
  sadDog
 
}

function setup() {
  database = firebase.database ()
  createCanvas(1000, 500);
  dog = createSprite(250,300,150,150)
  dog.addImage (dogImg)
  dog.scale = 0.1
  foodStock = database.ref ("Food")
  foodStock.on ("value",readStock)

  FoodObj = new Food()
  feed = createButton("FEED THE DOG")
  feed.position (700,100)
  feed.mousePressed (feedDog)

  addFood = createButton("ADD FOOD")
  addFood.position (800,100)
  addFood.mousePressed (addFoodS)

  

  

}


function draw() { 
  currentTime = hour ();
  if(currentTime ==(lastFed+1)){
    update("Playing");
    FoodObj.garden();
  } 
  else if (currentTime == (lastFed+2)){
    update("Sleeping")
    FoodObj.bedroom();
  }
  else if (currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
    FoodObj.washroom();
  }
  else {
    update ("Hungry")
    foodObk.display  ();
  }
if (gameState!= "Hungry"){
  feed.hide();
  addFood.hide();
  dog.remove();
}
else{
  feed.show()
  addFood.show();
  dog.addImage(sadDog)

}
  drawSprites();
}


function readStock (data) {
  foodS = data.val();
  FoodObj.updatefoodStock (foodS)
}


function feedDog () {
  dog.addImage(hdogImg);

  FoodObj.updatefoodStock (FoodObj.getfoodStock()-1);
  database.ref('/').update ({
    Food:FoodObj.getfoodStock(),
    fedTime:hour ()
  })
}

function addFoodS (){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}