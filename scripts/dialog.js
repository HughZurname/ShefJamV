function loadFile(filename) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", filename, true);
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                return splitText(xhr.responseText);
                // return xhr.responseText;
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


loadFile("../assets/script/wakeup-sequence.txt");
let textSpace = document.getElementById("textSpace");
let lineNo = 0;
let testArray;

function logText(fileText) {
    console.log("The file text is:   \n" + fileText);

}

function splitText(fileText) {
    let linesArray = fileText.split("\n");
    testArray = linesArray;

}


setTimeout(function () {
    for (i = 0; i < 10; i++) {
        textSpace.innerHTML += testArray[lineNo] + "<br>"
        lineNo++;
    }
}, 5000)

// document.addEventListener('keypress', function (e) {
//     var key = e.which || e.keyCode;
//     if (key === 13) { // 13 is enter
//         testArray[lineNo].split(" ").map(w => textSpace.innerHTML += w + "");
//         lineNo++;
//     }
// });