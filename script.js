var fullWidth=window.innerWidth;
var fullHeight=window.innerHeight;
var midX=fullWidth/2;
var midY=fullHeight/2;
var config = {
    scale : {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
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
var sceneHeight;
var sceneWidth;
var fontSize;
leftBtnClick=false;
rightBtnClick=false;
upBtnClick=false;
var score = 0 ;

function init(){
    
    
    console.log('In Init');
    var progress = this.add.graphics();

    this.load.on('progress', function (value) {

        progress.clear();
        progress.fillStyle(0x1c0c40, 1);
        progress.fillRect(0, 270, 800 * value, 60);

    });
    
    
    sceneHeight = game.scale.height;
    sceneWidth = game.scale.width;
    fontSize = sceneWidth*0.0263;
    text = this.add.text(sceneWidth/3, 270, 'Loading Assets ...', { fill: '#ffffff' });
    text.setFontSize(fontSize);
    console.log(fontSize);
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
    this.load.image('start','assets/start.png');
    this.load.image('doof','assets/doof.png');
    this.load.image('city','assets/city.png');
    this.load.image('mack','assets/mack.png');
    this.load.image('college','assets/college_cartoon.png');
    this.load.image('left','assets/left_btn.png');
    this.load.image('right','assets/right_btn.png');
    this.load.image('jump','assets/up_btn.png');
    this.load.image('cloud','assets/cloud.png');
    this.load.image('about','assets/about.png');
    this.load.image('school','assets/school.png');
    this.load.image('tree1','assets/tree1.png');
    this.load.image('tree2','assets/tree2.png');
    this.load.image('seniorcollege','assets/college.png');
    this.load.image('experience','assets/experience.png');
    this.load.image('skills','assets/skills.png');
    this.load.image('projects','assets/projects.png');
    this.load.image('profiles','assets/profiles.png');
    this.load.image('thankyou','assets/thankyou.png');
    this.load.image('halfblock','assets/halfblock.png');
    this.load.image('fullblock','assets/fullblock.png');
    this.load.image('blackpanther','assets/blackpanther.png');
    this.load.image('captain','assets/captain.png');
    this.load.spritesheet('kick','assets/kickspr_digital.png',{frameWidth:130, frameHeight:150});
    this.load.spritesheet('bird','assets/birdspr_min.png',{frameWidth:87, frameHeight:68});
    // this.load.audio('theme','assets/kick_theme.ogg');
}

function create ()
{
    
    
    text.destroy();
    console.log(sceneHeight);
    console.log(sceneWidth);
    /*Button Code -Start*/
    /*Button Code - End*/

    scoreText = this.add.text(20, 20, 'SCORE:0', { fill: '#ffffff', font: '36px' }).setFontStyle('bold');
    scoreText.setScrollFactor(0)
    console.log('In Create');
    
    this.cameras.main.setBounds(0, 0, fullWidth+4000, sceneHeight);
    // this.add.image(0,0,'sky').setOrigin(0,0);
    
    // this.sound.pauseOnBlur = false;
    // var music = this.sound.add('theme');
    // music.play();

    //Backdrop -Start
    backdrop = this.physics.add.staticGroup();
    backdrop.create(600,sceneHeight-280,'city');
    backdrop.create(130,sceneHeight-210,'start');
    backdrop.create(1230,sceneHeight-280,'doof');
    
    backdrop.create(2200,sceneHeight-210,'about');
    backdrop.create(2500,sceneHeight-200,'school');
    backdrop.create(2950,sceneHeight-180,'tree1');
    backdrop.create(2800,sceneHeight-178,'tree2');
    backdrop.create(3300,sceneHeight-190,'seniorcollege');
    backdrop.create(3700,sceneHeight-180,'tree1');
    backdrop.create(4100,sceneHeight-250,'college');
    backdrop.create(4300,sceneHeight-180,'tree1');
    backdrop.create(4500,sceneHeight-230,'blackpanther');
    backdrop.create(4800,sceneHeight-230,'captain');
    backdrop.create(1850,sceneHeight-188,'mack');
    // backdrop.create(3200,sceneHeight-210,'about');
    // backdrop.create(3500,sceneHeight-210,'experience');
    // backdrop.create(3800,sceneHeight-210,'skills');
    //Backdrop -End
    
    
    
    //Clouds
    clouds = this.physics.add.staticGroup();
    for(var i=0;i<20000;i+=1000){
        clouds.create(i,sceneHeight-480,'cloud');
        clouds.create(i+Phaser.Math.FloatBetween(300.0,700.0),sceneHeight-Phaser.Math.FloatBetween(480.0,600.0),'cloud');
    }
    

    //Platforms
    platforms = this.physics.add.staticGroup();
    for(var i=100;i<20000;){
        platforms.create(i, sceneHeight-25,'ground');
        i+=600;    
    }
    // platforms.create(100, 610,'ground');
    // platforms.create(700, 610,'ground');
    // platforms.create(1300, 610,'ground');
    // platforms.create(1900, 610,'ground');
    // platforms.create(2500, 610,'ground');
    platforms.create(1020, 370, 'halfblock');
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
    player = this.physics.add.sprite(250,0,'kick');
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
    this.physics.world.setBounds(0, 0, fullWidth+4000, sceneHeight-95);
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
    
    const helloButton = this.add.text(75, sceneHeight-70, 'Hello,\nPlease use arrow keys to move!', { fill: '#ffffff'}).setFontStyle('bold');
    helloButton.setFontSize(fontSize);
    leftButton = this.add.image(sceneWidth-190,sceneHeight-45,'left');
    leftButton.setScrollFactor(0);
    leftButton.setInteractive();
    rightButton = this.add.image(sceneWidth-50,sceneHeight-45,'right');
    rightButton.setScrollFactor(0);
    rightButton.setInteractive();
    upButton = this.add.image(sceneWidth-120,sceneHeight-45,'jump');
    upButton.setScrollFactor(0);
    upButton.setInteractive();
}

var scalingFactor = 0;
var flag = false;
var time = 0;
var breakPoint = false;
function update ()
{
    
    cloudAnimation();
    console.log('In Update');
    flyingbird.setVelocityX(200);
    flyingbird.anims.play('bluebird',true);
    leftButton.on('pointerdown', () => { leftBtnClick=true; });
    rightButton.on('pointerdown', () => { rightBtnClick=true; });
    upButton.on('pointerdown', () => { upBtnClick=true; });
    leftButton.on('pointerup', () => { leftBtnClick=false; });
    rightButton.on('pointerup', () => { rightBtnClick=false; });
    upButton.on('pointerup', () => { upBtnClick=false; });
    cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown || leftBtnClick==true)
    {
        player.setVelocityX(-200);
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown || rightBtnClick==true)
    {
        player.setVelocityX(800);
        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);
        player.anims.play('turn');
    }
    if (cursors.up.isDown && player.body.touching.down || upBtnClick==true)
    {
        player.setVelocityY(-530);
    }
    
}

/*User defined functions - Start*/

function collectChugs (player, chug)
{
    chug.disableBody(true, true);
    score+=10;
    scoreText.setText('SCORE:'+ score);
}

function moveLeft(){
    player.setVelocityX(-200);
    player.anims.play('left',15, true);
}
function moveRight(){
    player.setVelocityX(200);
    player.anims.play('right', 15, true);
}

function cloudAnimation(){
    if(breakPoint == false){
        time+=1;    
    }
    if(flag==false){
        scalingFactor+=0.0001;
        clouds.scaleXY(scalingFactor,scalingFactor);
    }
    if(time==30){
        breakPoint =true;
        flag=true;
        scalingFactor=0;
    }
    if(flag==true){
        scalingFactor-=0.0001;
        clouds.scaleXY(scalingFactor,scalingFactor);
    }
    if(breakPoint == true){
        time-=1;
    }
    if(time==0){
        breakPoint=false;
        flag=false;
        scalingFactor=0;
    }
}