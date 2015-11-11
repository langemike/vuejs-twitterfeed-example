var twitterFeed = new Vue({
    el: '.twitter-feed',
    props: ['q', 'count'],
    computed: {
        query: function() {
            var data = {};
            for (var key in this._props) {
                if (this._props[key].raw) {
                    data[key] = this._props[key].raw;
                }
            }
            return data;
        }
    },
    data: {
        tweets: null
    },
    filters: {
        autoLink: function(value) {
            value = value.replace(/https?:\/\/\S+/g, '<a href="$&" target="_blank">$&</a>');
            value = value.replace(/(@)(\w+)/g, ' $1<a href="http://twitter.com/$2" target="_blank">$2</a>');
            value = value.replace(/(#)(\w+)/g, ' $1<a href="http://search.twitter.com/search?q=%23$2" target="_blank">$2</a>');
            return value;
        },
        formatDate: function(value) {
            var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Okt', 'Dec'];
            var d = new Date(value);
            return d.getDate() + ' ' + monthNames[d.getMonth()];
        }
    },
    ready: function() {
        this.fetchTweets();
    },
    methods: {
        parseTweets: function(data) {
            this.tweets = data.statuses.length > 0 ? data.statuses : false;
        },
        parseError: function(data, status, message) {
            this.tweets = false;
        },
        fetchTweets: function() {
            return $.get('/twitter-proxy.php', this.query).done(this.parseTweets).fail(this.parseError);
        }
    }
});
}(window, document, jQuery));