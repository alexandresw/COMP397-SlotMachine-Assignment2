var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// INTRO SCENE
var scenes;
(function (scenes) {
    var SlotMachine = (function (_super) {
        __extends(SlotMachine, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function SlotMachine() {
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        SlotMachine.prototype.start = function () {
            // add Intro Image
            this._introImage = new createjs.Bitmap(assets.getResult("IntroCave"));
            this.addChild(this._introImage);
            this._slotMachineLabel = new objects.Label("SLOT_MACHINE", "60px Consolas", "#000", config.Screen.CENTER_X, config.Screen.CENTER_Y);
            this.addChild(this._slotMachineLabel);
            // add the Start button to the MENU scene
            this._startButton = new objects.Button("StartButton", config.Screen.CENTER_X, config.Screen.CENTER_Y + 180);
            this.addChild(this._startButton);
            // Start Button event listener
            this._startButton.on("click", this._startButtonClick, this);
            // add this scene to the global stage container
            stage.addChild(this);
        };
        // INTRO Scene updates here
        SlotMachine.prototype.update = function () {
        };
        //EVENT HANDLERS ++++++++++++++++++++
        // Start Button click event handler
        SlotMachine.prototype._startButtonClick = function (event) {
            // Switch to the LEFT_CAVE Scene
            scene = config.Scene.GAME_OVER;
            changeScene();
        };
        return SlotMachine;
    })(objects.Scene);
    scenes.SlotMachine = SlotMachine;
})(scenes || (scenes = {}));
//# sourceMappingURL=slotmachine.js.map