var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.OS = Ti.Platform.osname;

"android" == Alloy.Globals.OS ? Alloy.Globals.Map = require("ti.map") : Alloy.Globals.Nav;

Alloy.Collections.wall = Alloy.createCollection("wall");

Alloy.Collections.story = Alloy.createCollection("story");

Alloy.Collections.instagram = Alloy.createCollection("instagram");

Ti.UI.orientation = Ti.UI.PORTRAIT;

Alloy.Collections.tweets = new Backbone.Collection();

Alloy.createController("index");