
Pong.Game = function ()
{
  this.paddleSpeed = 7;

  this.wallOffset = 56;

  this.speed;
  this.maxSpeed = 400;

  this.leftScore = 0;
  this.rightScore = 0;

  this.started = false;

  this.leftHasScored = true;
};

Pong.Game.prototype = {

  create: function ()
  {
    this.speed = this.maxSpeed;
    this.wallGroup = this.add.group();

    var topWall = this.wallGroup.create(0, 0, 'wall');
    topWall.anchor.set(0, 0.5);
    
    var bottomWall = this.wallGroup.create(0, this.world.height, 'wall');
    bottomWall.anchor.set(0, 0.5);

    var centerLine = this.add.sprite(this.world.centerX, 0, 'centerLine');
    centerLine.anchor.set(0.5, 0);

    
    this.leftScoreText = this.add.bitmapText(this.world.centerX - 30, 24, 'scoreFont', '0', 64);
    this.leftScoreText.anchor.set(1, 0);
    
    this.rightScoreText = this.add.bitmapText(this.world.centerX + 30, 24, 'scoreFont', '0', 64);
    
    this.leftPaddle = this.add.sprite(30, this.world.centerY, 'paddle');
    this.leftPaddle.anchor.set(0.5);

    this.rightPaddle = this.add.sprite(this.world.width - 30, this.world.centerY, 'paddle');
    this.rightPaddle.anchor.set(0.5);

    this.ball = this.add.sprite(this.world.centerX, this.world.centerY, 'ball');
    this.ball.anchor.set(0.5);

    this.physics.enable([this.wallGroup, this.leftPaddle, this.rightPaddle, this.ball], Phaser.Physics.ARCADE);
  },

  update: function ()
  {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.W))
    {
      this.movePaddle(this.leftPaddle, 'up');
    }
    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.S))
    {
      this.movePaddle(this.leftPaddle, 'down');
    }

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
    {
      this.movePaddle(this.rightPaddle, 'up');
    }
    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
    {
      this.movePaddle(this.rightPaddle, 'down');
    }

    if (!this.started)
    {
      this.ball.x = this.world.centerX;
      this.ball.y = this.world.centerY;
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
      {
        this.started = true;
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

    this.physics.arcade.overlap(this.wallGroup, this.ball, this.wallOverlap);
    this.physics.arcade.overlap(this.leftPaddle, this.ball, this.paddleOverlap.bind(this));
    this.physics.arcade.overlap(this.rightPaddle, this.ball, this.paddleOverlap.bind(this));

    this.ball.body.velocity.x = this.speed;

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
    }
  },

  render: function ()
  {
    this.game.debug.text(this.time.fps || '--', 2, 14, '#00CC00');
  },

  shutdown: function ()
  {

  },

  movePaddle: function (paddle, direction)
  {
    if (direction === 'up')
    {
      if (paddle.y > this.wallOffset)
      {
        paddle.y -= this.paddleSpeed;
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
        paddle.y += this.paddleSpeed;
      }
      else
      {
        paddle.y = this.world.height - this.wallOffset;
      }
    }
  },

  wallOverlap: function (obj1, obj2)
  {
    obj1.body.velocity.y = -obj1.body.velocity.y;
  },

  paddleOverlap: function (obj1, obj2)
  {
    if (obj2.x < obj1.x)
    {
      this.speed = -this.maxSpeed;
    }
    else
    {
      this.speed = this.maxSpeed;
    }
    obj2.body.velocity.y = (obj2.y - obj1.y) * this.maxSpeed / 30;
  },

  updateScore: function ()
  {
    this.leftScoreText.text = this.leftScore;
    this.rightScoreText.text = this.rightScore;
  }
};