var fullWidth=window.innerWidth;
var fullHeight=window.innerHeight;
var midX=fullWidth/2;
var midY=fullHeight/2;
var config = {
    type: Phaser.AUTO,
    width: fullWidth,
    height: fullHeight,
    backgroundColor: '#69c3fc',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: false
        }
    },
    scene: {
        init: init,
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function init(){
    

    console.log('In Init');
    var progress = this.add.graphics();

    this.load.on('progress', function (value) {

        progress.clear();
        progress.fillStyle(0x1c0c40, 1);
        progress.fillRect(0, 270, 800 * value, 60);

    });
    text = this.add.text(midX-350, 270, 'Loading Assets ...', { font: '56px Courier', fill: '#ffffff' });
    this.load.on('complete', function () {

        progress.destroy();

    });
    

}
function preload ()
{
    
    console.log('In Preload');
    // this.load.image('sky','assets/sky.png');
    
    
    this.load.image('ground','assets/rock.png');
    this.load.image('chug','assets/chug.png');
    this.load.image('bridge','assets/platform.png');
    this.load.image('sign','assets/sign_board.png');
    this.load.image('doof','assets/doof.png');
    this.load.image('city','assets/city.png');
    this.load.image('mack','assets/mack.png');
    this.load.image('college','assets/college_cartoon.png');
    this.load.image('left','assets/left_btn.png');
    this.load.image('right','assets/right_btn.png');
    this.load.spritesheet('kick','assets/kickspr_digital.png',{frameWidth:130, frameHeight:150});
    this.load.spritesheet('bird','assets/birdspr_min.png',{frameWidth:87, frameHeight:68});
    // this.load.audio('theme','assets/kick_theme.ogg');
}

function create ()
{
    
    var sceneHeight = game.scale.height;
    var sceneWidth = game.scale.width;
    console.log(sceneHeight);
    console.log(sceneWidth);
    /*Button Code -Start*/
    /*Button Code - End*/

    text.destroy();
    console.log('In Create');
    
    this.cameras.main.setBounds(0, 0, fullWidth+9000, 600);
    // this.add.image(0,0,'sky').setOrigin(0,0);
    
    // this.sound.pauseOnBlur = false;
    // var music = this.sound.add('theme');
    // music.play();

    // game.add.button(990,150,'linkedin',openLinkedIn, this);

    //Sign boards -Start
    signboards = this.physics.add.staticGroup();
    signboards.create(600,352,'city');
    signboards.create(130,438,'sign');
    signboards.create(1230,350,'doof');
    signboards.create(2980,385,'college');
    signboards.create(2400,352,'city');
    signboards.create(1800,447,'mack');
    
    
    
    //Sign boards -End

    //Platforms
    platforms = this.physics.add.staticGroup();
    for(var i=100;i<20000;){
        platforms.create(i, 610,'ground');
        i+=600;    
    }
    // platforms.create(100, 610,'ground');
    // platforms.create(700, 610,'ground');
    // platforms.create(1300, 610,'ground');
    // platforms.create(1900, 610,'ground');
    // platforms.create(2500, 610,'ground');
    // platforms.create(600, 400, 'bridge');
    // platforms.create(50, 250, 'bridge');
    // platforms.create(750, 220, 'bridge');
    // platforms.create(1200, 300, 'bridge');
    // platforms.create(2000, 500, 'bridge');
    
    
    //Bird
    flyingbird = this.physics.add.sprite(100,120,'bird');
    flyingbird.body.setGravityY(-400);
    this.anims.create({
        key:'bluebird',
        frames: this.anims.generateFrameNumbers('bird', {start:0, end:8}),
        frameRate: 15,
        repeat: -1
    })

    //Player
    player = this.physics.add.sprite(250, 440,'kick');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    
        
    this.anims.create({
        key:'left',
        frames: this.anims.generateFrameNumbers('kick', {start:0, end:3}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'kick', frame: 4 } ],
        frameRate: 20
    });
    
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('kick', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    player.body.setGravityY(300);
    this.physics.add.collider(player,platforms);
    this.physics.world.setBounds(0, 0, fullWidth+10000, 700);
    this.cameras.main.startFollow(player, true, 1.0, 1.0);

    //Chugs
    chugs = this.physics.add.group({
        key: 'chug',
        repeat: 100,
        setXY: { x: 500, y: 0, stepX: 200 }
    });
    
    chugs.children.iterate(function (child) {
    
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    
    });
    this.physics.add.collider(chugs, platforms);
    this.physics.add.overlap(player, chugs, collectChugs, null, this);
    
    const helloButton = this.add.text(75, 560, 'Hello,\nPlease use <- and -> arrow keys to move!', { fill: '#ffffff',font:'36px'}).setFontStyle('bold');
    if(sceneWidth<900){
        helloButton.setFontSize('12px');
    }
    helloButton.setInteractive();
    helloButton.on('pointerdown', () => { openLinkedIn(); });

    leftButton = this.add.image(sceneWidth-120,sceneHeight-50,'left');
    leftButton.setScrollFactor(0);
    leftButton.setInteractive();
    rightButton = this.add.image(sceneWidth-50,sceneHeight-50,'right');
    rightButton.setScrollFactor(0);
    rightButton.setInteractive();
}

leftBtnClick=false;
rightBtnClick=false;



function update ()
{
    
    console.log('In Update');
    flyingbird.setVelocityX(200);
    flyingbird.anims.play('bluebird',true);
    leftButton.on('pointerdown', () => { leftBtnClick=true; });
    rightButton.on('pointerdown', () => { rightBtnClick=true; });
    leftButton.on('pointerup', () => { leftBtnClick=false; });
    rightButton.on('pointerup', () => { rightBtnClick=false; });
    cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown || leftBtnClick==true)
    {
        player.setVelocityX(-200);
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown || rightBtnClick==true)
    {
        player.setVelocityX(200);
        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);
        player.anims.play('turn');
    }
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-530);
    }
    
}

/*User defined functions - Start*/

function collectChugs (player, chug)
{
    chug.disableBody(true, true);
}

function openLinkedIn(){
    var win = window.open('https://www.linkedin.com');
    win.focus();
}

function moveLeft(){
    player.setVelocityX(-200);
    player.anims.play('left',15, true);
}
function moveRight(){
    player.setVelocityX(200);
    player.anims.play('right', 15, true);
}