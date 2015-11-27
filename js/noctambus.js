$(document).on('pageinit', '#Ticket', function () {
    $.ajax({
        url: 'https://api.parse.com/1/classes/Tickets',
        headers: { 'X-Parse-Application-Id': 'PIKbWCJ808pCwESSaqPbOiey1v8YP9ju6osXBbAw', 'X-Parse-REST-API-Key': 'SHqOLSBw51SjSqbqebycKPZlg6NxgjTMyN7EcN2p' },
        type: 'GET',
        contentType: "application/json",
        data: 'order=code',
        data : 'where={"deleteTicket":false}',
        success: function (result) {
            ajax.parseJSONP(result);
        },
        error: function (request, error) {
            alert('Network error has occurred please try again!');
        }
    });
});

$(document).on('pageinit', '#page9', function () {

    $.ajax({
        url: 'https://api.parse.com/1/classes/Tickets',
        headers: { 'X-Parse-Application-Id': 'PIKbWCJ808pCwESSaqPbOiey1v8YP9ju6osXBbAw', 'X-Parse-REST-API-Key': 'SHqOLSBw51SjSqbqebycKPZlg6NxgjTMyN7EcN2p' },
        type: 'GET',
        contentType: "application/json",
        data: 'where={"code":"'+ticketInfo.CODE_TICKET+'"}',
        success: function (result) {
            ajax2.parseJSONP(result);
        },
        error: function (request, error) {
            alert('Network error has occurred please try again!');
        }
    });
});

$(document).on('click', '#modifierTicket', function () {
	ticketInfo.CODE_TICKET = $('#codeTpg').val();
    ticketInfo.DESCRIPTION_TICKET = $('#descriptionTicket').val();
    ticketInfo.PRIX_TICKET = parseFloat($('#prixTicket').val());
    ticketInfo.NAME_TICKET = $('#nameTicket').val();
	$.ajax({
        url: 'https://api.parse.com/1/classes/Tickets/'+ticketInfo.OBJECTID_TICKET,
        headers: { 'X-Parse-Application-Id': 'PIKbWCJ808pCwESSaqPbOiey1v8YP9ju6osXBbAw', 'X-Parse-REST-API-Key': 'SHqOLSBw51SjSqbqebycKPZlg6NxgjTMyN7EcN2p' },
        type: 'PUT',
        contentType: "application/json",
        data: '{"code":"'+ticketInfo.CODE_TICKET+'", "name":"'+ticketInfo.NAME_TICKET+'", "descriptionT":"'+ticketInfo.DESCRIPTION_TICKET+'", "prix":'+ticketInfo.PRIX_TICKET+'}',
        success: function (result) {
            $.mobile.changePage(href = "page3.html", { transition: "slide", changeHash: false });
            location.reload();
        },
        error: function (request, error) {
            alert('Network error has occurred please try again!');
        }
    });
    
});

$(document).on('click', '#supprimerTicket', function () {
	$.ajax({
        url: 'https://api.parse.com/1/classes/Tickets/'+ticketInfo.OBJECTID_TICKET,
        headers: { 'X-Parse-Application-Id': 'PIKbWCJ808pCwESSaqPbOiey1v8YP9ju6osXBbAw', 'X-Parse-REST-API-Key': 'SHqOLSBw51SjSqbqebycKPZlg6NxgjTMyN7EcN2p' },
        type: 'PUT',
        contentType: "application/json",
        data: '{"deleteTicket":true}',
        success: function (result) {
            $.mobile.changePage(href = "page3.html", { transition: "slide", changeHash: false });
            location.reload();
        },
        error: function (request, error) {
            alert('Network error has occurred please try again!');
        }
    });
    
});

$(document).on('click','#creerTicket', function(){

	$('#codeTpg').val("");
    $('#descriptionTicket').val("");
    $('#prixTicket').val("");
    $('#nameTicket').val("");

	$('#btnCreerTicket').show();
	$('#supprimerTicket').hide();
	$('#modifierTicket').hide();
});

$(document).on('vclick', '#panTicket li a', function () {
    ticketInfo.CODE_TICKET = $(this).attr('data-id');
    $.mobile.changePage(href = "page9.html", { transition: "slide", changeHash: false });
  
});


var ticketInfo = {
	OBJECTID_TICKET : null,
    CODE_TICKET : null,
    DESCRIPTION_TICKET : null,
    NAME_TICKET : null,
    PRIX_TICKET : null,
    

}
var ajax = {
    parseJSONP: function (result) {
        $.each(result.results, function (i, row) {
            $('#panTicket').append('<li><a href="" data-id="' + row.code + '"><img src="./img/'+row.namelogo+'.png"> <h2>	' +row.code+' </h2><p>'+ row.descriptionT + '</p></a></li>');
        });
        $('#panTicket').listview('refresh');
    }
}
var ajax2 = {
    parseJSONP: function (result) {
        $.each(result.results, function (i, row) {
            $('#codeTpg').val(row.code );
            $('#descriptionTicket').val(row.descriptionT);
            $('#prixTicket').val(row.prix);
            $('#nameTicket').val(row.name);
            ticketInfo.OBJECTID_TICKET = row.objectId;        });
			$('#supprimerTicket').show();
			$('#modifierTicket').show();
        	$('#btnCreerTicket').hide();
    }
}