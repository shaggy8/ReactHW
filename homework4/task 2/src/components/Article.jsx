import React from 'react';

import './Article.css';

const Article = React.createClass({
    render: function() {
      return <li className="article" onClick={this.props.onClick}>
          <p className="article-text">{this.props.text}</p>
      </li>
    }
});

export default Article;