var React = require('react');

import { 
    Textfield,
    DataTable,
    Switch,
    FABButton,
    Icon,
    TableHeader } from 'react-mdl';

require('./Table.css');

var Table = React.createClass({
    getInitialState: function() {
        return {
            tableData: [{
                material: 'TOTAL',
                price: 0
            }],
            material: '',
            price: '',
            isIncome: true,
            switchState: 'Income'
        }
    },

    render: function() {
        return (
            <div>
                <Textfield
                    className="app-input app-input1"
                    onChange={(event) => {this.setState({material: event.target.value})}}
                    label="Text..."
                    floatingLabel
                    value={this.state.material}
                />
                <Textfield
                    className="app-input app-input2"
                    onChange={(event) => {this.setState({price: event.target.value})}}
                    pattern="-?[0-9]*(\.[0-9]+)?"
                    error="Input is not a number!"
                    label="Number..."
                    floatingLabel
                    value={this.state.price}
                />
                <Switch
                    className="app-switch"
                    onChange={this.switchHandler}
                    defaultChecked
                    ripple
                >
                    {this.state.switchState}
                </Switch>
                <FABButton
                    className="app-button"
                    onClick={this.buttonHandler}
                    colored
                    primary
                    ripple
                >
                    <Icon name="add" />
                </FABButton>
                <DataTable
                    className="app-table"
                    shadow={0}
                    rows={this.state.tableData}
                >
                    <TableHeader name="material" tooltip="The amazing material name">Material</TableHeader>
                    <TableHeader numeric name="price" cellFormatter={(price) => `\$ ${price.toFixed(2)}`} tooltip="Price pet unit">Price</TableHeader>
                </DataTable>
            </div>
        );
    },

    switchHandler: function() {
        if (this.state.isIncome) {
            this.setState({
                isIncome: false,
                switchState: 'Outcome'
            });
        } else {
            this.setState({
                isIncome: true,
                switchState: 'Income'
            });
        }
    },

    buttonHandler: function() {
        var newData = this.state.tableData.slice(0, -1),
            priceSign = this.state.isIncome ? '' : '-',
            newPrice = +(priceSign + this.state.price),
            totalPrice = 0;

        if (this.state.material.trim() && !isNaN(parseFloat(newPrice)) && isFinite(newPrice)) {

            newData.push({
                material: this.state.material,
                price: newPrice
            });

            newData.forEach(function(x) {
                totalPrice += x.price;
            });

            newData.push({
                material: 'TOTAL',
                price: totalPrice
            });

            this.setState({
                tableData: newData,
                material: '',
                price: ''
            });
        }
    }
});

module.exports = Table;