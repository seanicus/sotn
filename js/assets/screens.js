/**
 * Created with JetBrains PhpStorm.
 * User: badger
 * Date: 10/14/13
 * Time: 2:29 PM
 * To change this template use File | Settings | File Templates.
 */
Game.Screen = {};

// Define our initial start screen
Game.Screen.startScreen = {
    enter: function() {    console.log("Entered start screen."); },
    exit: function() { console.log("Exited start screen."); },
    render: function(display) {
        // Render our prompt to the screen
        display.drawText(1,1, "%c{yellow}Source of the Nile");
        display.drawText(1,2, "Press [Enter] to start!");
    },
    handleInput: function(inputType, inputData) {
        // When [Enter] is pressed, go to the play screen
        if (inputType === 'keydown') {
            if (inputData.keyCode === ROT.VK_RETURN) {
                Game.switchScreen(Game.Screen.playScreen);
            }
        }
    }
}

// Define our playing screen
Game.Screen.playScreen = {
    _map: null,
    _centerX: 0,
    _centerY: 0,
    enter: function() {
        console.log("Entered play screen.");

        var str = Game.Africa.map();

        var map = [];
        var mapHeight = 80;
        var str_y = 0;
        for(var y = 0; y < 24; y++){
            map.push([]);
            var str_x = 0;
            for(var x = y%2; x < mapHeight; x += 2){
                //map[x].push(Game.Tile.nullTile)
                if(str[str_y][str_x] == "."){
                    map[y][x] = Game.Tile.floorTile;
                } else {
                    map[y][x] = Game.Tile.wallTile;
                }
                str_x++;
            }
            str_y++
        }

        this._map = new Game.Map(map);

    },
    exit: function() { console.log("Exited play screen."); },
    render: function(display) {
        var screenWidth = Game.getScreenWidth();
        var screenHeight = Game.getScreenHeight();

        var topLeftX = Math.max(0, this._centerX - (screenWidth / 2));
        topLeftX = Math.min(topLeftX, this._map.getWidth() - screenWidth);

        var topLeftY = Math.max(0, this._centerY - (screenHeight / 2));
        topLeftY = Math.min(topLeftY, this._map.getHeight() - screenHeight);

        for(var y = topLeftY; y < topLeftY + screenHeight; y++){
            for(var x = y%2; x < topLeftX + screenWidth; x += 2){
                var glyph = this._map.getTile(y, x).getGlyph();
                //console.log(y + ", " + x + ": " + glyph.getChar());
                display.draw(x - topLeftX, y - topLeftY, glyph.getChar(), glyph.getForeground(), glyph.getBackground());
            }
        }

        // Render the cursor
        display.draw(
            this._centerX - topLeftX,
            this._centerY - topLeftY,
            '@',
            'white',
            'black');

    },
    handleInput: function(inputType, inputData) {
        if (inputType === 'keydown') {
            // If enter is pressed, go to the win screen
            // If escape is pressed, go to lose screen
            if (inputData.keyCode === ROT.VK_RETURN) {
                Game.switchScreen(Game.Screen.winScreen);
            } else if (inputData.keyCode === ROT.VK_ESCAPE) {
                Game.switchScreen(Game.Screen.loseScreen);
            }
            //move
            if(inputData.keyCode == ROT.VK_NUMPAD7){
                if(this._centerY != 0){
                    this.move(-1, -1);
                } else {
                    this.move(0, -1);
                }

            } else if (inputData.keyCode == ROT.VK_NUMPAD3){
                if(this._centerY < (this._map.getHeight() - 1)){
                    this.move(1, 1);
                } else {
                    this.move(0, 1);
                }

            } else if (inputData.keyCode == ROT.VK_NUMPAD9){
                if(this._centerY != 0){
                    this.move(1, -1);
                } else {
                    this.move(0, -1);
                }
            } else if(inputData.keyCode == ROT.VK_NUMPAD1) {
                if(this._centerY < (this._map.getHeight() - 1)){
                    this.move(-1, 1);
                } else {
                    this.move(0, 1);
                }
            } else if(inputData.keyCode == ROT.VK_NUMPAD4){
                //TODO:  YUCK.  Clean this up
                if(this._centerY == 0){
                    this.move(-2, 0);
                } else if(this._centerX == 1 && this._centerY%2 == 1){
                    this.move(0,0);
                } else {
                    this.move(-2, 0);
                }

            } else if(inputData.keyCode == ROT.VK_NUMPAD6) {
                this.move(2, 0);
            }

        }
    },
    move: function(dX, dY) {
        // Positive dX means movement right
        // negative means movement left
        // 0 means none
        this._centerX = Math.max(0, Math.min(this._map.getWidth() - 1, this._centerX + dX));
        // Positive dY means movement down
        // negative means movement up
        // 0 means none
        this._centerY = Math.max(0, Math.min(this._map.getHeight() - 1, this._centerY + dY));
    }
}

// Define our winning screen
Game.Screen.winScreen = {
    enter: function() {    console.log("Entered win screen."); },
    exit: function() { console.log("Exited win screen."); },
    render: function(display) {
        // Render our prompt to the screen
        for (var i = 0; i < 22; i++) {
            // Generate random background colors
            var r = Math.round(Math.random() * 255);
            var g = Math.round(Math.random() * 255);
            var b = Math.round(Math.random() * 255);
            var background = ROT.Color.toRGB([r, g, b]);
            display.drawText(2, i + 1, "%b{" + background + "}You win!");
        }
    },
    handleInput: function(inputType, inputData) {
        // Nothing to do here
    }
}

// Define our winning screen
Game.Screen.loseScreen = {
    enter: function() {    console.log("Entered lose screen."); },
    exit: function() { console.log("Exited lose screen."); },
    render: function(display) {
        // Render our prompt to the screen
        for (var i = 0; i < 22; i++) {
            display.drawText(2, i + 1, "%b{red}You lose! :(");
        }
    },
    handleInput: function(inputType, inputData) {
        // Nothing to do here
    }
}