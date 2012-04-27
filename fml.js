/*
	FML: Functional Markup Language (lol)
*/

(function(fml) {

var htmlTag = [
	'br', 'col', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'wbr'
];

var htmlTags = [
	'a', 'abbr', 'address', 'area', 'article',
	'aside', 'audio', 'b', 'base', 'bdo', 'blockquote', 'body',
	'button', 'canvas', 'caption', 'cite', 'code',
	'colgroup', 'command', 'datalist', 'dd', 'del', 'details', 'dfn', 'div',
	'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer',
	'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup',
	'i', 'iframe', 'ins', 'keygen', 'kbd', 'label',
	'legend', 'li', 'map', 'mark', 'menu', 'meter', 'nav',
	'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p',
	'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script',
	'section', 'select', 'small', 'span', 'strong', 'style',
	'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th',
	'thead', 'time', 'title', 'tr', 'ul', 'var', 'video'
];

function flatten(A){
	var accum = [];
	function loop(a){
		var i, x;
		var L = a.length;
		for(i=0; i<L; i++){
			x = a[i];
			if(x instanceof Array){
				loop(x);
			}
			else{
				accum.push(x);
			}
		}
	}
	loop(A);
	return accum;
}

function f2a(k,v){
	if(v === null){
		return [];
	}
	else{
		return [k,'="',esc(v),'" '];
	}
}

function mapk(f, o){
	var b = [];
	var k;
	for(k in o){
		b.push(f(k, o[k]));
	}
	return b;
}

function esc(html){
	return html.toString()
		.replace(/&/g, '&amp;')
		.replace(/'/g, '&#039;')
		.replace(/"/g, '&quot;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}

/* Helpers to create all the shortcut tag functions */

function mkTagFunction(t) {
	return (function() { return fml.tag(t); })
}
function mkTagAFunction(t) {
	return (function(attrs) { return fml.tagA(t, attrs); })
}
function mkTagCFunction(t) {
	return (function(cl) { return fml.tagC(t, cl); })
}
function mkTagIFunction(t) {
	return (function(id) { return fml.tagI(t, id); })
}
function mkTagsFunction(t) {
	return (function(content) { return fml.tags(t, content); })
}
function mkTagsAFunction(t) {
	return (function(attrs, content) { return fml.tagsA(t, attrs, content); })
}
function mkTagsCFunction(t) {
	return (function(cl, content) { return fml.tagsC(t, cl, content); })
}
function mkTagsIFunction(t) {
	return (function(id, content) { return fml.tagsI(t, id, content); })
}

// Render a nested fml array as (ht)ml string
fml.render = function(aa){
	return $(flatten(aa).join(''));
};

// standard tag functions
fml.tag = function(t) { return ['<',t,'>']; };
fml.tagA = function(t, attrs) { return ['<',t,' ',mapk(f2a, attrs),'>']; };
fml.tagC = function(t, cl) { return fml.tagA(t, {'class': cl}); };
fml.tagI = function(t, id) { return fml.tagA(t, {id: id}); };
fml.tags = function(t, content) { return ['<',t,'>',content,'</',t,'>']; };
fml.tagsA = function(t, attrs, content) {
	return [
		'<',t,' ',mapk(f2a, attrs),'>',
		content,
		'</',t,'>'
	];
};
fml.tagsC = function(t, cl, content) {
	return fml.tagsA(t, {'class': cl}, content);
};
fml.tagsI = function(t, id, content) {
	return fml.tagsA(t, {id: id}, content);
};

// shortcut functions for all standard html tags
// non-closing tags (e.g. <img>, <br>, etc.)
for(i = 0, L = htmlTag.length; i < L; i++) {
	var t = htmlTag[i];
	fml[t] = mkTagFunction(t);
	fml[t+'A'] = mkTagAFunction(t);
	fml[t+'C'] = mkTagCFunction(t);
	fml[t+'I'] = mkTagIFunction(t);
}
// regular tags (e.g. <p>...</p>, <a>...</a>, etc.)
for(i = 0, L = htmlTags.length; i < L; i++) {
	var t = htmlTags[i];
	fml[t] = mkTagsFunction(t);
	fml[t+'A'] = mkTagsAFunction(t);
	fml[t+'C'] = mkTagsCFunction(t);
	fml[t+'I'] = mkTagsIFunction(t);
}

// a place for helper functions to live
fml.helpers = {};

// helper functions for commonly used tag / attribute combinations
fml.helpers.a = function(href, content) {
	return fml.aA({href: href}, content);
};
fml.helpers.aC = function(cl, href, content) {
	return fml.aA({'class': cl, href: href}, content);
};
// more TODO

// helper functions for tables and lists
// TODO

// helper functions for forms and inputs
fml.helpers.formC = function(cl, action, method, content) {
	return fml.formA({'class': cl, action: action, method: method}, content);
};
fml.helpers.labelC = function(cl, forId, content) {
	return fml.labelA({'class': cl, 'for': forId}, content);
};
fml.helpers.inputC = function(cl, type, name, value, id) {
	return fml.inputA({
		'class': cl, type: type, name: name, value: value, id: id
	});
};
// more TODO

})(typeof exports === 'undefined' ? this['fml']={}: exports);
