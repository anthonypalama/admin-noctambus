
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
            data: 'where={"numLignes":"'+ligneInfo.NUM_LIGNE+'"}',
            success: function (result) {
                ajax2.parseJSONP(result);

            },
            error: function (request, error) {
                alert('Network error has occurred please try again!');
            }
        });
    }
});

$(document).on('click', '#modifierLigne', function () {
    ligneInfo.NUM_LIGNE = $('#numLignes').val();
    ligneInfo.NOM_LIGNE = $('#nomLigne').val();
    ligneInfo.DIRECTION_LIGNE = $('#directionLigne').val();
    ligneInfo.LOGO_LIGNE = $('#logoLigne').val();
    ligneInfo.ARRET_LIGNE = new Array();
    var myArr = $('#panArrets').find('li a ');
    $('#panArrets').find('li a ').each(function(){
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
    console.log(tab);
    $.ajax({
        url: 'https://api.parse.com/1/classes/Lignes/'+ligneInfo.OBJECTID_LIGNE,
        headers: { 'X-Parse-Application-Id': 'PIKbWCJ808pCwESSaqPbOiey1v8YP9ju6osXBbAw', 'X-Parse-REST-API-Key': 'SHqOLSBw51SjSqbqebycKPZlg6NxgjTMyN7EcN2p' },
        type: 'PUT',
        contentType: "application/json",
        data: '{"numLignes":"'+ligneInfo.NUM_LIGNE+'", "nom":"'+ligneInfo.NOM_LIGNE+'", "Direction":"'+ligneInfo.DIRECTION_LIGNE+'", "logoLigne":"'+ligneInfo.LOGO_LIGNE+'", "Arrets":{"__op":"AddUnique", "objects":'+tab+'}}',
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
            $('#panLigne').append('<li><a href="" data-id="' + row.numLignes + '"><img src="./img/'+row.logoLigne+'.png"> <h2>	' +row.numLignes+' </h2><p>'+ row.Direction + '</p></a></li>');
        });
        $('#panLigne').listview('refresh');
    }
}
var ajax2 = {
    parseJSONP: function (result) {
        $.each(result.results, function (i, row) {
            $('#numLignes').val(row.numLignes );
            $('#nomLigne').val(row.nom);
            $('#directionLigne').val(row.Direction);
            $('#logoLigne').val(row.logoLigne);
            ligneInfo.OBJECTID_LIGNE = row.objectId;        
            $('#supprimerTicket').show();
            $('#modifierTicket').show();
            $('#btnCreerTicket').hide();
            var numArret = 0;
            for (var i = 0 ; i < row.Arrets.length; i++) {
                numArret = i+1;
                 $('#panArrets').append('<li><a href="" data-id="' + row.Arrets[i] + '"><h2>  ' +numArret+' '+row.Arrets[i]+' </h2></a></li>');
            };
            $('#panArrets').listview('refresh');
            });
    }
}

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
    NOM_LIGNE : null,
    DIRECTION_LIGNE : null,
    ARRET_LIGNE : null,
    LOGO_LIGNE : null,
}