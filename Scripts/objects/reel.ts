module objects {
    // Reel Class
    export class Reel extends createjs.Container {
        // PROTECTED INSTANCE VARIABLES
        private _reelBitmap: createjs.Bitmap;
         
        // CONSTRUCTOR +++++++++++++++++++++++++++++
        constructor(x: number, y: number) {
            super();    
            this.x = x;
            this.y = y;        
            this.start();
        }
        
        // Create reel objects and add to scene
        public start(): void {
            
            this._reelBitmap = new createjs.Bitmap(assets.getResult("Reels"));
            var mask = new createjs.Shape(new createjs.Graphics().dr(0,0,86,150));
            this._reelBitmap.mask = mask;
            this.addChild(this._reelBitmap);
            
            stage.addChild(this);
        }
        
        // update game objects in my scene
        public update(): void {

        }
        
        public setHero(hero: number): void {
            this._reelBitmap.y = -hero;
        }
        
        
    }
}