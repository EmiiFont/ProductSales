import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button, ButtonToolbar } from 'react-bootstrap';

export class PageForm extends React.Component {
 displayName = PageForm.name

    constructor(props) {
      super(props);
      this.state = {
        Interval: 20,
        Url: '',
        SalesUrls:["Emilio"],
        IncludeSelector: '',
        TopSelector: '',
        ProductNameSelector:'',
        ProductSubtitleSelector:'',
        ProductPriceSelector:'',
        ProductImageSelector:'',
        ProductUrlLocation:'',
        ExcludeSelector:'',
        isFormValid: false,
        };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    validateUrl() {
        if(this.state.Url.length === 0){
          return null;
        }
        const isValidUrl = ValidURL(this.state.Url);
        if (isValidUrl) return 'success';
        else return 'error';
    }

    validateSelector() {
      if(this.state.TopSelector.length === 0){
        return null;
      }
      const value = this.state.TopSelector;
      return  value.startsWith('#') || value.startsWith('.') ? 'success' : 'error';
      
  }

    validateField(fieldName, value){
     switch(fieldName){
       case 'Url':
        var isValidUrl = ValidURL(value);
        return isValidUrl ? this.setState({isFormValid: true}) : this.setState({isFormValid: false});
       case 'TopSelector':
        return value.startsWith('#') || value.startsWith('.') ? 'success' : 'error';
     }

    }
    
    handleChangeSalesUrl(id, event){
      console.log(this.state.SalesUrls);
      let urls = [...this.state.SalesUrls];
      urls[id] = event.target.value;
      this.setState({ SalesUrls: urls });
      // const newShareholders = this.state.SalesUrls.map((saleurl, sidx) => {
      //   if (id !== sidx) return saleurl;
      //   return { ...saleurl, name: "event.target.value" };
      // });
      
     // this.setState({ SalesUrls: newShareholders });
    }

    handleAddSalesUrl = () => {
      this.setState({ SalesUrls: this.state.SalesUrls.concat([' ']) });
    }
    handleChange(event) {
        // we get the event.target.name (input name)
        // and use it to target the key on our `state` object with the same name, using bracket syntax ES6
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value}, () => { this.validateField(name, value) });
    }
  
    handleSubmit(event) {
    //event.preventDefault();
    console.log(this.state);
    if(!this.state.isFormValid) return;

    let pageData = Object.assign({}, this.state);

    fetch('/api/Pages', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(pageData)
           });
           
    event.preventDefault();
    }
  
    render() {
      return (
          <div>
        <h1>New Product Website</h1>
        <form onSubmit={this.handleSubmit}>
         <FormGroup controlId="formBasicText"
          validationState={this.validateUrl()}>
          <ControlLabel>
            Website URL:
           </ControlLabel>
           <FormControl type="text" name="Url" value={this.state.Url} onChange={this.handleChange}>
           </FormControl>
           <FormControl.Feedback />
           </FormGroup>

           <FormGroup controlId="formBasicText"
             validationState={this.validateUrl()}>
          <ControlLabel>
            Sales URL:
           </ControlLabel>
            {this.state.SalesUrls.map((saleurl, idx) => (
             <FormControl key={idx} type="text" value={saleurl} onChange={this.handleChangeSalesUrl.bind(this, idx)}>
             </FormControl>
          ))}
           {/* <FormControl type="text" name="SalesUrls" value={this.state.SalesUrls} onChange={this.handleChange}>
           </FormControl>
           <FormControl type="text" name="SalesUrls" value={this.state.SalesUrls} onChange={this.handleChange}>
           </FormControl> */}
           <FormControl.Feedback />

            <Button onClick={this.handleAddSalesUrl} className="small">Add Sales Url</Button>
           </FormGroup>
           
           <FormGroup>
           <ControlLabel>
            Interval of refresh:
           </ControlLabel>
           <FormControl type="text" name="Interval" value={this.state.Interval} onChange={this.handleChange}>
           </FormControl>
           </FormGroup>

           <FormGroup validationState={this.validateSelector()}>
           <ControlLabel>
            Top Selector:
           </ControlLabel>
           <FormControl type="text" name="TopSelector" value={this.state.TopSelector} onChange={this.handleChange}>
           </FormControl>
           <FormControl.Feedback />
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
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var pattern = new RegExp(expression); // fragment locater
    if(!str.match(pattern)) {
      return false;
    } else {
      return true;
    }
  }