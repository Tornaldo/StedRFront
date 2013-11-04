var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.baseServerUrl = "http://localhost:9000";

Alloy.Collections.wall = Alloy.createCollection("wall");

Alloy.Collections.story = Alloy.createCollection("story");

Alloy.Collections.instagram = Alloy.createCollection("instagram");

Ti.UI.orientation = Ti.UI.PORTRAIT;

Alloy.Collections.tweets = new Backbone.Collection();

Alloy.createController("index");