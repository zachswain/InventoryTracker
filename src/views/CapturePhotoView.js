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
                    var ratio = width/64;
                    console.log("Resizing image from " + width + "x" + height + " to " + parseInt(width/ratio) + "x" + parseInt(height/ratio));
                    resizedDataURL(data, parseInt(width/ratio), parseInt(height/ratio)).then(function(data) {
                        console.log(data);
                        var photo = {
                            itemId : null,
                            data : data
                        }
                        PhotosModel.photos.push(photo);
                        m.redraw();
                    });
                    
                    //photo.setAttribute('src', data);
                } else {
                  clearphoto();
                }
            }
            
            // Takes a data URI and returns the Data URI corresponding to the resized image at the wanted size.
            function resizedDataURL(datas, wantedWidth, wantedHeight) {
                var promise = new Promise(function(resolve, reject) {
                    // We create an image to receive the Data URI
                    var img = document.createElement('img');
            
                    // When the event "onload" is triggered we can resize the image.
                    img.onload = function() {        
                        // We create a canvas and get its context.
                        var canvas = document.createElement('canvas');
                        var ctx = canvas.getContext('2d');
        
                        // We set the dimensions at the wanted size.
                        canvas.width = wantedWidth;
                        canvas.height = wantedHeight;
        
                        // We resize the image with the canvas method drawImage();
                        ctx.drawImage(this, 0, 0, wantedWidth, wantedHeight);
        
                        var dataURI = canvas.toDataURL();
        
                        /////////////////////////////////////////
                        // Use and treat your Data URI here !! //
                        /////////////////////////////////////////
                        resolve(dataURI);
                    };
            
                    // We put the Data URI in the image's src attribute
                    img.src = datas;    
                });
                
                return promise;
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
                    return m("img", { "class" : "thumbnail", "src" : photo.data }, [])
                })
            ])
        }
    }
}

module.exports = CapturePhotoView;