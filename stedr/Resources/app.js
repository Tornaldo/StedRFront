var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.Map = require("ti.map");

Alloy.Collections.wall = Alloy.createCollection("wall");

Alloy.Collections.story = Alloy.createCollection("story");

Alloy.Collections.instagram = Alloy.createCollection("instagram");

Ti.UI.orientation = Ti.UI.PORTRAIT;

Alloy.Collections.tweets = new Backbone.Collection();

Alloy.createController("index");