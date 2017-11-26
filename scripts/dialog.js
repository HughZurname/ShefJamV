function loadFile(filename) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", filename, true);
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                return splitText(xhr.responseText);
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

let lineNo = 0;
let textArray;

function splitText(fileText) {
    let linesArray = fileText.split("\n");
    textArray = linesArray;

}

function printLines(textSpace = document.getElementById("textSpace")) {
    for (i = 0; i < textArray.length; i++) {
        textSpace.innerHTML += textArray[lineNo] + "<br>"
        lineNo++;
    }
}

function displayDialogue(file = "assets/script/wakeup-sequence.txt") {
    loadFile(file);
    !(gamestate == "menu") && textArray && printLines()
}