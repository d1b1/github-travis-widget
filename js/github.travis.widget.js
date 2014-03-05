/*

https://github.com/alexanderbeletsky/github-commits-widget

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

*/

(function ($) {

    function widget(element, options, callback) {
        this.element = element;
        this.options = options;
        this.callback = $.isFunction(callback) ? callback : $.noop;
    }

    widget.prototype = (function() {

        function getBranches(user, repo, branch, callback) {

            var hash = 'githubReport-' + user + '-' + repo;
            var retrievedObject = localStorage.getItem(hash);

            // TODO: Add in an expiration value.
            if (retrievedObject)
                return callback(JSON.parse(retrievedObject))

            $.ajax({
                url: "https://api.github.com/repos/" + user + "/" + repo + "/branches?access_token=837c7979996dd8c2559defc974a269cc0cf075f9",
                dataType: 'jsonp',
                success: function(data) { 
                  localStorage.setItem(hash, JSON.stringify(data));
                  callback(data)
                }
            });
        }

        function getCommit(user, repo, branch, sha, callback) {
            $.ajax({
                url: "https://api.github.com/repos/" + user + "/" + repo + "/commits/" + sha,
                dataType: 'jsonp',
                success: callback
            });  
        }

        function getCommits(user, repo, branch, callback) {
            $.ajax({
                url: "https://api.github.com/repos/" + user + "/" + repo + "/commits?sha=" + branch,
                dataType: 'jsonp',
                success: callback
            });
        }

        function _widgetRun(widget) {
            if (!widget.options) {
                widget.element.append('<span class="error">Options for widget are not set.</span>');
                return;
            }
            var callback = widget.callback;
            var element = widget.element;
            var user = widget.options.user;
            var repo = widget.options.repo;
            var branch = widget.options.branch;

            var travisURL = 'https://travis-ci.org';

            if (widget.options.travis) {
                if (widget.options.travis.token) {
                  travisURL = 'https://magnum.travis-ci.com';
                  travisToken = widget.options.travis.token;
                }
            }

            getBranches(user, repo, branch, function (data) {
                var branches = data.data;
                element.empty();

                var list = $('<ul class="gr_widget">').appendTo(element);
                for (var c = 0; c < branches.length; c++) {
                    var cur = branches[c];

                    var li = $("<li>");
                    li.append(setName(cur.name));
                    li.append(setTravis(user, repo, cur.name));
                    li.append('&nbsp;')
                    li.append(setCoveralls(user, repo, cur.name));
                    list.append(li);
                }

                callback(element);

                function setName(branch) {
                    return $('<p>')
                            .html(branch);
                }

                function setTravis(user, repo, branch) {
                    return $('<a />')
                             .attr({ href: travisURL + '/' + user + '/' + repo + (travisToken ? '&token=' + travisToken : ''), target: '_blank' })
                             .append($('<img />').attr({ src: travisURL + '/' + user + '/' + repo + '.png?branch=' + branch + (travisToken ? '&token=' + travisToken : '') }));
                }

                function setCoveralls(user, repo, branch) {
                    return $('<a />') 
                             .attr({ href: 'https://coveralls.io/r/' + user + '/' + repo + '?branch=' + branch, target: '_blank' })
                             .append($('<img />').attr({ src: 'https://coveralls.io/repos/' + user + '/' + repo + '/badge.png?branch=' + branch }));
                }
            });
        }

        return {
            run: function () {
                _widgetRun(this);
            }
        };

    })();

    $.fn.githubBranchReport = function(options, callback) {
        this.each(function () {
            new widget($(this), options, callback)
                .run();
        });
        return this;
    };

})(jQuery);
