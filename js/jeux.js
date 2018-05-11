
//Aliases
let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text;
    TextStyle = PIXI.TextStyle;
//Create a Pixi Application
let app = new Application({
        width: 1903,
        height: 900,
        antialiasing: true,
        transparent: false,
        resolution: 1
    }
);
time = 0;

let style = new TextStyle({
    fontFamily: "Arial",
    fontSize: 36,
    fill: "white",
    stroke: '#ff3300',
    strokeThickness: 4,
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6
});

let styledMessage = new Text(time, style);


//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

loader
    .add("media/naruto.png")
    .add("media/kunaille.png")
    .add("media/youlose.png")
    .load(setup);
    allo= true;
//Define any variables that are used in more than one function
var cat, state;

function setup() {

//Position it and add it to the stage
    styledMessage.position.set(54, 128);
    app.stage.addChild(styledMessage);

    //Create the enemy
    enemy = new Sprite(resources["media/kunaille.png"].texture);
    enemy.y = 96;
    enemy.x = 1903;
    enemy.vx = -20;
    enemy.vy = 0;
    app.stage.addChild(enemy);

    enemy1 = new Sprite(resources["media/kunaille.png"].texture);
    enemy1.y = 256;
    enemy1.x = 1903;
    enemy1.vx = -35;
    enemy1.vy = 0;
    app.stage.addChild(enemy1);

    enemy2 = new Sprite(resources["media/kunaille.png"].texture);
    enemy2.y = 512;
    enemy2.x = 1903;
    enemy2.vx = -30;
    enemy2.vy = 0;
    app.stage.addChild(enemy2);

    enemy3 = new Sprite(resources["media/kunaille.png"].texture);
    enemy3.y = 720;
    enemy3.x = 1903;
    enemy3.vx = -25;
    enemy3.vy = 0;
    app.stage.addChild(enemy3);

    //Create the `cat` sprite
    cat = new Sprite(resources["media/naruto.png"].texture);
    cat.y = 96;
    cat.vx = 0;
    cat.vy = 0;
    app.stage.addChild(cat);

    //Capture the keyboard arrow keys
    let left = keyboard(37),
        up = keyboard(38),
        right = keyboard(39),
        down = keyboard(40);

    //Left arrow key `press` method
    left.press = () => {
        //Change the cat's velocity when the key is pressed
        cat.vx = -10;
        cat.vy = 0;
    };

    //Left arrow key `release` method
    left.release = () => {
        //If the left arrow has been released, and the right arrow isn't down,
        //and the cat isn't moving vertically:
        //Stop the cat
        if (!right.isDown && cat.vy === 0) {
            cat.vx = 0;
        }
    };

    //Up
    up.press = () => {
        cat.vy = -10;
        cat.vx = 0;
    };
    up.release = () => {
        if (!down.isDown && cat.vx === 0) {
            cat.vy = 0;
        }
    };

    //Right
    right.press = () => {
        cat.vx = 10;
        cat.vy = 0;
    };
    right.release = () => {
        if (!left.isDown && cat.vy === 0) {
            cat.vx = 0;
        }
    };

    //Down
    down.press = () => {
        cat.vy = 10;
        cat.vx = 0;
    };
    down.release = () => {
        if (!up.isDown && cat.vx === 0) {
            cat.vy = 0;
        }
    };

    //Set the game state
    state = play;

    //Start the game loop
    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta){

if(allo){
    time += 1/60;
}

    app.stage.removeChild(styledMessage);
    styledMessage = new Text(time.toFixed(2), style);
    app.stage.addChild(styledMessage);



    enemy.x += enemy.vx;
    if(enemy.x < -enemy.width){
        enemy.x = 1903;
        enemy.y = enemy.y +150;
    }
    enemy1.x += enemy1.vx;
    if(enemy1.x < -enemy.width){
        enemy1.x = 1903;
        enemy1.y = enemy1.y +200;
    }
    enemy2.x += enemy2.vx;
    if(enemy2.x < -enemy.width){
        enemy2.x = 1903;
        enemy2.y = enemy2.y +100;
    }
    enemy3.x += enemy3.vx;
    if(enemy3.x < -enemy.width){
        enemy3.x = 1903;
        enemy3.y = enemy3.y +250;
    }

    if(enemy.y>900)
    {
        enemy.y = enemy.vy/2;
    }
    if(enemy1.y>900)
    {
        enemy1.y = enemy1.vy/2;
    }
    if(enemy2.y>900)
    {
        enemy2.y = enemy2.vy/2;
    }
    if(enemy3.y>900)
    {
        enemy3.y = enemy3.vy/2;
    }

    if (hitTestRectangle(cat,enemy)||hitTestRectangle(cat,enemy1)|| hitTestRectangle(cat,enemy2)||hitTestRectangle(cat,enemy3))
    {
        youlose()
    }

    //Update the current game state:
    state(delta);
}
function youlose() {

    if (allo){
        lose = new Sprite(resources["media/youlose.png"].texture);
        lose.y = 0;
        lose.x = 0;
        app.stage.addChild(lose);
        allo=false;
    }

}

function play(delta) {

    //Use the cat's velocity to make it move
    if(cat.x + cat.vx > 0){
        cat.x += cat.vx;
    }
    if(cat.y + cat.vy > 0 && cat.y + cat.vy < 900-cat.height) {
        cat.y += cat.vy;
    }
}


function hitTestRectangle(r1, r2) {

    //Define the variables we'll need to calculate
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

    //hit will determine whether there's a collision
    hit = false;

    //Find the center points of each sprite
    r1.centerX = r1.x + r1.width / 2;
    r1.centerY = r1.y + r1.height / 2;
    r2.centerX = r2.x + r2.width / 2;
    r2.centerY = r2.y + r2.height / 2;

    //Find the half-widths and half-heights of each sprite
    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;

    //Calculate the distance vector between the sprites
    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;

    //Figure out the combined half-widths and half-heights
    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;

    //Check for a collision on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {

        //A collision might be occuring. Check for a collision on the y axis
        if (Math.abs(vy) < combinedHalfHeights) {

            //There's definitely a collision happening
            hit = true;
        } else {

            //There's no collision on the y axis
            hit = false;
        }
    } else {

        //There's no collision on the x axis
        hit = false;
    }

    //`hit` will be either `true` or `false`
    return hit;
}



//The `keyboard` helper function
function keyboard(keyCode) {
    var key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };

    //The `upHandler`
    key.upHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
    };

    //Attach event listeners
    window.addEventListener(
        "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
        "keyup", key.upHandler.bind(key), false
    );
    return key;
}