
Pong.Preload = function ()
{

};

Pong.Preload.prototype = {

  preload: function ()
  {
    this.load.image('wall', 'assets/images/wall.png');
    this.load.image('centerLine', 'assets/images/centerLine.png');
    this.load.image('ball', 'assets/images/ball.png');
    this.load.image('paddle', 'assets/images/paddle.png');
    
    this.load.bitmapFont('bigFont', 'assets/fonts/square64.png', 'assets/fonts/square64.fnt');
    this.load.bitmapFont('smallFont', 'assets/fonts/square24.png', 'assets/fonts/square24.fnt');

    this.load.audio('bounce', 'assets/sounds/bounce.mp3');

    this.time.advancedTiming = true;

    this.physics.startSystem(Phaser.Physics.ARCADE);
  },

  create: function ()
  {
    this.state.start('menu');
  }
};