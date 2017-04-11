
Pong.Preload = function ()
{

};

Pong.Preload.prototype = {

  preload: function ()
  {
    this.load.image('wall', 'assets/images/wall.png');
    this.load.image('centerLine', 'assets/images/centerLine.png');
    this.load.image('ball', 'assets/images/ball.png');
    this.load.image('paddle.png', 'assets/images/paddle.png');

    this.time.advancedTiming = true;

    this.physics.startSystem(Phaser.Physics.ARCADE);
  },

  create: function ()
  {
    this.state.start('game');
  }
};