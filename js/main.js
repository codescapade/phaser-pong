window.onload = function ()
{
  var game = new Phaser.Game(640, 480, Phaser.CANVAS, 'gameContainer');

  game.state.add('boot', Pong.Boot);
  game.state.add('preload', Pong.Preload);
  game.state.add('menu', Pong.Menu);
  game.state.add('game', Pong.Game);

  game.state.start('boot');
};