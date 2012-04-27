FML: Functional Markup Language
===============================

FML is a functional representation of HTML or more generally, XML.  It's meant
to be used in place of a templating engine, either client-side or server-side
using Node.js or anything supporting CommonJS modules.

Examples
--------

All tags have corresponding functions, and they all follow a similar pattern.

	br()
	// -> <br>

	div()
	// -> <div></div>

	div("Hello, World!")
	// -> <div>Hello, World!</div>

	divC("foo", "Bar!")
	// -> <div class='foo'>Bar!</div>

	divI("Foo", "Hello!")
	// -> <div id='Foo'>Hello!</div>

	divA({'class': 'box', style: 'width: 100px;'}, "Hello again!")
	// -> <div class='box' style='width: 100px;'>Hello again!</div>

In actuality, to output a string of HTML you need to pass the outputs of these
functions through fml.render().  The functions are easily composed, mapped,
passed around, whatever!

	function person(p) {
		return fml.liC('person',
			fml.helpers.a(p.link, p.name)
		);
	}

	function people(ps) {
		return fml.ulI('People', ps.map(person));
	}

	var ps = [
		{name: 'Chris', link: 'http://google.com'},
		{name: 'John', link: 'http://example.com'}
	];

	var output = fml.render(people(ps));
	/* ->
		<ul id='People">
			<li class='person'><a href='http://google.com'>Chris</a></li>
			<li class='person'><a href='http://example.com'>John</a></li>
		</ul>
	*/

More documentation to come!
