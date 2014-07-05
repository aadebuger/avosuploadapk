/**
 * Created with JetBrains WebStorm.
 * User: aadebuger
 * Date: 14-7-5
 * Time: 下午12:34
 * To change this template use File | Settings | File Templates.
 */
var fs = require('fs')
var AVV=require('./av.js')
//console.log(AVV)
//console.log(AVV.AV)
AV=AVV.AV
console.log(process.argv);
console.log(process.argv[2])
apkfilename = process.argv[2]
var GameScore = AV.Object.extend("GameScore");
var gameScore = new GameScore();
gameScore.set("score", 1337);
gameScore.set("playerName", "Sean Plott");
gameScore.set("cheatMode", false);
gameScore.save(null, {
    success: function(gameScore) {
        // Execute any logic that should take place after the object is saved.
        console.log('New object created with objectId: ' + gameScore.id);
    },
    error: function(gameScore, error) {
        // Execute any logic that should take place if the save fails.
        // error is a AV.Error with an error code and description.
        console.log('Failed to create new object, with error code: ' + error.description);
    }
});
//var base64 = "V29ya2luZyBhdCBQYXJzZSBpcyBncmVhdCE=";
//var file = new AV.File("musictest.apk", { base64: base64 });
//var file = AV.File.withURL('musictest.apk', 'file://musictest.apk');

/*
fs.open('musictest.apk','r',function(err, fd){
    if(err){
        console.log(err.message);
        return;
    }
    var buffer =newBuffer(10000000);
    fs.read(fd, buffer,0,10000000,0,function(err, num){

        console.log("error");
    });
});
*/

var filebuffer = fs.readFileSync('musictest.apk','base64', function(error, file) {
    if(error) {

        console.log("error");
    } else {

        console.log("ok");
    }
});
console.log("filebuffer")
//console.log(filebuffer)
//var file = new AV.File("musictest.apk", filebuffer);
var file = new AV.File(apkfilename, { base64: filebuffer });

file.save().then(function() {
    // The file has been saved to AV.
    console.log("ok")
//    console.log(file)
    console.log(file['_url'])

}, function(error) {
    // The file either could not be read, or could not be saved to AV.
    console.log("fail")
});
AV.Push.send({
    channels: [ "Public" ],
    data: {
        alert: "Public message"
    }
});
