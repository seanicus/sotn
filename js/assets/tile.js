/**
 * Created with JetBrains PhpStorm.
 * User: badger
 * Date: 10/14/13
 * Time: 2:54 PM
 * To change this template use File | Settings | File Templates.
 */
Game.Tile = function(glyph){
    this._glyph = glyph;
};

Game.Tile.prototype.getGlyph = function(){
    return this._glyph;
};

Game.Tile.nullTile = new Game.Tile(new Game.Glyph());
Game.Tile.floorTile = new Game.Tile(new Game.Glyph('-'));
Game.Tile.wallTile = new Game.Tile(new Game.Glyph('#', 'goldenrod'));
