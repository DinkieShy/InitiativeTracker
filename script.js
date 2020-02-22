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
    	showBin();
    },
    stop: function(event, ui){
    	hideBin();
    	//console.log(ui.item[0].id.slice(5));
    	if($(`#${ui.item[0].id}`)[0].parentElement.id == "trashBin"){
    		removeToken(ui.item[0].id.slice(5));
    	}
    },
  	connectWith: "#trashBin",
  	scroll: false
  });

  $("#trashBin").sortable({
  	connectWith: "#foreground",
  	scroll: false
  });

  $("#add").click(addToken);
  $("#cancel").click(hideInput);
  $("#sortList").click(sortList);
  $("#nextTurn").click(shuffleList);

	console.log("init done");
});

function showBin(){
	$("#trashBin").removeClass("hidden");
  $('#trashBin').sortable("refresh");
}

function hideBin(){
	$("#trashBin").addClass("hidden");
}

function removeToken(id){
	for(var i = 0; i < tokens.length; i++){
		if(tokens[i].id == id){
			tokens.splice(i, 1);
			break;
		}
	}
	redrawList();
}

function showInput(){
	console.log("click");
	$('#enterInitiative').removeClass("hidden");
	$('#greyOut').removeClass("hidden");
}

function sortList(){
	tokens.sort(function(a, b){
		if(a.initiative < b.initiative){
			return 1;
		}
		else{
			return -1;
		}
	});
	redrawList();
}

function shuffleList(){
	tokens.push(tokens.shift());
	redrawList();
}

function redrawList(){
	$("#foreground")[0].innerHTML = "";
	for(var i = 0; i < tokens.length; i++){
		if(i == 0){
			$("#foreground")[0].innerHTML += `<div id=token${tokens[i].id} class="token activeToken"><label class="tokenName">${tokens[i].name}</label><label class="tokenInitiative">${tokens[i].initiative}</label></div>`;
		}
		else{
			$("#foreground")[0].innerHTML += `<div id=token${tokens[i].id} class="token"><label class="tokenName">${tokens[i].name}</label><label class="tokenInitiative">${tokens[i].initiative}</label></div>`;
		}
	}
}

function hideInput(){
	$('#enterInitiative').addClass("hidden");
	$("#intInput").val("");	
	$('#greyOut').addClass("hidden");
	$("#nameInput").val("");
}

function addNewToken(name, initiative){
	console.log("Adding new");
	newToken = new Token(name, initiative);
	tokens.push(newToken);
	classes = "token"
	if(tokens.length == 1) classes += " activeToken";
	$("#foreground")[0].innerHTML += `<div id=token${newToken.id} class="${classes}"><label class="tokenName">${name}</label><label class="tokenInitiative">${initiative}</label></div>`;
}

function addToken(){
	console.log("click");
	if($("#intInput").val() != "" && $("#nameInput").val() != ""){
		initiative = $("#intInput").val();
		name = $("#nameInput").val();
		addNewToken(name, initiative);
		hideInput();
	}
}
