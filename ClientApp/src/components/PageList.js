import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button, ButtonToolbar, Table } from 'react-bootstrap';

export class PageList extends React.Component{
 displayName = PageList.name;

 constructor(props){
  super(props);
  this.state = { pages: [], loading: true };
    
    fetch('api/Pages/Get')
    .then(response => response.json())
    .then(data => {
      this.setState({ pages: data, loading: false });
    });
  //this.handleChange = this.handleChange.bind(this);
  //this.handleSubmit = this.handleSubmit.bind(this);
 }
 
 static renderPagesTable(pages) {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Url</th>
            <th>Interval</th>
            <th>Enabled</th>
          </tr>
        </thead>
        <tbody>
          {pages.map(page =>
            <tr key={page.id}>
              <td>{page.Url}</td>
              <td>{page.Interval}</td>
              <td>{page.Enabled}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }


 render(){
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : PageList.renderPagesTable(this.state.pages);

    return (
      <div>
        <h1>Available Websites</h1>
            {contents}
      </div>
    );
 }
}