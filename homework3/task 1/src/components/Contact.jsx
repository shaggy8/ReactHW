var React = require('react');

require('./Contact.css');

var Contact = React.createClass({
    getInitialState: function () {
      return {
        isOpened: false
      }
    },
    clickHandler: function (e) {
      if (this.state.isOpened) {
        this.setState({ isOpened: false });
      } else {
        this.setState({ isOpened: true });
      }
    },
    render: function() {
      if (this.state.isOpened) {
        return <li className="contact" onClick={this.clickHandler}>
            <img className="contact-image" src={this.props.image} width="60px" height="60px" />
            <div className="contact-info">
                <div className="contact-name"> {this.props.name} </div>
                <div className="contact-number"> {this.props.phoneNumber} </div>
                <div className="contact-email"> {this.props.email} </div>
                <div className="contact-adress"> {this.props.adress} </div>
            </div>
        </li>;
      } else {
        return <li className="contact" onClick={this.clickHandler}>
            <img className="contact-image" src={this.props.image} width="60px" height="60px" />
            <div className="contact-info">
                <div className="contact-name"> {this.props.name} </div>
                <div className="contact-number"> {this.props.phoneNumber} </div>
            </div>
        </li>;
      }
    }
});

module.exports = Contact;