import React from 'react';

import GOODS from '../GOODS.json';
import '../css/Product.css';

const Product = React.createClass({

  contextTypes: {
      handlers: React.PropTypes.object.isRequired
  },

  render: function() {
      let {id} = this.props.params;
      let product = GOODS.find(elem => elem.id === id);

      return <section className='product-page'>
        <h1 className='product-name'>{product.productName}</h1>
        <h2 className='letter-photo text-center'>{product.photo}</h2>
        <p className='price'>{product.price.toLocaleString()} UAH</p>
        <button onClick={this.context.handlers.add.bind(null, product)} className='btn btn-default btn-lg' type='submit'>Buy it</button>
        <p className='description'>{product.description}</p>
      </section>
  }
});

export default Product;