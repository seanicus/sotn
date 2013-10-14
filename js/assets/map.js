/**
 * Created with JetBrains PhpStorm.
 * User: badger
 * Date: 10/14/13
 * Time: 3:00 PM
 * To change this template use File | Settings | File Templates.
 */
Game.Map = function(tiles){
    this._tiles = tiles;
    this._width = tiles.length;
    this._height = tiles[0].length;
};

Game.Map.prototype.getWidth = function(){
    return this._width;
};

Game.Map.prototype.getHeight = function(){
    return this._height;
};

Game.Map.prototype.getTile = function(x, y){
     if(x < 0 || x >= this._width || y < 0 || y >= this._height){
         return Game.Tile.nullTile;
     } else {
         return this._tiles[x][y] || Game.Tile.nullTile
     }
};
