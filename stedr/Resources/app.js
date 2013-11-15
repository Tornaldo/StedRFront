var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

<<<<<<< HEAD
Alloy.Globals.OS = Ti.Platform.osname;
=======
Alloy.Globals.OS = "android";
>>>>>>> 43c6a1f7cc1941a2a7425bb6b775694f8cae97f7

"android" == Alloy.Globals.OS ? Alloy.Globals.Map = require("ti.map") : Alloy.Globals.Nav;

Alloy.Collections.wall = Alloy.createCollection("wall");

Alloy.Collections.story = Alloy.createCollection("story");

Alloy.Collections.instagram = Alloy.createCollection("instagram");

Ti.UI.orientation = Ti.UI.PORTRAIT;

Alloy.Collections.tweets = new Backbone.Collection();

Alloy.createController("index");