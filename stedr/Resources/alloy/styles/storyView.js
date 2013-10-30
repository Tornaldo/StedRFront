module.exports = [ {
    isApi: true,
    priority: 1000.003,
    key: "Label",
    style: {
        color: "white",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontFamily: "Helvetica",
            fontSize: "15dp",
            fontStyle: "normal",
            fontWeight: "normal"
        }
    }
}, {
    isClass: true,
    priority: 10000.0028,
    key: "container",
    style: {
        backgroundColor: "white"
    }
}, {
    isId: true,
    priority: 100000.0029,
    key: "storyTitle",
    style: {
        color: "white",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontFamily: "Helvetica",
            fontSize: "20dp",
            fontStyle: "normal",
            fontWeight: "normal"
        }
    }
} ];