import React from 'react';

import './Text.css';
import ARTICLES from './ARTICLES.json';

const Text = React.createClass({
    render: function() {
      const {id} = this.props.params;
      let obj = ARTICLES.find(elem => elem.id === id);
      
      return <p className="full-article-text">{obj.text}</p>
    }
});

export default Text;