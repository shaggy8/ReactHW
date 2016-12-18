import React from 'react';

import './App.css';

const App = React.createClass({
  render: function() {
    return <div>{this.props.children}</div>
  }
});

export default App;