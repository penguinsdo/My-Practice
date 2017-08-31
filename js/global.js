function addLoadEvent(func) {
	var oldonload = window.onload;
	if(typeof window.onload != "function") {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func;
		}
	}
}

function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}

function addClass(element, value) {
	if(!element.className) {
		element.className = value;
	} else {
		newClassName = element.className;
		newClassName += " ";
		newClassName += value;
		element.className = newClassName;
	}
}

function hightlightPage() {
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;

	var headers = document.getElementsByTagName("header");
	if(headers.length == 0) return false;
	var navs = headers[0].getElementsByTagName("nav");
	if(navs.length == 0) return false;

	var links = navs[0].getElementsByTagName("a");
	var linkurl;
	for(var i = 0; i < links.length; i++) {
		linkurl = links[i].getAttribute("href");
		if(window.location.href.indexOf(linkurl) != -1) {
			addClass(links[i], "here");
			var linktext = links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute("id", linktext);
		}
	}
}
addLoadEvent(hightlightPage());

function moveElement(elementID, final_x, final_y, interval) {
	if(!document.getElementById) return false;
	if(!document.getElementById(elementID)) return false;

	var elem = document.getElementById(elementID);
	if(elem.movement) clearTimeout(elem.movement);

	if(!elem.style.left) elem.style.left = "0px";
	if(!elem.style.top) elem.style.top = "0px";
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);

	var dist = 0;

	if(xpos == final_x && ypos == final_y) return true;
	if(xpos < final_x) {
		dist = Math.ceil((final_x - xpos) / 10);
		xpos = xpos + dist;
	}
	if(xpos > final_x) {
		dist = Math.floor((final_x - xpos) / 10);
		xpos = xpos + dist;
	}
	if(ypos < final_y) {
		dist = Math.ceil((ypos - final_y) / 10);
		ypos = ypos + dist;
	}
	if(ypos > final_y) {
		dist = Math.floor((ypos - final_y) / 10);
		ypos = ypos + dist;
	}

	elem.style.left = xpos + 'px';
	elem.style.top = ypos + 'px';
	var repeat = 'moveElement("' + elementID + '",' + final_x + ',' + final_y + ',' + interval + ')';
	elem.movement = setTimeout(repeat, interval);
}

function prepareSlideshow() {
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById("intro")) return false;

	var intro = document.getElementById("intro");
	var slideshow = document.createElement("div");

	var frame = document.createElement("img");
	frame.setAttribute("src", "img/frame.gif");
	frame.setAttribute("alt", " ");
	frame.setAttribute("id", "frame");
	slideshow.appendChild(frame);

	slideshow.setAttribute("id", "slideshow");
	var preview = document.createElement("img");
	preview.setAttribute("src", "img/slideshow.gif");
	preview.setAttribute("alt", "a glimpse of what awaits you");
	preview.setAttribute("id", "preview");
	slideshow.appendChild(preview);
	insertAfter(slideshow, intro);

	var links = document.getElementsByTagName("a");
	var destination;
	for(var i = 0; i < links.length; i++) {
		links[i].onmouseover = function() {
			destination = this.getAttribute("href");
			if(destination.indexOf("index.html") != -1) {
				moveElement("preview", 0, 0, 5);
			}
			if(destination.indexOf("about.html") != -1) {
				moveElement("preview", -150, 0, 5);
			}
			if(destination.indexOf("photos.html") != -1) {
				moveElement("preview", -300, 0, 5);
			}
			if(destination.indexOf("live.html") != -1) {
				moveElement("preview", -450, 0, 5);
			}
			if(destination.indexOf("contact.html") != -1) {
				moveElement("preview", -600, 0, 5);
			}
		}
	}
}
addLoadEvent(prepareSlideshow());

function showSection(id) {
	var sections = document.getElementsByTagName("section");
	for(var i = 0; i < sections.length; i++) {
		if(sections[i].getAttribute("id") != id) {
			sections[i].style.display = "none";
		} else {
			sections[i].style.display = "block";
		}
	}
}

function prepareInternalnav() {
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;

	var articles = document.getElementsByTagName("article");
	if(articles.length == 0) return false;

	var navs = articles[0].getElementsByTagName("nav");
	if(navs.length == 0) return false;
	var nav = navs[0];

	var links = nav.getElementsByTagName("a");
	for(var i = 0; i < links.length; i++) {
		var sectionId = links[i].getAttribute("href").split("#")[1];
		if(!document.getElementById(sectionId)) continue;
		document.getElementById(sectionId).style.display = "none";
		links[i].destination = sectionId;
		links[i].onclick = function() {
			showSection(this.destination);
			return false;
		}
	}
}
addLoadEvent(prepareInternalnav());

function showPic(whicpic) {
	if(!document.getElementById("placeholder")) return true;

	var source = whicpic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	placeholder.setAttribute("src", source);

	if(!document.getElementById("description")) return false;
	var description = document.getElementById("description");
	if(whicpic.getAttribute("title")) {
		var text = whicpic.getAttribute("title");
	} else {
		var text = " ";
	}
	if(description.firstChild.nodeType == 3) {
		description.firstChild.nodeValue = text;
		return false;
	}
}

function preparePlaceholder() {
	if(!document.getElementById) return false;
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	if(!document.getElementById("imagegallery")) return false;

	var placeholder = document.createElement("img");
	placeholder.setAttribute("id", "placeholder");
	placeholder.setAttribute("src", "img/placeholder.gif");
	placeholder.setAttribute("alt", "Choose an image");

	var description = document.createElement("p");
	description.setAttribute("id", "description");
	var descText = document.createTextNode("Choose an image");
	description.appendChild(descText);

	var gallery = document.getElementById("imagegallery");
	insertAfter(description, gallery);
	insertAfter(placeholder, description);
}

function prepareGallery() {
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById("imagegallery")) return false;

	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for(var i = 0; i < links.length; i++) {
		links[i].onclick = function() {
			return showPic(this);
		}
	}
}

addLoadEvent(preparePlaceholder());
addLoadEvent(prepareGallery());

function stripeTables() {
	if(!document.getElementsByTagName) return false;

	var tables = document.getElementsByTagName("table");
	for(var i = 0; i < tables.length; i++) {
		var rows = tables[i].getElementsByTagName("tr");
		var odd = false;
		for(var j = 0; j < rows.length; j++) {
			if(odd == true) {
				addClass(rows[j], "odd");
				odd = false;
			} else {
				odd = true;
			}
		}
	}
}
addLoadEvent(stripeTables());

function highlightRows() {
	if(!document.getElementsByTagName) return false;

	var rows = document.getElementsByTagName("tr");
	for(var i = 0; i < rows.length; i++) {
		rows[i].oldClassName = rows[i].className;
		rows[i].onmouseover = function() {
			addClass(this, "highlight");
		}
		rows[i].onmouseout = function() {
			this.className = this.oldClassName;
		}
	}
}
addLoadEvent(highlightRows());

function displayAbbreviations() {
	if(!document.getElementsByTagName) return false;
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;

	var abbreviations = document.getElementsByTagName("abbr");
	if(abbreviations.length < 1) return false;
	var defs = new Array();
	for(var i = 0; i < abbreviations.length; i++) {
		var current_abbr = abbreviations[i];
		if(current_abbr.childNodes.length < 1) continue;
		var definition = current_abbr.getAttribute("title");
		var key = current_abbr.lastChild.nodeValue;
		defs[key] = definition;
	}
	var dlist = document.createElement("dl");
	for(key in defs) {
		var definition = defs[key];
		var dtitle = document.createElement("dt");
		var dtitleText = document.createTextNode(key);
		dtitle.appendChild(dtitleText);
		var ddesc = document.createElement("dd");
		var ddescText = document.createTextNode(definition);
		ddesc.appendChild(ddescText);
		dlist.appendChild(dtitle);
		dlist.appendChild(ddesc);
	}
	if(dlist.childNodes.length < 1) return false;
	var header = document.createElement("h3");
	var headerText = document.createTextNode("Abbreviations");
	header.appendChild(headerText);
	var articles = document.getElementsByTagName("article");
	if(articles.length < 1) return false;
	var container = articles[0];
	container.appendChild(header);
	container.appendChild(dlist);
}
addLoadEvent(displayAbbreviations());

function focusLabels() {
	if(!document.getElementsByTagName) return false;
	var labels = document.getElementsByTagName("label");
	for(var i = 0; i < labels.length; i++) {
		if(!labels[i].getAttribute("for")) continue;
		labels[i].onclick = function() {
			var id = this.getAttribute("for");
			if(!document.getElementById(id)) return false;
			var element = document.getElementById(id);
			element.focus();
		}
	}
}
addLoadEvent(focusLabels());

function resetFields(whichform) {
	if(Modernizr.input.placeholder) return;
	for(var i = 0; i < whichform.elements.length; i++) {
		var element = whichform.elements[i];
		if(element.type == "submit") continue;
		var check = element.placeholder || element.getAttribute("placeholder");
		if(!check) continue;
		element.onfocus = function() {
			var text = this.placeholder || this.getAttribute("placeholder");
			if(this.value == text) {
				this.className = "";
				this.value = "";
			}
		}
		element.onblur = function() {
			var text = this.placeholder || this.getAttribute("placeholder");
			if(this.value == "") {
				this.className = "placeholder";
				this.value = text;
			}
		}
		element.onblur();
	}
}

function isFilled(field) {
	if(field.value.replace(" ", "").length == 0) return false;
	var placeholder = field.placeholder || field.getAttribute("placeholder");
	return(field.value != placeholder);
}

function isEmail(field) {
	return(field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
}

function validateForm(whichform) {
	var elements = whichform.elements;
	for(var i = 0; i < elements.length; i++) {
		var element = elements[i];
		if(element.required || element.getAttribute("required")) {
			if(!isFilled(element)) {
				alert("Please fill in the " + element.name + " field.");
				return false;
			}
		}
		if(element.type == "email" || element.getAttribute("type") == "email") {
			if(!isEmail(element)) {
				alert("The " + element.name + " field must b a valid email address.");
				return false;
			}
		}
	}
	return true;
}

function getHTTPObject() {
	if(typeof XMLHttpRequest == "undefined") {
		XMLHttpRequest = function() {
			try {
				return new ActiveOAbject("Msxml2.XMLHTTP.6.0");
			} catch(e) {}
			try {
				return new ActiveXObject("Msxml2.XMLHTTP.3.0");
			} catch(e) {}
			try {
				return new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {}
			return false;
		}
	}
	return new XMLHttpRequest();
}

function displayAjaxLoading(element) {
	while(element.hasChildNodes()) {
		element.removeChild(element.lastChild);
	}
	var content = document.createElement("img");
	content.setAttribute("src", "img/loading.gif");
	content.setAttribute("alt", "loading...");
	element.appendChild(content);
}

function submitFormWithAjax(whichform, thetarget) {
	var request = getHTTPObject();
	if(!request) return false;
	displayAjaxLoading(thetarget);
	var dataParts = [];
	var element;
	for(var i = 0; i <whichform.elements.length; i++) {
		element = whichform.elements[i];
		dataParts[i] = element.name + "=" + encodeURIComponent(element.value);
	}
	var data = dataParts.join("&");
	request.open("POST", whichform.getAttribute("action"), true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.onreadystatechange = function() {
		if(request.readyState == 4) {
			console.log(request);
			console.log(request.status);
			if(request.status == 200 || request.status == 0) {
				var matchs = request.responseText.match(/<article>([\s\S]+)<\/article>/);
				if(matchs.length > 0) {
					thetarget.innerHTML = matchs[1];
				} else {
					thetarget.innerHTML = "<p>Oops, there was an erroe. Sorry.</p>"
				}
			} else {
				thetarget.innerHTML = "<p>" + request.statusText + "</p>";
			}
		}
	}
	request.send(data);
	return true;
}

function prepareForms() {
	for(var i = 0; i < document.forms.length; i++) {
		var thisForm = document.forms[i];
		resetFields(thisForm);
		thisForm.onsubmit = function() {
			if(!validateForm(this)) return false;
			var article = document.getElementsByTagName("article")[0];
			if(submitFormWithAjax(this, article)) return false;
			return true;
		}
	}
}
addLoadEvent(prepareForms());