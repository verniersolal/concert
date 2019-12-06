document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
});

function enableButton() {
    var submitBtn = document.getElementById("submitBtn");
    submitBtn.classList.replace("disabled","enabled");
}

function checkFile(event) {
    console.log("check file");
    const fileInput = document.getElementById("myfile") ;
    const formData = new FormData();

    formData.append('file', fileInput.files[0]);
    event.preventDefault();
    fetch('/check', {
        method: 'POST',
        body:formData
    }).then(function (response) {
        response.json().then(function (result) {
            switch (result) {
                case 'ok':
                    M.toast({html: 'Cet acte est certifié', classes: 'rounded green'});
                    break;
                case  'ko':
                    M.toast({html: 'Cet acte n\'est pas certifié ', classes: 'rounded red'});
                    break;
                default:
                    M.toast({html: 'Une erreur est survenue', classes: 'rounded orange'});
            }
        })
    });
}

function insertFile(event) {
    console.log("insert file");
    const fileInput = document.getElementById("myfile") ;
    const formData = new FormData();

    formData.append('file', fileInput.files[0]);
    event.preventDefault();
    fetch('/insert', {
        method: 'POST',
        body:formData
    }).then(function (response) {
        response.json().then(function (result) {
            console.log(result);
            switch (result) {
                case 'file inserted':
                    var instance = M.Modal.getInstance(document.getElementById("modal1"));
                    instance.close();
                    M.toast({html: 'Cet acte a été certifié avec succès', classes: 'rounded green'});
                    break;
                case  'ko':
                    M.toast({html: 'Cet acte n\'est pas certifié ', classes: 'rounded red'});
                    break;
                default:
                    M.toast({html: 'Une erreur est survenue', classes: 'rounded orange'});
            }
        })
    });
}

function openForm(event) {
    document.getElementById("certifBtn").classList.replace("disabled","enabled");
    document.getElementById("checkBtn").classList.replace("disabled","enabled");
    var formContainer = document.getElementById("formContainer");
    switch (event.target.id) {
        case 'checkBtn' :
            event.target.classList.replace("enabled","disabled");
            formContainer.innerHTML = "\t<fieldset>\n" +
                "\t\t\t<legend>Vérifiez l'authenticité d'un acte</legend>\n" +
                "\t\t\t<form id='form' enctype=\"multipart/form-data\">\n" +
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
                "\t\t\t\t\t<button id=\"submitBtn\" class=\"btn waves-effect waves-light disabled\" type=\"submit\"  onclick=\"checkFile(event)\">Vérifier\n" +
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
                "\t\t\t<form id='form' enctype=\"multipart/form-data\">\n" +
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
                "<a class=\"waves-effect waves-light btn disabled modal-trigger\" href=\"#modal1\" id='submitBtn'><i class=\"material-icons right\">send</i>Envoyer</a>\n"+
                "\t\t\t\t</div>\n" +
                "\t\t\t</form>\n" +
                "\t\t</fieldset>";
            formContainer.classList.replace("scale-out","scale-in");
            break;

    }

}