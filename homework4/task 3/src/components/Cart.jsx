import React from 'react';

import '../css/Cart.css';

const Cart = React.createClass({

  contextTypes: {
      handlers: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
      return {
        shoppingList: [],
        total: 0
      }
  },

  removeHandler: function(unnecessaryProduct) {
      let shoppingList = this.state.shoppingList;
      let newList = shoppingList.filter(product => product !== unnecessaryProduct);

      this.context.handlers.remove.call(null, newList);

      this.setState({ shoppingList: newList });

  },

  makeOrderHandler: function() {
      let plural = '';
      let points = this.state.shoppingList.length;

      if (points > 1) plural = 's';
      
      alert(`You have ordered ${points} point${plural} on sum ${this.state.total} UAH`);

      this.context.handlers.remove.call(null, []);
      this.setState({ shoppingList: [], total: 0 });
  },

  render: function() {
      return <section className='cart'>
        <table className='table  table-hover'>
          <tbody>
            {
              this.state.shoppingList.map(product => {
                return <tr key={Math.random().toFixed(8)}>
                  <td><h2>{product.photo}</h2></td>
                  <td><p>{product.productName}</p></td>
                  <td><p>{product.price.toLocaleString()} UAH</p></td>
                  <td><button onClick={this.removeHandler.bind(null, product)} className='btn btn-default btn-xs'>I don't need it</button></td>
                </tr>
              })
            }
          </tbody>
        </table>
        <div className='total'>
          <p>Total:</p>
          <p>{this.state.total.toLocaleString()} UAH</p>
          <button onClick={this.makeOrderHandler} className='btn btn-default btn-lg'>Make order!</button>
        </div>
      </section>
  },

  componentDidMount: function() {
      const localList = localStorage.getItem('myShop');

      if (localList) {
        let parsedList = JSON.parse(localList);
        let money = 0;

        parsedList.forEach(el => money += el.price);

        this.setState({
          shoppingList: parsedList,
          total: money
        });
      }
  }

});

export default Cart;