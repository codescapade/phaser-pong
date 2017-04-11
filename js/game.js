
Pong.Game = function ()
{

};

Pong.Game.prototype = {

  create: function ()
  {
    this.wallGroup = this.add.group();

    var topWall = this.wallGroup.create(0, 0, 'wall');
    topWall.anchor.set(0, 0.5);
    
    var bottomWall = this.wallGroup.create(0, this.game.world.height, 'wall');
    bottomWall.anchor.set(0, 0.5);

    var centerLine = this.add.sprite(this.game.world.centerX, 0, 'centerLine');
    centerLine.anchor.set(0.5, 0);  
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