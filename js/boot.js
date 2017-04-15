
var Pong = {
  // this is used to check how many human players will be in the game
  // declaring it here to make sure I can use it in all states.
  onePlayer: true
};

Pong.Boot = function ()
{

};

Pong.Boot.prototype = {

  preload: function ()
  {
    // center the game horizonally on the papge
    this.scale.pageAlignHorizontally = true;
  },

  create: function ()
  {
    this.state.start('preload');
  }
};