var ligneInfo = {
    OBJECTID_LIGNE : null,
    NUM_LIGNE : null,
    NOM_LIGNE : null,
    DIRECTION_LIGNE : null,
    ARRET_LIGNE : null,
    LOGO_LIGNE : null,
}
$(document).on('pageinit', '#Lignes', miseajour);
function miseajour () {
    $.ajax({
        url: 'https://api.parse.com/1/classes/Lignes',
        headers: { 'X-Parse-Application-Id': 'PIKbWCJ808pCwESSaqPbOiey1v8YP9ju6osXBbAw', 'X-Parse-REST-API-Key': 'SHqOLSBw51SjSqbqebycKPZlg6NxgjTMyN7EcN2p' },
        type: 'GET',
        contentType: "application/json",
        data: 'order=numLignes',
        success: function (result) {
            ajax.parseJSONP(result);
        },
        error: function (request, error) {
            alert('Network error has occurred please try again!');
        }
    });
}



$(document).on('click','#creerTicket', function(){
    ligneInfo.NUM_LIGNE = "0";
    $.mobile.changePage(href = "page10.html", { transition: "slide", changeHash: false });
});
var ajax = {
    parseJSONP: function (result) {
        $('#panLigne').empty();
        $.each(result.results, function (i, row) {
            $('#panLigne').append('<li><a href="" data-id="' + row.numLignes + '"><img src="./img/'+row.logoLigne+'.png"> <h2>	' +row.numLignes+' </h2><p>'+ row.Direction + '</p></a></li>');
        });
        $('#panLigne').listview('refresh');
    }
}
