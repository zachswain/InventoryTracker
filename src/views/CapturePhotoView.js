var m = require("mithril");
var PhotosModel = require("../models/PhotosModel");

var CapturePhotoView = function() {
    var width = 320;
    var height = 0;
    
    var streaming = false;
    
    var video = null;
    var canvas = null;
    var photo = null;
    var startbutton = null;
    
    return { 
        oninit : function(vnode) {
            console.log("CapturePhotoView oninit");
        },
        
        oncreate : function(vnode) {
            console.log("CapturePhotoView oncreate");
            video = document.getElementById('video');
            canvas = document.getElementById('canvas');
            startbutton = document.getElementById('startButton');
            
            navigator.mediaDevices.getUserMedia({video: { facingMode : "environment" }, audio: false})
                .then(function(stream) {
                  video.srcObject = stream;
                  video.play();
                }).catch(function(err) {
                    console.log("An error occurred: " + err);
                });
                
            video.addEventListener('canplay', function(ev){
                if (!streaming) {
                    height = video.videoHeight / (video.videoWidth/width);
                  
                    // Firefox currently has a bug where the height can't be read from
                    // the video, so we will make assumptions if this happens.
                  
                    if (isNaN(height)) {
                      height = width / (4/3);
                    }
                  
                    video.setAttribute('width', width);
                    video.setAttribute('height', height);
                    canvas.setAttribute('width', width);
                    canvas.setAttribute('height', height);
                    streaming = true;
                }
            }, false);
            
            startbutton.addEventListener('click', function(ev){
                takepicture();
                ev.preventDefault();
            }, false);
            
            clearphoto();
            
            function clearphoto() {
                var context = canvas.getContext('2d');
                context.fillStyle = "#AAA";
                context.fillRect(0, 0, canvas.width, canvas.height);
            
                var data = canvas.toDataURL('image/png');
                //photo.setAttribute('src', data);
            }

            function takepicture() {
                var context = canvas.getContext('2d');
                if (width && height) {
                    canvas.width = width;
                    canvas.height = height;
                    context.drawImage(video, 0, 0, width, height);
                    
                    var data = canvas.toDataURL('image/png');
                    PhotosModel.photos.push(data);
                    m.redraw();
                    //photo.setAttribute('src', data);
                } else {
                  clearphoto();
                }
            }
        },
        
        view : function(vnode) {
            console.log("CapturePhotoView view");
            
            return m("div", {}, [
                m("h1", {}, [ "Take photo" ]),
                m("div", { "class" : "camera" }, [
                    m("video", { "id" : "video", class : "vide-capture" }, []),
                    m("button", { "id" : "startButton" }, [ "Take photo" ]),
                    m(m.route.Link, { href : "/addNewItem" }, [
                        m("button", { "id" : "doneButton" }, [ "Done" ])
                    ])
                ]),
                m("canvas", { "id" : "canvas", "class" : "d-none" }, []),
                m("div", {}, [
                    "Photos: " + PhotosModel.photos.length
                ]),
                PhotosModel.photos.map(function(photo) {
                    return m("img", { "class" : "thumbnail", "src" : photo }, [])
                })
            ])
        }
    }
}

module.exports = CapturePhotoView;