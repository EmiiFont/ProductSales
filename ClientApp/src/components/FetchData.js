import React, { Component } from 'react';
import {ProductFilter} from './ProductFilter';

export class FetchData extends Component {
  displayName = FetchData.name

  constructor(props) {
    super(props);
    this.state = { products: [], loading: true };

    this.filterProductsTable();
    this.filterProductsTable = this.filterProductsTable.bind(this);
  }

  filterProductsTable(obj){
    if(obj === undefined || obj === null){
      obj = {page: 1, pageSize: 10, orderByColumn: 'UpdateDate', OrderDirection: 'desc'};
    }
    var filterObj = obj;
    var queryParams= buildURLQuery(filterObj);
    
    console.log(queryParams);
    fetch('api/Product/Sales?' + queryParams)
    .then(response => response.json())
    .then(data => {
      this.setState({ products: data, loading: false });
    });

  }
   
  static renderForecastsTable(products) {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Company Website</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product =>
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.company}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.products);

    return (
      <div>
        <h1>Product Sales</h1>
        <ProductFilter getFilterSelection={this.filterProductsTable}></ProductFilter>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }
}

function buildURLQuery(obj){
return Object.entries(obj)
  .map(pair => pair.map(encodeURIComponent).join('='))
  .join('&');
}

