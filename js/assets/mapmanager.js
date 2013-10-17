/**
 * Created with JetBrains PhpStorm.
 * User: badger
 * Date: 10/17/13
 * Time: 3:24 PM
 * To change this template use File | Settings | File Templates.
 */
Game.MapManager = {
    path: 'maps',
    get: function(name){
        var path = 'js' + "/" + this.path + "/" + name + ".txt?" + ROT.RNG.getUniform();
        return Promise.request(path).then(function(data){
            var map_data =  this._mapFromTemplate(data);
            return map_data;
        }.bind(this)).then(null, function(){debugger;});
    },
    _mapFromTemplate: function(data){
        console.log(data);
        return data;
    }
}



//Game.MapManager.prototype.getMapFromTemplate = function(name) {
//    var txtFile = new XMLHttpRequest();
//    txtFile.open("GET", "/js/assets/Africa.txt", true);
//    txtFile.onreadystatechange = function()
//    {
//        var map_store = [];
//        if (txtFile.readyState === 4) {  // document is ready to parse.
//            if (txtFile.status === 200) {  // file is found
//                var allText = txtFile.responseText;
//                var lines = txtFile.responseText.split("\n");
//                for(var x = 0; x < lines.length; x++){
//                    var chars = lines[x].split('');
//                    for(var y = 0; y < chars.length; y++){
//                        console.log(chars[y]);
//                        map_store[x,y] = chars[y];
//                    }
//                }
//                return map_store;
//            }
//        }
//    }
//    txtFile.send(null);
//};