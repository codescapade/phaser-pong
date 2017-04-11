var Pong = {

};

Pong.Boot = function ()
{

};

Pong.Boot.prototype = {

  preload: function ()
  {
    this.scale.pageAlignHorizontally = true;
  },

  create: function ()
  {
    this.state.start('preload');
  }
};