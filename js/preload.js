
Pong.Preload = function ()
{

};

Pong.Preload.prototype = {

  preload: function ()
  {
    // load the images
    this.load.image('wall', 'assets/images/wall.png');
    this.load.image('centerLine', 'assets/images/centerLine.png');
    this.load.image('ball', 'assets/images/ball.png');
    this.load.image('paddle', 'assets/images/paddle.png');
    
    // load the bitmap fonts
    this.load.bitmapFont('bigFont', 'assets/fonts/square64.png', 'assets/fonts/square64.fnt');
    this.load.bitmapFont('smallFont', 'assets/fonts/square24.png', 'assets/fonts/square24.fnt');

    // load the sound
    this.load.audio('bounce', 'assets/sounds/bounce.mp3');

    // this is used to display the fps properly
    this.time.advancedTiming = true;
    
    // using the arcade physics system because this game doens't need a lot of physics calculation
    this.physics.startSystem(Phaser.Physics.ARCADE);
  },

  create: function ()
  {
    this.state.start('menu');
  }
};