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
    var element = $(this);
    var karte = document.createElement("div");
    karte.classList.add("card");
    karte.classList.add("text-white");
    karte.classList.add("bg-secondary");
    element.append(karte);

    var kartenkopf = document.createElement("div");
    kartenkopf.classList.add("card-header");
    kartenkopf.innerHTML = params.title;
    karte.append(kartenkopf);

    var kartenkoerper = document.createElement("div");
    kartenkoerper.classList.add("card-body");
    karte.append(kartenkoerper);
    var jfile = $.getJSON(params.fragen, function (json) {
        console.log(json.Namen);
        //Durchgehen durch alle Fragen
        jQuery.each(json.Fragen, function (i, val) {
            var frage = document.createElement("div");
            frage.classList.add("form-group");
            var frage_text = document.createElement("label");
            frage_text.innerHTML = val.Frage;
            frage.append(frage_text);
            kartenkoerper.append(frage);
            console.log(i + ' - ' + val.Frage);
        });
    });

}