
Pong.Game = function ()
{

};

Pong.Game.prototype = {

  create: function ()
  {
    this.wallGroup = this.add.group();

    var topWall = this.wallGroup.create(0, 0, 'wall');
    topWall.anchor.set(0, 0.5);
    
    var bottomWall = this.wallGroup.create(0, this.world.height, 'wall');
    bottomWall.anchor.set(0, 0.5);

    var centerLine = this.add.sprite(this.world.centerX, 0, 'centerLine');
    centerLine.anchor.set(0.5, 0);

    
    this.leftScore = this.add.bitmapText(this.world.centerX - 20, 24, 'scoreFont', '0', 64);
    this.leftScore.anchor.set(1, 0);
    
    this.rightScore = this.add.bitmapText(this.world.centerX + 20, 24, 'scoreFont', '0', 64);
    
  },

  update: function ()
  {

  },

  render: function ()
  {
    this.game.debug.text(this.time.fps || '--', 2, 14, '#00CC00');
  },

  shutdown: function ()
  {

  }
};