module.exports = [ {
    isApi: true,
    priority: 1000.0006,
    key: "Label",
    style: {
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: true,
        color: "#000",
        font: {
            fontFamily: "Helvetica",
            fontSize: "30dp",
            fontStyle: "normal",
            fontWeight: "normal"
        }
    }
}, {
    isApi: true,
    priority: 1000.0007,
    key: "Tab",
    style: {
        title: 40,
        color: "#00ff00"
    }
}, {
    isClass: true,
    priority: 10000.0005,
    key: "container",
    style: {
        backgroundColor: "white"
    }
}, {
    isId: true,
    priority: 100000.0008,
    key: "wallTitle",
    style: {}
}, {
    isId: true,
    priority: 100000.0009,
    key: "wallImages",
    style: {}
} ];