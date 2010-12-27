_OFFLINE = false;

// DEFAULT LANGUAGES
var _SOURCE = 'en';
var _DEST = 'th';

try 
{
	google.load("language", "1");
} catch (ex) {    
	console.log(ex);
    _OFFLINE = true;
}

// TRANSLATE TEXT
function trans(text)	
{		
	try{
		google.language.translate(text, _SOURCE, _DEST, function(result) 
		{
			if (result.translation) 
			{			
				$("#result").html(result.translation);
			}
		});
	}catch(ex){
		console.log(ex);
		_OFFLINE = true;
	}
}

// DO WHEN HTML DOCUMENT IS READT
$(document).ready(function()
{			
		
	// Do translate when input text entered
	$("#input").keyup(function()
	{
		var text = $("#input").val();
		if(text == "")
			$("#result").html("");		
		else	
			trans(text);
	});
	
	// Select input language
	$("#ips").click(function()
	{ 
		window.location = window.location.pathname + "#select-input";
	});
	
	// Select output language
	$("#ops").click(function()
	{ 
		window.location = window.location.pathname + "#select-output";
	});	
	
	// Source language choose
	$(".in-lang").click(function()
	{ 
		_SOURCE = $(this).attr("value")
		$( ".ui-btn-text" , $("#ips-container")).html($(this).html());
		window.location = window.location.pathname+"#main";
		trans($("#input").val());
	});
	
	// Destination language choose
	$(".out-lang").click(function()
	{ 
		_DEST = $(this).attr("value");		
		$( ".ui-btn-text" , $("#ops-container")).html($(this).html());
		window.location = window.location.pathname+"#main";
		trans($("#input").val());
	});	
	

	// Save translation	
	$("#save-this").click(function()
	{ 
		var s = $("#input").val();
		var d = $("#result").html();
		if(s != "" && d != "")
		{
			var c = localStorage.getItem('qt-star-count');				
			if(c == null || c == -1)
				c = 0;			
			localStorage.setItem('qt-star-'+c, s+"|"+d+"~"+_DEST);	
			c++;
			localStorage.setItem('qt-star-count', c);
		}
	});	
	
	// Clear translation	
	$("#clear-this").click(function()
	{ 		
		$("#result").html("");
		$("#input").val("");			
	});	
	
	// Show saved translations
	$("#saved").click(function()
	{
		var c = localStorage.getItem('qt-star-count');		
		if(c == null || c == -1)
			$("#starred-list").html("<center>D'oh! No translations saved yet!</center>");
		else
		{				    
			$("#starred-list").html("");
		    ul = $("<ul>"); // create the ul element
			$("#starred-list").append(ul);  // attach the new ul		
		    for(var i=0; i<c; i++)
		    {
		    	var temp  = localStorage.getItem('qt-star-'+i);
		    	var s = temp.substring(0,temp.indexOf("|"));
		    	var d = temp.substring(temp.indexOf("|")+1, temp.indexOf("~"));
		    	var l = temp.substring(temp.indexOf("~") + 1);
		    	temp = "<span class='source-text'>" + s + "</span>" + 
		    		   "<br>" + 
		    		   "<span class='translated-text'>" + d + "</span>" +
		    		   "<div class='translated-lang'>"+l.toUpperCase()+"</div>";		   
		    		   
		    	ul.append("<li><div class='saved-translation'>" + temp + "</div></li>");
		    }
		    ul.listview({"inset": false});					  			
		}		
		window.location = window.location.pathname+"#starred";							
		$(".saved-translation").click(function()
		{			
			showLarge(  $(this).find(".translated-text").text() );			
		});
	});		
	
	// Remove saved translations
	$("#starred-clear").click(function()
	{	 
		var c = localStorage.getItem('qt-star-count');		
		if(c > -1)
		{
			for(var i=0; i<c; i++)
			{				
				localStorage.removeItem('qt-star-'+i);
			}
			c = -1;
			localStorage.setItem('qt-star-count', c);		
			$("#starred-list").html("");
		}
	});		
	
	$("#result").click(function()
	{		
		if($("#result").html()!=""){
			showLarge($("#result").html());
		}
	});
	
	// MOBILE BOOKMARK BUBBLE STUFF
	window.setTimeout(function() 
	{
		var bubble = new google.bookmarkbubble.Bubble();
	
	    var parameter = 'bmb=1';
	
	    bubble.hasHashParameter = function() {
	      return window.location.hash.indexOf(parameter) != -1;
	    };
	
	    bubble.setHashParameter = function() {
	      if (!this.hasHashParameter()) {
	        window.location.hash += parameter;
	      }
	    };
	
	    bubble.getViewportHeight = function() {
	      window.console.log('Example of how to override getViewportHeight.');
	      return window.innerHeight;
	    };
	
	    bubble.getViewportScrollY = function() {
	      window.console.log('Example of how to override getViewportScrollY.');
	      return window.pageYOffset;
	    };
	
	    bubble.registerScrollHandler = function(handler) {
	      window.console.log('Example of how to override registerScrollHandler.');
	      window.addEventListener('scroll', handler, false);
	    };
	
	    bubble.deregisterScrollHandler = function(handler) {
	      window.console.log('Example of how to override deregisterScrollHandler.');
	      window.removeEventListener('scroll', handler, false);
	    };
	
	    bubble.showIfAllowed();
	}, 1000);
	
							
});

function showLarge(text)
{
	$("#fulltext").html(text);
	window.location = window.location.pathname+"#full";		
}
