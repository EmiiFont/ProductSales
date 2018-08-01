import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button, ButtonToolbar } from 'react-bootstrap';

export class PageForm extends React.Component {
 displayName = PageForm.name

    constructor(props) {
      super(props);
      this.state = {
        Interval: 20,
        Url: '',
        SalesUrls:[],
        IncludeSelector: '',
        TopSelector: '',
        ProductNameSelector:'',
        ProductSubtitleSelector:'',
        ProductPriceSelector:'',
        ProductImageSelector:'',
        ProductUrlLocation:'',
        ExcludeSelector:'',
        };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    getValidationState() {
        const isValidUrl = ValidURL(this.state.Url);
        if (isValidUrl) return 'success';
        else return 'error';
        return null;
    }

    handleChange(event) {
        // we get the event.target.name (input name)
        // and use it to target the key on our `state` object with the same name, using bracket syntax ES6
      this.setState({ [event.target.name]: event.target.value });
    }
  
    handleSubmit(event) {
    //event.preventDefault();

    let pageData = Object.assign({}, this.state);

    fetch('/api/Pages', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(pageData)
           });
           
    console.log(this.state);
    event.preventDefault();
    }
  
    render() {
      return (
          <div>
        <h1>New Product Website</h1>
        <form onSubmit={this.handleSubmit}>
         <FormGroup controlId="formBasicText"
          validationState={this.getValidationState()}>
          <ControlLabel>
            Website URL:
           </ControlLabel>
           <FormControl type="text" name="Url" value={this.state.Url} onChange={this.handleChange}>
           </FormControl>
           <FormControl.Feedback />
           <HelpBlock>Validation is based on string length.</HelpBlock>
           </FormGroup>
           
           <FormGroup>
           <ControlLabel>
            Interval of refresh:
           </ControlLabel>
           <FormControl type="text" name="Interval" value={this.state.Interval} onChange={this.handleChange}>
           </FormControl>
           </FormGroup>

           <FormGroup>
           <ControlLabel>
            Top Selector:
           </ControlLabel>
           <FormControl type="text" name="TopSelector" value={this.state.TopSelector} onChange={this.handleChange}>
           </FormControl>
           </FormGroup>
         
           <FormGroup>
          <ControlLabel>
            Product Name Selector:
           </ControlLabel>
           <FormControl type="text" name="ProductNameSelector" value={this.state.ProductNameSelector} onChange={this.handleChange}>
           </FormControl>
           </FormGroup>

            <FormGroup>
           <ControlLabel>
           Product Subtitle Selector:
           </ControlLabel>
           <FormControl type="text" name="ProductSubtitleSelector" value={this.state.ProductSubtitleSelector} onChange={this.handleChange}>
           </FormControl>
           </FormGroup>

           <FormGroup>
           <ControlLabel>
           Product Price Selector:
           </ControlLabel>
           <FormControl type="text" name="ProductPriceSelector" value={this.state.ProductPriceSelector} onChange={this.handleChange}>
           </FormControl>
            </FormGroup>
               
            <FormGroup>
           <ControlLabel>
           Product Image Selector:
           </ControlLabel>
           <FormControl type="text" name="ProductImageSelector" value={this.state.ProductImageSelector} onChange={this.handleChange}>
           </FormControl>
           </FormGroup>
           
           <FormGroup>
           <ControlLabel>
           Product Url Location:
           </ControlLabel>
           <FormControl type="text" name="ProductUrlLocation" value={this.state.ProductUrlLocation} onChange={this.handleChange}>
           </FormControl>
           </FormGroup>
           
           <Button bsStyle="primary" type="submit">Save</Button>
          
        </form>
        </div>
      );
    }
  }

  function ValidURL(str) {
    var pattern = new RegExp('^(https?:\/\/)?'+ // protocol
      '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+ // domain name
      '((\d{1,3}\.){3}\d{1,3}))'+ // OR ip (v4) address
      '(\:\d+)?(\/[-a-z\d%_.~+]*)*'+ // port and path
      '(\?[;&a-z\d%_.~+=-]*)?'+ // query string
      '(\#[-a-z\d_]*)?$','i'); // fragment locater
    if(!pattern.test(str)) {
      return false;
    } else {
      return true;
    }
  }