
Pong.Menu = function ()
{
  this.keyIsDown = false;
};

Pong.Menu.prototype = {

  create: function ()
  {
    Pong.onePlayer = true;

    // add all the text on the screen
    this.pongText = this.add.bitmapText(this.world.centerX, 50, 'bigFont', 'PONG', 128);
    this.pongText.anchor.set(0.5, 0);

    // on player is selected on start so it get scaled bigger
    this.onePlayerText = this.add.bitmapText(this.world.centerX - 100, 300, 'bigFont', '1 Player', 32);
    this.onePlayerText.anchor.set(0.5);
    this.onePlayerText.scale.set(2);
    
    this.twoPlayerText = this.add.bitmapText(this.world.centerX + 100, 300, 'bigFont', '2 Players', 32);
    this.twoPlayerText.anchor.set(0.5);

    this.bounce = this.add.audio('bounce');

    var helpText = this.add.bitmapText(this.world.centerX, 370, 'smallFont', 'player one controls Up Arrow and Down Arrow', 18);
    helpText.anchor.set(0.5);

    var helpText2 = this.add.bitmapText(this.world.centerX, 390, 'smallFont', 'player two controls W and S', 18);
    helpText2.anchor.set(0.5);

    var helpText3 = this.add.bitmapText(this.world.centerX, 430, 'smallFont', 'Arrow Keys to select the number of players and Space to Start',  18);
    helpText3.anchor.set(0.5);

    var helpText4 = this.add.bitmapText(this.world.centerX, 460, 'smallFont', 'First to 5 points wins', 18);
    helpText4.anchor.set(0.5);
  },

  update: function ()
  {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    {
      this.bounce.play();
      this.state.start('game');
    }

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
      if (this.keyIsDown)
        return;
      
      // only change if the key was not down in the previous frame
      this.keyIsDown = true;

      // scale the correct text based on the new selection
      if (Pong.onePlayer)
      {
        this.onePlayerText.scale.set(1.0);
        this.twoPlayerText.scale.set(2.0);
        Pong.onePlayer = false;
      }
      else
      {
        this.onePlayerText.scale.set(2.0);
        this.twoPlayerText.scale.set(1.0);
        Pong.onePlayer = true;
      }
    }
    else
    {
      this.keyIsDown = false;
    }
  }
};