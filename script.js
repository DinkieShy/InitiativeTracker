tokenID = 0;
tokens = [];

function Token(name, initiative){
	this.initiative = initiative || 10;
	this.name = name || "Default";
	this.id = tokenID;
	tokenID += 1;
	return this;
}

$(document).ready(function(){
	console.log("init");

	$("#addToken").click(showInput);
	

	$("#foreground").sortable({
		start: function(event, ui){
    	ui.helper.height("64px");
    }
  });

  $("#add").click(addToken);
  $("#cancel").click(hideInput);

	console.log("init done");
});

function showInput(){
	console.log("click");
	$('#enterInitiative').removeClass("hidden");
	$('#greyOut').removeClass("hidden");
}

function hideInput(){
	$('#enterInitiative').addClass("hidden");
	$('#greyOut').addClass("hidden");	
}

function addNewToken(name, initiative){
	console.log("Adding new");
	newToken = new Token(name, initiative);
	tokens.push(newToken);
	$("#foreground")[0].innerHTML += `<div id=token${newToken.id} class="token"><label class="tokenName">${name}</label><label class="tokenInitiative">${initiative}</label></div>`;
}

function addToken(){
	console.log("click");
	if($("#intInput").val() != "" && $("#nameInput").val() != ""){
		hideInput();
		initiative = $("#intInput").val();
		$("#intInput").val("");
		name = $("#nameInput").val();
		$("#nameInput").val("");
		addNewToken(name, initiative);
	}
}
