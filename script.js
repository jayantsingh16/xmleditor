function readFile(file) {
    var reader = new FileReader();
    reader.onload = function (evt) {
        var textContents = evt.target.result;
        console.log(textContents);
    };
    reader.readAsText(file);
}

var readFileBtn = document.getElementById('xml1');
readFileBtn.addEventListener('click', function () {
    readFile('users.txt');
});