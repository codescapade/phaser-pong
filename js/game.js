
Pong.Game = function ()
{
  this.paddleSpeed = 7;
  this.aiSpeed = 5;

  this.wallOffset = 56;

  this.speed;
  this.maxSpeed = 400;

  this.winScore = 5;
};

Pong.Game.prototype = {

  create: function ()
  {
    this.started = false;

    this.leftScore = 0;
    this.rightScore = 0;

    this.leftHasScored = true;

    this.gameEnded = false;

    this.speed = this.maxSpeed;
    this.wallGroup = this.add.group();

    var topWall = this.wallGroup.create(0, 0, 'wall');
    topWall.anchor.set(0, 0.5);
    
    var bottomWall = this.wallGroup.create(0, this.world.height, 'wall');
    bottomWall.anchor.set(0, 0.5);

    this.centerLine = this.add.sprite(this.world.centerX, 0, 'centerLine');
    this.centerLine.anchor.set(0.5, 0);
 
    this.leftScoreText = this.add.bitmapText(this.world.centerX - 30, 24, 'bigFont', '0', 64);
    this.leftScoreText.anchor.set(1, 0);
    
    this.rightScoreText = this.add.bitmapText(this.world.centerX + 30, 24, 'bigFont', '0', 64);

    this.helpText = this.add.bitmapText(this.world.centerX, 430, 'smallFont', 'Press Space to launch', 18);
    this.helpText.anchor.set(0.5);
    
    this.leftPaddle = this.add.sprite(30, this.world.centerY, 'paddle');
    this.leftPaddle.anchor.set(0.5);

    this.rightPaddle = this.add.sprite(this.world.width - 30, this.world.centerY, 'paddle');
    this.rightPaddle.anchor.set(0.5);

    this.ball = this.add.sprite(this.world.centerX, this.world.centerY, 'ball');
    this.ball.anchor.set(0.5);

    this.physics.enable([this.wallGroup, this.leftPaddle, this.rightPaddle, this.ball], Phaser.Physics.ARCADE);
    
    this.ball.body.bounce.set(1);
    topWall.body.immovable = true;
    bottomWall.body.immovable = true;

    this.leftPaddle.body.immovable = true;
    this.rightPaddle.body.immovable = true;

    this.bounce = this.add.audio('bounce');
  },

  update: function ()
  {
    if (this.gameEnded)
    {
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
        this.state.start('menu');
      
      return;
    }

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.ESCAPE))
      this.state.start('menu');

    if (!Pong.onePlayer)
    {
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.W))
      {
        this.movePaddle(this.leftPaddle, 'up', this.paddleSpeed);
      }
      else if (this.game.input.keyboard.isDown(Phaser.Keyboard.S))
      {
        this.movePaddle(this.leftPaddle, 'down', this.paddleSpeed);
      }
    }
    else
    {
      if (this.ball.body.velocity.x < 0)
      {
        if (this.ball.y < this.leftPaddle.y - 5)
        {
          this.movePaddle(this.leftPaddle, 'up', this.aiSpeed);
        }
        else if (this.ball.y > this.leftPaddle.y + 5)
        {
          this.movePaddle(this.leftPaddle, 'down', this.aiSpeed);
        }
      }
    }

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
    {
      this.movePaddle(this.rightPaddle, 'up', this.paddleSpeed);
    }
    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
    {
      this.movePaddle(this.rightPaddle, 'down', this.paddleSpeed);
    }

    if (!this.started)
    {
      if (!this.helpText.visible)
        this.helpText.visible = true;

      this.ball.x = this.world.centerX;
      this.ball.y = this.world.centerY;
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
      {
        this.started = true;
        this.helpText.visible = false;
        if (this.leftHasScored)
        {
          this.ball.body.velocity.setTo(this.speed, 100);
        }
        else
        {
          this.ball.body.velocity.setTo(-this.speed, 100);
        }
      }

      return;
    }

    this.physics.arcade.collide(this.wallGroup, this.ball, this.wallCollision.bind(this));
    this.physics.arcade.collide(this.leftPaddle, this.ball, this.paddleCollision.bind(this));
    this.physics.arcade.collide(this.rightPaddle, this.ball, this.paddleCollision.bind(this));

    if (this.ball.x < 0 || this.ball.x > this.world.width)
    {
      if (this.ball.x < 0)
      {
        this.rightScore++;
        this.leftHasScored = false;
      }
      else
      {
        this.leftScore++;
        this.leftHasScored = true;
      }
      this.started = false;
      this.leftPaddle.y = this.world.centerY;
      this.rightPaddle.y = this.world.centerY;
      
      this.updateScore();
      this.ball.body.velocity.set(0, 0);

      if (this.leftScore === this.winScore || this.rightScore === this.winScore)
      {
        this.gameEnded = true;
        this.ball.destroy();
        this.centerLine.destroy();

        var endText = this.add.bitmapText(this.world.centerX, this.world.centerY, 'bigFont', 'won', 72);
        endText.anchor.set(0.5);

        if (this.leftScore === this.winScore)
        {
          if (Pong.onePlayer)
          {
            endText.text = 'The Computer Won!';
          }
          else
          {
            endText.text = 'Left Player Won!';
          }
        }
        else if (this.rightScore === this.winScore)
        {
          if (Pong.onePlayer)
          {
            endText.text = 'You Won!';
          }
          else
          {
            endText.text = 'Right Player Won!';
          }
        }
      }
    }
  },

  render: function ()
  {
    this.game.debug.text(this.time.fps || '--', 2, 14, '#00CC00');
  },

  shutdown: function ()
  {

  },

  movePaddle: function (paddle, direction, speed)
  {
    if (direction === 'up')
    {
      if (paddle.y > this.wallOffset)
      {
        paddle.y -= speed;
      }
      else
      {
        paddle.y = this.wallOffset;
      }
    }
    else if (direction === 'down')
    {
      if (paddle.y < this.world.height - this.wallOffset)
      {
        paddle.y += speed;
      }
      else
      {
        paddle.y = this.world.height - this.wallOffset;
      }
    }
  },

  paddleCollision: function (obj1, obj2)
  {
    this.bounce.play();
    obj2.body.velocity.y = (obj2.y - obj1.y) * this.maxSpeed / 30;
  },

  wallCollision: function (obj1, obj2)
  {
    this.bounce.play();
  },

  updateScore: function ()
  {
    this.leftScoreText.text = this.leftScore;
    this.rightScoreText.text = this.rightScore;
  }
};