  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, options);
  });

function goPython(){
    var file = document.getElementById('myfile').value;
    file = file.split("\\")[2]
    $.ajax({
        "headers":{
            "Access-Control-Allow-Origin": "*"
        },
        "url": "http://localhost:5000/goPython/"+file,
        "Content-Type": "text/plain;charset=UTF-8",
        "method":"GET",


    }).then(function(data) {
        document.getElementById('resp').innerText = data;
    });
}

function enableButton() {
    var submitBtn = document.getElementById("submitBtn");
    submitBtn.classList.replace("disabled","enabled");
}

function openForm(event) {
    console.log(event.target.id);
    document.getElementById("certifBtn").classList.replace("disabled","enabled");
    document.getElementById("checkBtn").classList.replace("disabled","enabled");
    var formContainer = document.getElementById("formContainer");
    switch (event.target.id) {
        case 'checkBtn' :
            event.target.classList.replace("enabled","disabled");
            formContainer.innerHTML = "\t<fieldset>\n" +
                "\t\t\t<legend>Vérifiez l'authenticité d'un acte</legend>\n" +
                "\t\t\t<form id='form' method=\"post\" action=\"/upload\" enctype=\"multipart/form-data\">\n" +
                "\t\t\t\t<div class=\"file-field input-field\">\n" +
                "\t\t\t\t\t<div class=\"btn\">\n" +
                "\t\t\t\t\t\t<i class=\"material-icons\">attach_file</i>\n" +
                "\t\t\t\t\t\t<input onchange=\"enableButton()\" accept=\".pdf\" id=\"myfile\" name=\"file\" type=\"file\">\n" +
                "\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t<div class=\"file-path-wrapper\">\n" +
                "\t\t\t\t\t\t<input class=\"file-path validate\" placeholder=\"Déposez votre acte\"  type=\"text\">\n" +
                "\t\t\t\t\t</div>\n" +
                "\t\t\t\t</div>\n" +
                "\t\t\t\t<div class=\"center\">\n" +
                "\t\t\t\t\t<button id=\"submitBtn\" class=\"btn waves-effect waves-light disabled\" type=\"submit\"  onclick=\"goPython()\">Vérifier\n" +
                "\t\t\t\t\t\t<i class=\"material-icons right\">send</i>\n" +
                "\t\t\t\t\t</button>\n" +
                "\t\t\t\t</div>\n" +
                "\t\t\t</form>\n" +
                "\t\t</fieldset>";
            formContainer.classList.replace("scale-out","scale-in");
            break;
        case 'certifBtn':
            event.target.classList.replace("enabled","disabled");
            formContainer.innerHTML = "<fieldset>\n" +
                "\t\t\t<legend>Certifiez un acte</legend>\n" +
                "\t\t\t<form id='form' method=\"post\" action=\"/insert\" enctype=\"multipart/form-data\">\n" +
                "\t\t\t\t<div class=\"file-field input-field\">\n" +
                "\t\t\t\t\t<div class=\"btn\">\n" +
                "\t\t\t\t\t\t<i class=\"material-icons\">attach_file</i>\n" +
                "\t\t\t\t\t\t<input onchange=\"enableButton()\" accept=\".pdf\" id=\"myfile\" name=\"file\" type=\"file\">\n" +
                "\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t<div class=\"file-path-wrapper\">\n" +
                "\t\t\t\t\t\t<input class=\"file-path validate\" placeholder=\"Déposez votre acte\"  type=\"text\">\n" +
                "\t\t\t\t\t</div>\n" +
                "\t\t\t\t</div>\n" +
                "\t\t\t\t<div class=\"center\">\n" +
                "\t\t\t\t\t<button id=\"submitBtn\" class=\"btn waves-effect waves-light disabled\" type=\"submit\" href=\"#modal1\"  onclick=\"goPython()\">Envoyer\n" +
                "\t\t\t\t\t\t<i class=\"material-icons right\">send</i>\n" +
                "\t\t\t\t\t</button>\n" +
                "\t\t\t\t</div>\n" +
                "\t\t\t</form>\n" +
                "\t\t</fieldset>";
            formContainer.classList.replace("scale-out","scale-in");
            break;

    }

}