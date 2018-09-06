import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { CheckBox } from './widgets/Checkbox';

export class ProductFilter extends React.Component {
    displayName = ProductFilter.name;
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            categories: ['Lipsticks', 'Face Make up', 'Eyes Make up'],
            productTypes: ['lip', 'cleansing', 'lipstick', 'palette', 'make up', 'shadow', 'countour', 'foundation', 'lash', 'lashes', 'mascara', 'liner', 'highlighter'],
            companies: ['urbandecay', 'nyxcosmetics', 'tartecosmetics', 'makeupgeek', 'colourpop', 'toofaced'],
            selectedCompanies: new Set(),
            selectedProductTypes: new Set(),
            selectedProductCategories: new Set(),
        }

        this.selectedCheckboxes = new Set();
    }
    
    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();
        
        this.props.getFilterSelection({page: 1, pageSize: 10, orderByColumn: 'Price', OrderDirection: 'desc', 
        Companies: [...this.state.selectedCompanies], ProductCategories: [...this.state.selectedProductCategories], ProductTypes: [...this.state.selectedProductTypes]});
        // for (const checkbox of this.state.selectedCheckboxes) {
        //   console.log(checkbox, 'is selected.');
        // }
    }

    toggleCheckbox = (checkBoxName, label) => {

         var clonedSet = new Set(this.state[checkBoxName]);

        if (clonedSet.has(label)) {
            clonedSet.delete(label);
            this.setState((state) => {
                 state[checkBoxName] = clonedSet;
          });
        } else {
            clonedSet.add(label);
            this.setState((state) => {
                state[checkBoxName] = clonedSet;
             });
        }
      }
      
    demoMethod(){
        this.props.getFilterSelection({page: 1, pageSize: 5, orderByColumn: 'UpdateDate', OrderDirection: 'desc'});
    }

    handleChange(event) {
        // we get the event.target.name (input name)
        // and use it to target the key on our `state` object with the same name, using bracket syntax ES6
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value}, () => { this.validateField(name, value) });
    }

    createCheckbox = (label, checkBoxName) => (
        <CheckBox
        label={label}
        handleCheckboxChange={this.toggleCheckbox.bind(this, checkBoxName)}
        key={label} />
    )

    createCompanyCheckBox = () =>(
        this.state.companies.map(x => this.createCheckbox(x, "selectedCompanies"))
    )

    createProductTypeCheckBox = () =>(
        this.state.productTypes.map(x => this.createCheckbox(x, "selectedProductTypes"))
    )

    createProductCategoryCheckBox = () =>(
        this.state.categories.map(x => this.createCheckbox(x, "selectedProductCategories"))
    )

    render(){
        return (
        <div> 
        <form onSubmit={this.handleFormSubmit}>
         <FormGroup>
             <ControlLabel>
                 Company: 
                 {this.createCompanyCheckBox()}
             </ControlLabel>
         </FormGroup>
         <FormGroup>
             <ControlLabel>
                 Type: 
                 {this.createProductTypeCheckBox()}
             </ControlLabel>
         </FormGroup>
         <FormGroup>
             <ControlLabel>
                 Categories: 
                 {this.createProductCategoryCheckBox()}
             </ControlLabel>
         </FormGroup>
         <button className="btn btn-default" type="submit">Save</button>
         </form>
        </div>
         );
    }
}