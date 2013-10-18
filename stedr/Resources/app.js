var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.baseServerUrl = "http://localhost:9000";

Alloy.Globals.Map = require("ti.map");

Alloy.Collections.wall = Alloy.createCollection("wall");

Alloy.createController("index");