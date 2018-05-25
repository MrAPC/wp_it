/*********************************
 * Generiertes Quiz mit jquery und bootstrap
 * Autor: Peer Conradi und Hendrik Schwarmann
 */

/* Parameter:
* title: Der Titel des Quiz
* fragen: JSON Datei mit den einzelnen Fragen
*/

/* Aufbau der JSON Datei:
    Fragebogen
    + Namen
    + Autor
    + Schwirigkeit
    + Fragen [
        + Frage
    ]
*/

Element.prototype.quizJS = function (params) {

    var allefragen = [];
    var element = $(this);
    var karte = document.createElement("div");
    karte.classList.add("card");
    karte.classList.add("text-white");
    karte.classList.add("bg-secondary");
    element.append(karte);

    var kartenkopf = document.createElement("div");
    kartenkopf.classList.add("card-header");
    //kartenkopf.innerHTML = params.title;
    karte.append(kartenkopf);

    var kartenkoerper = document.createElement("div");
    kartenkoerper.classList.add("card-body");

    var quizform = document.createElement("form");
    kartenkoerper.append(quizform);

    karte.append(kartenkoerper);
    var jfile = $.getJSON(params.fragen, function (json) {
        console.log(json.Namen);
        //Durchgehen durch alle Fragen
        allefragen = json.Fragen;
        jQuery.each(json.Fragen, function (i, val) {

            var frage = document.createElement("div");
            frage.id = "question_" + i;
            frage.classList.add("form-group");
            var frage_text = document.createElement("label");
            frage_text.innerHTML = val.Frage;
            frage.append(frage_text);
            quizform.append(frage);
            console.log(i + ' - ' + val.type);
            if (val.type == "auswahl") {
                var auswahl = document.createElement("select");
                auswahl.id = "answer_" + i;
                auswahl.classList.add("form-control");
                auswahl.classList.add("antwort");
                jQuery.each(val.Antworten, function (i, antwort) {
                    var auswahlelement = document.createElement("option");

                    auswahlelement.innerText = antwort.Antwort;

                    auswahl.append(auswahlelement);
                });
                frage.append(auswahl);
            } else if (val.type == "eingabe") {
                var eingabe = document.createElement("input");
                eingabe.id = "answer_" + i;
                eingabe.classList.add("form-control");
                eingabe.classList.add("antwort");
                frage.append(eingabe);
            } else if (val.type == "schaetzung") {
                var eingabe = document.createElement("input");
                eingabe.id = "answer_" + i;
                eingabe.classList.add("form-control");
                eingabe.classList.add("antwort");
                frage.append(eingabe);
            }
        });
    });

    var kartenfuss = document.createElement("div");
    kartenfuss.classList.add("card-footer");

    var punktestand = document.createElement("div");
    punktestand.id = "punktestand";
    kartenkoerper.append(punktestand);

    var submitbutton = document.createElement("button");
    submitbutton.id = "submitquiz";
    submitbutton.classList.add("btn");
    submitbutton.classList.add("btn-success");
    submitbutton.innerText = "Fertig";
    kartenfuss.append(submitbutton);
    karte.append(kartenfuss);

    //Antworten überprüfen
    $('#submitquiz').click(function () {
        var fragengesamt = 0;
        var fragenrichtig = 0;

        console.log("Quiz abgegeben");
        $('.antwort').each(function (index) {
            fragengesamt += 1;
            console.log($(this).val());
            var fr = allefragen[index];
            console.log(fr);
            if (fr.type == "auswahl") {
                var richtig =
                    fr.Antworten.filter(function (data) {
                        return data.richtig == true
                    });
                console.log(richtig[0].Antwort);
                if ($(this).val() == richtig[0].Antwort) {
                    console.log("== richtige Antwort == ");
                    fragenrichtig += 1;
                } else {
                    $(this).addClass("is-invalid");
                    var wrongcallback = document.createElement("div")
                    wrongcallback.classList.add("invalid-feedback");
                    wrongcallback.innerText = "Das war falsch. Richtige Antwort: " + richtig[0].Antwort;
                    $(this).parent().append(wrongcallback);
                }
            } else if (fr.type == "eingabe") {
                var erlaubteAntworten = [];
                var richtig = fr.Antwort.toLowerCase();
                //Splitten der Antwort falls mehrere Existieren
                if (richtig.includes(";")) {
                    richtig.split(";").forEach(function (item) {
                        erlaubteAntworten.push(item.toLowerCase());
                    });
                }
                if ($(this).val().toLowerCase() == richtig || erlaubteAntworten.includes($(this).val().toLowerCase())) {
                    console.log("== richtige Antwort == ");
                    fragenrichtig += 1;
                } else {
                    $(this).addClass("is-invalid");
                    var wrongcallback = document.createElement("div")
                    wrongcallback.classList.add("invalid-feedback");
                    wrongcallback.innerText = "Das war falsch. Richtige Antwort: " + richtig;
                    $(this).parent().append(wrongcallback);
                }
            } else if (fr.type == "schaetzung") {
                var richtig = fr.Antwort;
                if ($(this).val() >= richtig - fr.Toleranz && $(this).val() <= richtig + fr.Toleranz) {
                    console.log("== richtige Antwort == ");
                    fragenrichtig += 1;
                } else {
                    $(this).addClass("is-invalid");
                    var wrongcallback = document.createElement("div")
                    wrongcallback.classList.add("invalid-feedback");
                    wrongcallback.innerText = "Das war falsch. Richtige Antwort: " + richtig;
                    $(this).parent().append(wrongcallback);
                }
            }
        }); //Fertig durch die Antworten

        //Deaktivieren des Quiz
        var elements = quizform.elements;
        for (var i = 0, len = elements.length; i < len; ++i) {
            elements[i].readOnly = true;
        }

        var antworttext = document.createElement("p");
        antworttext.innerText = fragenrichtig + " von " + fragengesamt + " Richtig beantwortet";
        punktestand.append(antworttext);

        var restartButton = document.createElement("a");
        restartButton.href = "javascript:location.reload();";
        restartButton.classList.add("btn");
        restartButton.classList.add("btn-success");
        restartButton.innerText = "Neustart";
        kartenfuss.append(restartButton);

        $(this).remove();
    })
    return true;
};