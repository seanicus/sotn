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
        display.drawText(1,1, "%c{yellow}Javascript Roguelike");
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
    enter: function() {
        console.log("Entered play screen.");

//        //var rdr = Game.MapManager;
//        var map_store = Game.MapManager.get('africa').then(function(){
//
//
//
//        }.bind(this));

        var str = Game.Africa.map();

        var map = [];
        for(var x = 0; x < 80; x++){
            map.push([]);
            for(var y = 0; y < 24; y++){
                map[x].push(Game.Tile.nullTile)
            }
        }
        var generator = new ROT.Map.Cellular(80, 24);
        generator.randomize(0.5);
        var totalIterations = 3;
        for(var i = 0; i < totalIterations - 1; i++){
            generator.create();
        }
        generator.create(function(x,y,v) {
            if(v===1){
                map[x][y] = Game.Tile.floorTile;
            } else {
                map[x][y] = Game.Tile.wallTile;
            }
        });
        this._map = new Game.Map(map);

    },
    exit: function() { console.log("Exited play screen."); },
    render: function(display) {
        for(x = 0; x < this._map.getWidth(); x++){
            for(var y = 0; y < this._map.getHeight(); y++){
                var glyph = this._map.getTile(x, y).getGlyph();
                display.draw(x, y, glyph.getChar(), glyph.getForeground(), glyph.getBackground());
            }
        }
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
        }
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