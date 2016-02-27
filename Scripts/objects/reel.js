var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    // Reel Class
    var Reel = (function (_super) {
        __extends(Reel, _super);
        // CONSTRUCTOR +++++++++++++++++++++++++++++
        function Reel(index, x, y) {
            _super.call(this);
            // set the reel position on the slotmachine scene  
            this.x = x;
            this.y = y;
            this._index = index;
            this.start();
        }
        // Create reel objects and add to scene
        Reel.prototype.start = function () {
            // load heroes reel image
            this._reelBitmap = new createjs.Bitmap(assets.getResult("Reels"));
            // create a mask to just show the image inside the reels window 
            var mask = new createjs.Shape(new createjs.Graphics().dr(0, 0, 86, 150));
            this._reelBitmap.mask = mask;
            this.addChild(this._reelBitmap);
            stage.addChild(this);
        };
        // set the hero on the middle of the reel
        Reel.prototype.setHero = function (hero) {
            this._reelBitmap.y = -hero;
        };
        // set the hero on the middle of the reel with a basic animation
        Reel.prototype.setHeroAnimated = function (hero) {
            var tween = createjs.Tween.get(this._reelBitmap);
            // go to the end of the reel
            tween.to({ y: -600 }, Math.abs(700 + this._reelBitmap.y));
            // full complete spins
            for (var i = 0; i < this._index; i++)
                tween
                    .to({ y: 0 }, 0)
                    .to({ y: -600 }, 300 + i * 300).to({ y: 0 }, 0);
            // slow down the reel to the corret position 
            tween
                .to({ y: -600 }, 1200).to({ y: 0 }, 0)
                .to({ y: -hero }, 1000 + hero).call(this._handleComplete, [this]);
        };
        Reel.prototype._handleComplete = function (reel) {
            reel.dispatchEvent("reelCompleted");
        };
        return Reel;
    })(createjs.Container);
    objects.Reel = Reel;
})(objects || (objects = {}));
//# sourceMappingURL=reel.js.map