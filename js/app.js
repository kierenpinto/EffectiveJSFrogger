// Enemies our player must avoid
var Enemy = function(start_pos_x) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = start_pos_x*-200;
    this.y = 60 + Math.round(Math.random()*2)*83;
    this.speed = 100;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed*dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(){
    this.x = 200;
    this.y = 320;
    this.speed_horz = 101;
    this.speed_vert = 83;
    this.x_thres_abs = 2;
    this.y_thres_top = 4;
    this.y_thres_bot = -1;
    this.xpos = 0;
    this.ypos = 0;
    this.xmove = 0;
    this.ymove = 0;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput= function(key) {
    if (key == 'left'){
        if(this.xpos<this.x_thres_abs){
            this.xmove = -this.speed_horz;
            this.ymove = 0;
            this.xpos++;
        }
    }
    else if (key == 'right'){
        if(this.xpos>-this.x_thres_abs){
            this.xmove = this.speed_horz;
            this.ymove = 0;
            this.xpos--;
        }  
    }
    else if (key == 'up'){
        if (this.ypos < this.y_thres_top){
            this.ymove = -this.speed_vert;
            this.xmove = 0;
            this.ypos++;
        }
    }
    else if (key == 'down'){
        if (this.ypos > this.y_thres_bot){
            this.ymove = this.speed_vert;
            this.xmove = 0;
            this.ypos--;
        }
    }
    else {
        this.xmove = 0;
        this.ymove = 0;
    }
};

Player.prototype.update = function(dt){
    this.x = this.x + this.xmove;
    this.y = this.y + this.ymove;
    this.xmove = 0;
    this.ymove = 0;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (i = 0; i < 2000; i++){
    allEnemies.push(new Enemy(i,49));
}
var player = new Player();




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);

});
