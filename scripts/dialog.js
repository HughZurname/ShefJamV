function loadFile(filename)
{
   var xhr = new XMLHttpRequest();
	xhr.open("GET", filename, true);
	xhr.onload = function (e) {
	  if (xhr.readyState === 4) {
	    if (xhr.status === 200) {
	      console.log(xhr.responseText);
		return printText(xhr.responseText);
	    } else {
	      console.error(xhr.statusText);
	    }
	  }
	};
	xhr.onerror = function (e) {
	  console.error(xhr.statusText);
	};
	xhr.send(null);
}

function printNextLine(line) {
    let chars = line.split("");
    for (let j = 0; j < chars.length; j++){
        setTimeout(function(){updateText(chars[j])}, 100);
    }
}

function updateText(char){
    let textbox = document.getElementById("textSpace");
    textbox.innerHTML += char; 
}


function printText(file){
    for (let i = 0; i<file.length(); i++){
        readInLines(line);
    }

    for (let i = 0; i < lines.length; i++){
        
        printNextLine(lines[i]);
        
    }

}

loadFile("../assets/script/wakeup-sequence.txt");
document.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      console.log("enter key pressed");
    }
});

let linesArray = [];

function readInLines(currentLine){
    linesArray.push(currentLine);
}