// React 12:
// Think in React
import React , { Component } from "react";



// ---> Search:
class Search extends Component {
    constructor(props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(e) {
        this.props.onFilterChange(e.target.value);
    }

    handleInStockChange(e) {
        this.props.onInstockChange(e.target.checked);
    }

    render() {
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;

        return(
            <form>
                <input
                    type="text"
                    placeholder="Search..."
                    value={filterText}
                    onChange={this.handleFilterTextChange}
                />
                <p>
                    <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={this.handleInStockChange}
                    />
                    {' '}
                    Only show products in stock
                </p>
            </form>
        );
    }
}

class ProductCategoryRow extends Component {
    render() {
        const category = this.props.category;
        return(
            <tr>
                <th colSpan="2">
                    {category}
                </th>
            </tr>
        );
    }
}

class ProductRow extends Component {
    render() {
        const product = this.props.product;
        const name = product.stocked ? 
            product.name : 
            <span style={{color: 'red'}}>
                {product.name}
            </span>
        return(
            <tr>
                <td>{name}</td>
                <td>{product.price}</td>
            </tr>
        );
    }
}

class ProductTable extends Component {
    render() {
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;

        const rows = [];
        let lastCategory = null;

        this.props.products.forEach(product => {
            if(product.name.indexOf(filterText) === -1) { return; }
            if(inStockOnly && !product.stocked) { return; }
            if(product.category !== lastCategory) {
                rows.push(
                    <ProductCategoryRow
                        category={product.category}
                        key={product.category}
                    />
                );
            }
            rows.push(
                <ProductRow
                    product={product}
                    key={product.name}
                />
            );
            lastCategory = product.category;
        });

        return(
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                    <tbody>{rows}</tbody>
            </table>
        );
    }
}

export default class FilterableProductTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        };
    }

    handleFilterTextChange = filterText => {
        this.setState({
            filterText: filterText
        });
    }

    handleInStockChange = inStockOnly => {
        this.setState({
            inStockOnly: inStockOnly
        });
    }

    render() {
        return(
            <div>
                <Search
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onFilterChange={this.handleFilterTextChange}
                    onInstockChange={this.handleInStockChange}
                />
                <ProductTable
                    products={this.props.products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                />
            </div>
        );
    }
}
