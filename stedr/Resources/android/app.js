var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var icons = require("/icons");

Alloy.Globals.OS = "android";

"android" == Alloy.Globals.OS ? Alloy.Globals.Map = require("ti.map") : Alloy.Globals.Nav;

Alloy.Collections.wall = Alloy.createCollection("wall");

Alloy.Collections.story = Alloy.createCollection("story");

Alloy.Collections.instagram = Alloy.createCollection("instagram");

Alloy.Collections.tweets = new Backbone.Collection();

Alloy.createController("index");