/**
 * Created with JetBrains PhpStorm.
 * User: badger
 * Date: 10/17/13
 * Time: 3:45 PM
 * To change this template use File | Settings | File Templates.
 */
Promise.request = function(url) {
    var result = new Promise();

    var xhr = new XMLHttpRequest();

    var eventHandler = {
        handleEvent: function(e) {
            if (e.target.readyState != 4) { return; }
            xhr.removeEventListener("readystatechange", eventHandler);

            if (e.target.status == 200) {
                result.fulfill(e.target.responseText);
            } else {
                result.reject(e.target.responseText);
            }
        }
    }

    xhr.open("get", url, true);
    xhr.addEventListener("readystatechange", eventHandler);
    xhr.send();

    return result;
}