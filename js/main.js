
window.onload = function ()
{
  // setup the game
  var game = new Phaser.Game(640, 480, Phaser.AUTO, 'gameContainer');

  // add all the game states
  game.state.add('boot', Pong.Boot);
  game.state.add('preload', Pong.Preload);
  game.state.add('menu', Pong.Menu);
  game.state.add('game', Pong.Game);

  game.state.start('boot');
};