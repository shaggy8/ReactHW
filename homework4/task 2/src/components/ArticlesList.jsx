import React from 'react';

import './ArticlesList.css';
import Article from './Article.jsx';
import ARTICLES from './ARTICLES.json';


const ArticlesList = React.createClass({
  contextTypes: {
      router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
      return {
          displayedArticles: ARTICLES
      };
  },

  handleSearch: function(event) {
      var searchQuery = event.target.value.toLowerCase();
      var displayedArticles = ARTICLES.filter(el => {
          var searchValue = el.text.toLowerCase();
          return searchValue.indexOf(searchQuery) !== -1;
      });

      this.setState({
          displayedArticles: displayedArticles
      });
  },

  handleClick: function(id) {
      this.context.router.push(`/article/${id}`);
  },

  render: function() {
      return (
          <div className="articles">
              <input type="text" className="search-field" onChange={this.handleSearch} />
              <ul className="articles-list">
                  {
                     this.state.displayedArticles.map(el => {
                          return <Article
                              key={el.id}
                              text={el.text}
                              onClick={this.handleClick.bind(null, el.id)}
                          />
                     })
                  }
              </ul>
          </div>
      );
  }
});

export default ArticlesList;