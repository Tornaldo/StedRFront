var args = arguments[0] || {};

var items = [
    {title:'sample 1', image:'http://www.lorempixel.com/700/600/'},
    {title:'sample 2', image:'http://www.lorempixel.com/900/1200/'},
    {title:'sample 3', image:'http://www.lorempixel.com/400/300/'},
    {title:'sample 4', image:'http://www.lorempixel.com/600/600/'},
    {title:'sample 5', image:'http://www.lorempixel.com/400/310/'},
    {title:'sample 6', image:'http://www.lorempixel.com/410/300/'},
    {title:'sample 7', image:'http://www.lorempixel.com/500/300/'},
    {title:'sample 8', image:'http://www.lorempixel.com/300/300/'},
    {title:'sample 9', image:'http://www.lorempixel.com/450/320/'},
    {title:'sample 10', image:'http://www.lorempixel.com/500/400/'},
    {title:'sample 11', image:'http://www.lorempixel.com/700/600/'},
    {title:'sample 12', image:'http://www.lorempixel.com/900/1200/'},
    {title:'sample 13', image:'http://www.lorempixel.com/400/300/'},
    {title:'sample 14', image:'http://www.lorempixel.com/600/600/'},
    {title:'sample 15', image:'http://www.lorempixel.com/400/310/'},
    {title:'sample 16', image:'http://www.lorempixel.com/410/300/'},
    {title:'sample 17', image:'http://www.lorempixel.com/500/300/'},
    {title:'sample 18', image:'http://www.lorempixel.com/300/300/'},
    {title:'sample 19', image:'http://www.lorempixel.com/450/320/'},
    {title:'sample 20', image:'http://www.lorempixel.com/500/400/'}
];

$.st.createGrid({
    columns:2,              //NUMBER OF COLUMNS. DEFAULT IS 4.
    space:10,               //SPACE BETWEEN EACH ELEMENT. DEFAULT IS 5.
    data:items,             //ARRAY WITH THE DATA TO DISPLAY. SEE SAMPLE DATA ABOVE.
    layout:'gallery',               //LAYOUT TYPE: gallery or customView. DEFAULT IS gallery.
    params:{
        padding:5,          //GALLERY ONLY.
        showTitle:true,        //GALLERY ONLY. True or False
        backgroundColor: '#eee',
        gridColor: '#ccc'
    },
    width: 320              //OPTIONAL. SCREEN'S WIDTH TO ADJUST GRID.
});

var data = $model;

Ti.API.info("Entering: " + data.get('name'));

var imageUrlList = data.get('pictures');

for(i = 0; i < imageUrlList.length; i++) {
	var wallImage = Ti.UI.createImageView({
		image : imageUrlList[i].url
	});
	$.imageScroller.addView(wallImage);
}

$.stedrWall.addEventListener('close', function() {
	Ti.API.info("Destroying: " + data.get('name'));
	$.destroy();
});
