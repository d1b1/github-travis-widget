github.travis.widget
=================

This is a simple jQuery widget that provides branch report for branches Travis and Coveralls.io
status. It support both private and public travis tests. 

Installation
------------

Install bower component,

```bash
	$ bower install github.travis.widget
```

How to use
----------
Reference 'github.travis.widget.js' and containter div and place such script.

```html
<script>
	$(function() {
		$('#github-travis-widget').githubInfoWidget(
			{ user: 'alexanderbeletsky', repo: 'github.commits.widget', branch: 'master' });
	});
</script>
```

where, user is your github account, repo is name of repository and branch is the name of branch you want to track.

Configuration
-------------
You might limit number commits shown in widget by providing with 'last' parameter:

```html
<script>
	$(function() {
		$('#github-travis-widget').githubInfoWidget(
			{ user: 'visionmedia', repo: 'express', branch: 'master' });
	});
</script>
```

You can also provide a token ID for travis that will allow you to work with Travis-Pro.

```html
<script>
	$(function() {
		$('#github-commits').githubInfoWidget(
			{ user: 'visionmedia', repo: 'express', branch: 'master', travis: { token: 'XXXX' }});
	});
</script>
```

You can control the avatar size (in pixels) by providing avatarSize option. Default value is 20px.

```html
<script>
	$(function() {
		$('#github-commits').githubInfoWidget(
			{ user: 'alexanderbeletsky', repo: 'trackyt.api.csharp', branch: 'master', last: 15, limitMessageTo: 30, avatarSize: 33 });
	});
</script>
```

# Legal Info (MIT License)

Copyright (c) 2012 Alexander Beletsky

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
