import React from 'react';

import GOODS from '../GOODS.json';
import '../css/Goods.css';

const Goods = React.createClass({

  contextTypes: {
      router: React.PropTypes.object.isRequired,
      handlers: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
      return {
        goods: GOODS,
        displayedGoods: GOODS
      };
  },

  handleSearch: function(event) {
      let searchQuery = event.target.value.toLowerCase();
      let displayedArray = this.state.goods.filter(el => {
          let searchValue = el.productName.toLowerCase();
          return searchValue.indexOf(searchQuery) !== -1;
      });

      this.setState({
        displayedGoods: displayedArray
      });
  },

  handlerClick: function(id) {
      this.context.router.push(`/goods/${id}`);
  },

  render: function() {
      return <section className='goods-container'>
        <input type='text' onChange={this.handleSearch} className='form-control search-field' placeholder='Search goods' />
        {
          this.state.displayedGoods.map(product => {
            return <div className='product-cart'key={product.id}>
              <h2 onClick={this.handlerClick.bind(null, product.id)}  className='letter-photo text-center'>{product.photo}</h2>
              <p className='product-name text-center'>{product.productName}</p>
              <p className='price text-center'>{`${product.price.toLocaleString()} UAH`}</p>
              <button onClick={this.context.handlers.add.bind(null, product)} className='btn btn-default'>Buy it</button>
            </div>
          })
        }
      </section>
  }

});

export default Goods;