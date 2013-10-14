/**
 * Created with JetBrains PhpStorm.
 * User: badger
 * Date: 10/14/13
 * Time: 2:42 PM
 * To change this template use File | Settings | File Templates.
 */
Game.Glyph = function(chr, foreground, background) {
    this._char = chr || ' ';
    this._foreground = foreground || 'white';
    this._background = background || 'black';
};

Game.Glyph.prototype.getChar = function(){
    return this._char;
}

Game.Glyph.prototype.getBackground = function(){
    return this._background;
}

Game.Glyph.prototype.getForeground = function(){
    return this._foreground;
}
