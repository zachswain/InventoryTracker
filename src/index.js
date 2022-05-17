import m from "mithril";
const AuthenticationModel = require("./models/AuthenticationModel");
const InventoryView = require("./views/InventoryView");
const EditItemView = require("./views/EditItemView");
const CapturePhotoView = require("./views/CapturePhotoView");
const EditTagsView = require("./views/EditTagsView");
const LoginView = require("./views/LoginView");
const bootstrap = require("bootstrap");
import 'bootstrap/dist/css/bootstrap.min.css';
require('bootstrap-icons/font/bootstrap-icons.css');
import './site.css';

m.route(document.body, "/", {
    "/" : InventoryView,
    "/addNewItem" : EditItemView,
    "/capturePhoto" : CapturePhotoView,
    "/editItem/:itemID" : EditItemView,
    "/editTags" : EditTagsView,
    "/login" : LoginView
});