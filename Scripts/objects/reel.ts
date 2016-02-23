module objects {
    // Reel Class
    export class Reel extends createjs.Container {
        // PROTECTED INSTANCE VARIABLES
        private _reelBitmap: createjs.Bitmap;
         
        // CONSTRUCTOR +++++++++++++++++++++++++++++
        constructor(x: number, y: number) {
            super();  

            // set the reel position on the slotmachine scene  
            this.x = x;
            this.y = y;        
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
            createjs.Tween.get(this._reelBitmap)
                // go to the end of the reel
                .to({y: -600}, Math.abs(700+this._reelBitmap.y))
                // go back to initial position (0ms)
                .to({y: 0}, 0)
                // go to the end in 600ms
                .to({y: -600}, 600)
                .to({y: 0}, 0)
                 // go to the end in 1200ms 
                .to({y: -600}, 1200)
                .to({y: 0}, 0)
                 // go to the hero position in 1800ms
                .to({y:-hero}, 1000+hero);
        }
        
        
    }
}