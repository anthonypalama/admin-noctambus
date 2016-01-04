
$(document).on('pageinit', '#Arrets', miseajour);
$(document).on('pageinit', '#page11', function () {
    if (arretInfo.CODEARRETPHYSIQUE_ARRET ==0){
        effacer('#page11');
    }else{
        $.ajax({
            url: 'https://api.parse.com/1/classes/Arrets',
            headers: { 'X-Parse-Application-Id': 'PIKbWCJ808pCwESSaqPbOiey1v8YP9ju6osXBbAw', 'X-Parse-REST-API-Key': 'SHqOLSBw51SjSqbqebycKPZlg6NxgjTMyN7EcN2p' },
            type: 'GET',
            contentType: "application/json",
            data: 'where={"codeArret":"'+arretInfo.CODEARRETC_ARRET+'"}',
            success: function (result) {
                ajax2.parseJSONP(result);
                recuperationArretCom ()
            },
            error: function (request, error) {
                alert('Network error has occurred please try again!');
            }
        });
    }
});

$(document).on('vclick', '#panArret li a', function () {
    arretInfo.CODEARRETC_ARRET = $(this).attr('data-id');
    $.mobile.changePage(href = "page11.html", { transition: "slide", changeHash: false });
  
});

function recuperationArretCom (){
     $.ajax({
        url: 'https://api.parse.com/1/classes/ArretsPhysique',
        headers: { 'X-Parse-Application-Id': 'PIKbWCJ808pCwESSaqPbOiey1v8YP9ju6osXBbAw', 'X-Parse-REST-API-Key': 'SHqOLSBw51SjSqbqebycKPZlg6NxgjTMyN7EcN2p' },
        type: 'GET',
        contentType: "application/json",
        data: 'where={"CodeArretC":"'+arretInfo.CODEARRETC_ARRET+'"}',
        success: function (result) {
            ajax3.parseJSONP(result);
        },
        error: function (request, error) {
            alert('Network error has occurred please try again!');
        }
    });

}

var ajax = {
    parseJSONP: function (result) {
        $('#panArret').empty();
        $.each(result.results, function (i, row) {
            $('#panArret').append('<li><a href="" data-id="' + row.codeArret + '"> <h2>	' +row.nomArret+' </h2><p>'+ row.codeArret + '</p></a></li>');
        });
        $('#panArret').listview('refresh');
    }
}
var ajax2 = {
    parseJSONP: function (result) {
        $.each(result.results, function (i, row) {
            $('#codeArretCom').val(row.codeArret);
            $('#nomArret').val(row.nomArret);
            arretInfo.OBJECTID_ARRETCOM = row.objectId;
            for (var i = 0 ; i < row.ligneArret.length; i++) {
                 $('#panLigneArret').append('<li class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span><a href="" data-id="' + row.ligneArret[i] + '"><h2>  ' +row.ligneArret[i]+' </h2></a></li>');
            };
            $('#panLigneArret').listview('refresh');
            });
    }
}

var ajax3 = {
    parseJSONP: function (result) {
        $.each(result.results, function (i, row) {
            $('#codeArretPhysique').val(row.CodeArretPhysique );
            $('#longitudeArret').val(row.Coordonnees.longitude);
            $('#latitudeArret').val(row.Coordonnees.latitude);
            arretInfo.OBJECTID_ARRETPHYSIQUE = row.objectId;  
            $('#supprimerLigne').show();
            $('#modifierLigne').show();
            $('#btnCreerLigne').hide();
            });
    }
}

function miseajour () {
    $.ajax({
        url: 'https://api.parse.com/1/classes/Arrets',
        headers: { 'X-Parse-Application-Id': 'PIKbWCJ808pCwESSaqPbOiey1v8YP9ju6osXBbAw', 'X-Parse-REST-API-Key': 'SHqOLSBw51SjSqbqebycKPZlg6NxgjTMyN7EcN2p' },
        type: 'GET',
        contentType: "application/json",
        data: 'order=nomArret&limit=500',
        success: function (result) {
            ajax.parseJSONP(result);
        },
        error: function (request, error) {
            alert('Network error has occurred please try again!');
        }
    });
}
function effacer(id){
    $(':input',id)
   .not(':button, :submit')
   .val('');
   $('#supprimerLigne').hide();
   $('#modifierLigne').hide();
   $('#btnCreerLigne').show();
}
$(document).on('click','#creerArret', function(){
    arretInfo.CODE_ARRET = "0";
    $.mobile.changePage(href = "page11.html", { transition: "slide", changeHash: false });
});


var arretInfo = {
    OBJECTID_ARRETPHYSIQUE : null,
    OBJECTID_ARRETCOM : null,
    CODEARRETPHYSIQUE_ARRET : null,
    CODEARRETC_ARRET : null,
    LATITUDE_ARRET : null,
    LONGITUDE_ARRET : null,
    CODE_ARRET : null,
}