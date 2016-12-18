var React = require('react');

require('./Article.css');

var Article = React.createClass({
    render: function() {
      return <li className="article">
          <p className="article-text">{this.props.text}</p>
      </li>
    }
});

module.exports = Article;