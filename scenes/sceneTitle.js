class SceneTitle extends Phaser.Scene {
    constructor() {
        super('SceneTitle');
    }
    preload() {
        this.load.image("button1", "images/ui/buttons/1/1.png");
        this.load.image("title", "images/main/title.png");
        this.load.audio("boom", ["audio/boom.wav", "audio/boom.oog"]);
        this.load.audio("explode", ["audio/explode.wav", "audio/explode.oog"]);
        this.load.audio("heroism", ["audio/heroism.wav", "audio/heroism.oog"]);
        //
        //
        this.load.image("toggleBack", "images/ui/toggles/1.png");
        this.load.image("sfxOff", "images/ui/icons/sfx_off.png");
        this.load.image("sfxOn", "images/ui/icons/sfx_on.png");
        this.load.image("musicOn", "images/ui/icons/music_on.png");
        this.load.image("musicOff", "images/ui/icons/music_off.png");
    }
    create() {
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();
        mediaManager = new MediaManager({
            scene: this
        });
        model.currentScene = this;
        mediaManager.init();
        mediaManager.setBackgroundMusic("heroism");
        this.alignGrid = new AlignGrid({
            rows: 11,
            cols: 11,
            scene: this
        });
        // this.alignGrid.showNumbers();
        var title = this.add.image(240, 100, 'title');
        Align.scaleToGameW(title, .8);
        var btnStart = new TextButton({
            scene: this,
            key: 'button1',
            text: 'start',
            event: G.START_GAME
        });
        this.alignGrid.placeAtIndex(38, title);
        this.alignGrid.placeAtIndex(93, btnStart);
        var sb = new SoundButtons({
            scene: this
        });
        var rotChecker = new RotationChecker({
            scene: this,
            right: "portrait"
        });
        emitter.on(rotChecker.WRONG_WAY, this.turnedWrongWay);
        emitter.on(rotChecker.CORRECTED, this.corrected);
        emitter.on(rotChecker.RIGHT_WAY, this.rightWay);
        rotChecker.check();
    }
    turnedWrongWay() {
        document.getElementById('wrongWayPortrait').style.display = "block";
    }
    corrected() {
        if (this.initialCorrect != true) {
            location.reload();
        }
        document.getElementById('wrongWayPortrait').style.display = "none";
    }
    rightWay() {
        this.initialCorrect = true;
    }
    startGame() {
        this.scene.start('SceneMain');
    }
    update() {
       
    }
}