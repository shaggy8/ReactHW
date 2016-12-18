var React = require('react');
var Article = require('./Article.jsx');

require('./ArticlesList.css');


var xhr = new XMLHttpRequest();
xhr.open('GET', 'ARTICLES.json', false);
xhr.send();

if (xhr.status != 200) {
  alert( xhr.status + ': ' + xhr.statusText );
} else {
  var ARTICLES = JSON.parse( xhr.responseText );
}


var ArticlesList = React.createClass({
    getInitialState: function() {
        return {
            displayedArticles: ARTICLES
        };
    },

    handleSearch: function(event) {
        var searchQuery = event.target.value.toLowerCase();
        var displayedArticles = ARTICLES.filter(function(el) {
            var searchValue = el.text.toLowerCase();
            return searchValue.indexOf(searchQuery) !== -1;
        });

        this.setState({
            displayedArticles: displayedArticles
        });
    },

    render: function() {
        return (
            <div className="articles">
                <input type="text" className="search-field" onChange={this.handleSearch} />
                <ul className="articles-list">
                    {
                       this.state.displayedArticles.map(function(el) {
                            return <Article
                                key={el.id}
                                text={el.text}
                            />;
                       })
                    }
                </ul>
            </div>
        );
    }
});

module.exports = ArticlesList;