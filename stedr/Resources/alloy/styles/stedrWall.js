module.exports = [ {
    isApi: true,
    priority: 1000.0014,
    key: "Label",
    style: {
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 5,
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
    priority: 1000.0015,
    key: "Tab",
    style: {
        backgroundColor: "#9B8D8D",
        backgroundSelectedColor: "#40B0D2"
    }
}, {
    isClass: true,
    priority: 10000.0013,
    key: "container",
    style: {
        backgroundColor: "white"
    }
}, {
    isId: true,
    priority: 100000.0016,
    key: "wallTitle",
    style: {}
}, {
    isId: true,
    priority: 100000.0017,
    key: "wallImages",
    style: {}
} ];