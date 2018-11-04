class SceneOver extends Phaser.Scene {
    constructor() {
        super('SceneOver');
    }
    preload() {}
    create() {
    	model.currentScene=this;
    	
        this.alignGrid = new AlignGrid({
            rows: 11,
            cols: 11,
            scene: this
        });
       // this.alignGrid.showNumbers();
        var overText = this.add.text(0, 0, "GAME OVER", {
            color: '#ffffff',
            fontSize: game.config.width / 10
        });
        overText.setOrigin(0.5, 0.5);
        this.alignGrid.placeAtIndex(27, overText);

        var btnStart=new TextButton({scene:this,key:'button1',text:'Play Again',event:G.START_GAME});
        this.alignGrid.placeAtIndex(93, btnStart);
    }
}