
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}


function loadWorld(){
	//readTextFile("levels/testlevel.txt");
	
		


	defaultWorld();
}
function defaultWorld(){
		player = {x: 50, y: 50,xvel:0,yvel:0,width:32,height:32,entitytype:"player"};
		entities.push(player);
		for(i=0;i<5;i++){
			var testfloor = {x: 0+192*i, y: 200,width:64,height:64,texture:"panel-1"};
			floors.push(testfloor);
			testfloor = {x: 64+192*i, y: 200,width:64,height:64,texture:"panel-2"};
			floors.push(testfloor);
			testfloor = {x: 128+192*i, y: 200,width:64,height:64,texture:"panel-3"};
			floors.push(testfloor);
		}
		var testfloor = {x: 192, y: 136,width:64,height:64,texture:"panel-1"};
		floors.push(testfloor);



}

function worldUpdates(){




}
