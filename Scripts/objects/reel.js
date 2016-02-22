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
        function Reel(x, y) {
            _super.call(this);
            this.x = x;
            this.y = y;
            this.start();
        }
        // Create reel objects and add to scene
        Reel.prototype.start = function () {
            this._reelBitmap = new createjs.Bitmap(assets.getResult("Reels"));
            var mask = new createjs.Shape(new createjs.Graphics().dr(0, 0, 86, 150));
            this._reelBitmap.mask = mask;
            this.addChild(this._reelBitmap);
            stage.addChild(this);
        };
        // update game objects in my scene
        Reel.prototype.update = function () {
        };
        Reel.prototype.setHero = function (hero) {
            this._reelBitmap.y = -hero;
        };
        return Reel;
    })(createjs.Container);
    objects.Reel = Reel;
})(objects || (objects = {}));
//# sourceMappingURL=reel.js.map