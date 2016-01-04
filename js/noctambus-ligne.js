
$(document).on('pageinit', '#Lignes', miseajour);
$(document).on('pageinit', '#page10', function () {
    if (ligneInfo.NUM_LIGNE ==0){
        effacer('#page10');
    }else{
        $.ajax({
            url: 'https://api.parse.com/1/classes/Lignes',
            headers: { 'X-Parse-Application-Id': 'PIKbWCJ808pCwESSaqPbOiey1v8YP9ju6osXBbAw', 'X-Parse-REST-API-Key': 'SHqOLSBw51SjSqbqebycKPZlg6NxgjTMyN7EcN2p' },
            type: 'GET',
            contentType: "application/json",
            data: 'where={"lineCode":"'+ligneInfo.NUM_LIGNE+'"}',
            success: function (result) {
                ajax2.parseJSONP(result);
            },
            error: function (request, error) {
                alert('Network error has occurred please try again!');
            }
        });
    }
});
$(document).on('pageinit', '#page11', function () {
    if (arretInfo.CODEARRETPHYSIQUE_ARRET ==0){
        effacer('#page11');
    }else{
        $.ajax({
            url: 'https://api.parse.com/1/classes/ArretsPhysique',
            headers: { 'X-Parse-Application-Id': 'PIKbWCJ808pCwESSaqPbOiey1v8YP9ju6osXBbAw', 'X-Parse-REST-API-Key': 'SHqOLSBw51SjSqbqebycKPZlg6NxgjTMyN7EcN2p' },
            type: 'GET',
            contentType: "application/json",
            data: 'where={"CodeArretPhysique":"'+arretInfo.CODEARRETPHYSIQUE_ARRET+'"}',
            success: function (result) {
                ajax3.parseJSONP(result);
                
            },
            error: function (request, error) {
                alert('Network error has occurred please try again!');
            }
        });
    }
});
function recuperationArretCom (){
     $.ajax({
        url: 'https://api.parse.com/1/classes/Arrets',
        headers: { 'X-Parse-Application-Id': 'PIKbWCJ808pCwESSaqPbOiey1v8YP9ju6osXBbAw', 'X-Parse-REST-API-Key': 'SHqOLSBw51SjSqbqebycKPZlg6NxgjTMyN7EcN2p' },
        type: 'GET',
        contentType: "application/json",
        data: 'where={"codeArret":"'+arretInfo.CODEARRETC_ARRET+'"}',
        success: function (result) {
            ajax4.parseJSONP(result);
        },
        error: function (request, error) {
            alert('Network error has occurred please try again!');
        }
    });

}

$(document).on('click', '#modifierLigne', function () {
    ligneInfo.NUM_LIGNE = $('#numLignes').val();
    ligneInfo.DEPART_LIGNE = $('#departLigne').val();
    ligneInfo.DESTINATION_LIGNE = $('#directionLigne').val();
    ligneInfo.ARRET_LIGNE = new Array();
    var myArr = $('#panArretLigne').find('li a ');
    $('#panArretLigne').find('li a ').each(function(){
        ligneInfo.ARRET_LIGNE.push($(this).attr('data-id'));
    });
    tab = "[";
    for (var i = 0 ;i< ligneInfo.ARRET_LIGNE.length ; i++) {
        if(i==ligneInfo.ARRET_LIGNE.length-1){
            tab = tab + "\""+ligneInfo.ARRET_LIGNE[i]+"\"";  
        }else{
            tab = tab + "\""+ligneInfo.ARRET_LIGNE[i]+"\",";        
        }
        }
        
    tab=tab+"]";
  $.ajax({
        url: 'https://api.parse.com/1/classes/ArretsPhysique',
        headers: { 'X-Parse-Application-Id': 'PIKbWCJ808pCwESSaqPbOiey1v8YP9ju6osXBbAw', 'X-Parse-REST-API-Key': 'SHqOLSBw51SjSqbqebycKPZlg6NxgjTMyN7EcN2p' },
        type: 'GET',
        contentType: "application/json",
        data: 'where={"codeArretPhysique":"'+arretInfo.CODEARRETC_ARRET+'"}',
        success: function (result) {
            ajax1.parseJSONP(result);
        },
        error: function (request, error) {
            alert('Network error has occurred please try again!');
        }
    });
    var ajax1 = {
    parseJSONP: function (result) {
        $.each(result.results, function (i, row) {
            $('#numLignes').val(row.lineCode );
            $('#departLigne').val(row.departName);
            $('#directionLigne').val(row.destinationName);
        });
    }
    }
    

    $.ajax1({
        url: 'https://api.parse.com/1/classes/Lignes/'+ligneInfo.OBJECTID_LIGNE,
        headers: { 'X-Parse-Application-Id': 'PIKbWCJ808pCwESSaqPbOiey1v8YP9ju6osXBbAw', 'X-Parse-REST-API-Key': 'SHqOLSBw51SjSqbqebycKPZlg6NxgjTMyN7EcN2p' },
        type: 'PUT',
        contentType: "application/json",
        data: '{"lineCode":"'+ligneInfo.NUM_LIGNE+'", "departName":"'+ligneInfo.DEPART_LIGNE+'", "destinationName":"'+ligneInfo.DESTINATION_LIGNE+'", "SequenceArret":{"__op":"AddUnique", "objects":'+tab+'}}',
        success: function (result) {
            $.mobile.changePage(href = "page7.html", { transition: "slide", changeHash: false });
            miseajour();
        },
        error: function (request, error) {
            alert('Network error has occurred please try again!');
        }
    });
    
});

$(document).on('click','#creerTicket', function(){
    ligneInfo.NUM_LIGNE = "0";
    $.mobile.changePage(href = "page10.html", { transition: "slide", changeHash: false });
});
$(document).on('vclick', '#panLigne li a', function () {
    ligneInfo.NUM_LIGNE = $(this).attr('data-id');
    $.mobile.changePage(href = "page10.html", { transition: "slide", changeHash: false });
  
});


var ajax = {
    parseJSONP: function (result) {
        $('#panLigne').empty();
        $.each(result.results, function (i, row) {
            $('#panLigne').append('<li><a href="" data-id="' + row.lineCode + '"><img src="./img/'+row.lineCode+'.png"> <h2>	' +row.lineCode+' </h2><p>'+ row.destinationName + '</p></a></li>');
        });
        $('#panLigne').listview('refresh');
    }
}
var ajax2 = {
    parseJSONP: function (result) {
        $.each(result.results, function (i, row) {
            $('#numLignes').val(row.lineCode );
            $('#departLigne').val(row.departName);
            $('#directionLigne').val(row.destinationName);
            ligneInfo.OBJECTID_LIGNE = row.objectId;        
            $('#supprimerLigne').show();
            $('#modifierLigne').show();
            $('#btnCreerLigne').hide();
            var numArret = 0;
            for (var i = 0 ; i < row.SequenceArret.length; i++) {
                numArret = i+1;
                 $('#panArretLigne').append('<li class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span><a href="" data-id="' + row.SequenceArret[i].CodeArretPhysique + '"><h2>  ' +numArret+'. '+row.SequenceArret[i].CodeArretPhysique+' </h2><p>'+ row.SequenceArret[i].stopName + '</p></a></li>');
            };
            $('#panArretLigne').listview('refresh');
            });
    }
}

var ajax3 = {
    parseJSONP: function (result) {
        $.each(result.results, function (i, row) {
            $('#codeArretPhysique').val(row.CodeArretPhysique );
            $('#codeArretCom').val(row.CodeArretC);
            $('#longitudeArret').val(row.Coordonnees.longitude);
            $('#latitudeArret').val(row.Coordonnees.latitude);
            arretInfo.OBJECTID_ARRETPHYSIQUE = row.objectId;
            arretInfo.CODEARRETC_ARRET = row.CodeArretC;       
            $('#supprimerLigne').show();
            $('#modifierLigne').show();
            $('#btnCreerLigne').hide();
            $('#panArretLigne').listview('refresh');
            });
            recuperationArretCom();
    }
}
/*var ajax4 = {
    parseJSONP: function (result) {
        $.each(result.results, function (i, row) {
            $('#codeArretPhysique').val(row.CodeArretPhysique );
            $('#codeArretCom').val(row.CodeArretC);
            $('#longitudeArret').val(row.Coordonnees.longitude);
            $('#latitudeArret').val(row.Coordonnees.latitude);
            arretInfo.OBJECTID_ARRETPHYSIQUE = row.objectId;
            arretInfo.CODEARRETC_ARRET = row.CodeArretC;       
            $('#supprimerLigne').show();
            $('#modifierLigne').show();
            $('#btnCreerLigne').hide();
            $('#panArretLigne').listview('refresh');
            });
            recuperationArretCom();
    }
}*/

function miseajour () {
    $.ajax({
        url: 'https://api.parse.com/1/classes/Lignes',
        headers: { 'X-Parse-Application-Id': 'PIKbWCJ808pCwESSaqPbOiey1v8YP9ju6osXBbAw', 'X-Parse-REST-API-Key': 'SHqOLSBw51SjSqbqebycKPZlg6NxgjTMyN7EcN2p' },
        type: 'GET',
        contentType: "application/json",
        data: 'order=lineCode',
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


var ligneInfo = {
    OBJECTID_LIGNE : null,
    NUM_LIGNE : null,
    DEPART_LIGNE : null,
    DESTINATION_LIGNE : null,
    ARRET_LIGNE : null,
}
var arretInfo = {
    OBJECTID_ARRETPHYSIQUE : null,
    OBJECTID_ARRETCOM : null,
    CODEARRETPHYSIQUE_ARRET : null,
    CODEARRETC_ARRET : null,
    LATITUDE_ARRET : null,
    LONGITUDE_ARRET : null,
}