module objects {
    // Reel Class
    export class Reel extends createjs.Container {
        // PROTECTED INSTANCE VARIABLES
        private _reelBitmap: createjs.Bitmap;
        private _index: number;
        
        // CONSTRUCTOR +++++++++++++++++++++++++++++
        constructor(index: number, x: number, y: number) {
            super();  

            // set the reel position on the slotmachine scene  
            this.x = x;
            this.y = y;  
            this._index = index;
            this.start();
        }
        
        // Create reel objects and add to scene
        public start(): void {
            
            // load heroes reel image
            this._reelBitmap = new createjs.Bitmap(assets.getResult("Reels"));

            // create a mask to just show the image inside the reels window 
            var mask = new createjs.Shape(new createjs.Graphics().dr(0,0,86,150));
            this._reelBitmap.mask = mask;
            this.addChild(this._reelBitmap);
            
            stage.addChild(this);
        }
        
        // set the hero on the middle of the reel
        public setHero(hero: number): void {
            this._reelBitmap.y = -hero;
        }
        
        // set the hero on the middle of the reel with a basic animation
        public setHeroAnimated(hero: number): void {
            var tween = createjs.Tween.get(this._reelBitmap);
        
            // go to the end of the reel
            tween.to({y: -600}, Math.abs(700+this._reelBitmap.y));
                
            // full complete spins
            for(var i = 0; i < this._index; i++)
                tween
                    // go back to initial position (0ms)
                    .to({y: 0}, 0)
                    // go to the end in 500ms + delta
                    .to({y: -600}, 300 + i*300).to({y: 0}, 0);
                
            // slow down the reel to the corret position 
            tween
                .to({y: -600}, 1200).to({y: 0}, 0)
                .to({y:-hero}, 1000+hero).call( this._handleComplete, [this] );
        }
        
        private _handleComplete(reel){
            reel.dispatchEvent("reelCompleted");
        }
        
        
    }
}