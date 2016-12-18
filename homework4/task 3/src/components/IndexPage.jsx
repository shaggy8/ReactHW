import React from 'react';
import {Link} from 'react-router';

import '../css/IndexPage.css'

const IndexPage = React.createClass({

  contextTypes: {
      router: React.PropTypes.object.isRequired
  },

  childContextTypes: {
      handlers: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
      return {
        shoppingList: [],
        listLength: 0
      }
  },

  getChildContext: function() {
      const that = this;

      return {
        handlers: {
          add: function(product) {
            var newList = [];
            var localList = localStorage.getItem('myShop');

            if (localList) {
              newList = JSON.parse(localList);
            }

            newList.push(product);

            that.setState({
              shoppingList: newList,
              listLength: newList.length
            });
          },

          remove: function(newList) {            
            that.setState({
              shoppingList: newList,
              listLength: newList.length
            });
          }
        }
      }
  },

  render: function() {
      return <div>
        <header>
          <div className="row">
            <div className="col-sm-4 text-center"><Link to='/home'>HOME</Link></div>
            <div className="col-sm-4 text-center"><Link to='/goods'>GOODS</Link></div>
            <div className="col-sm-4 text-center"><Link to='/cart'>CART ({this.state.listLength})</Link></div>
          </div>
        </header>
        <main>
          {this.props.children}
        </main>
      </div>
  },

  componentDidUpdate: function() {
      var shoppingList = JSON.stringify(this.state.shoppingList);
      localStorage.setItem('myShop', shoppingList);
  },

  componentDidMount: function() {
      const localList = localStorage.getItem('myShop');

      if (localList) {
        let parsedList = JSON.parse(localList);
        this.setState({ 
          shoppingList: parsedList,
          listLength: parsedList.length
        });
      }
  }
});

export default IndexPage;