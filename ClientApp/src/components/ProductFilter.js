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
            selectedCheckboxes: new Set()
        }

        this.selectedCheckboxes = new Set();
    }
    
    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();
        
        this.props.getFilterSelection({page: 1, pageSize: 10, orderByColumn: 'Price', OrderDirection: 'desc', ProductCategories: [...this.state.selectedCheckboxes]});
        // for (const checkbox of this.state.selectedCheckboxes) {
        //   console.log(checkbox, 'is selected.');
        // }
    }

    toggleCheckbox = label => {
         var clonedSet = new Set(this.state.selectedCheckboxes);

        if (clonedSet.has(label)) {
            clonedSet.delete(label);
            this.setState((state) => {
                 state.selectedCheckboxes = clonedSet;
          });
        } else {
            clonedSet.add(label);
            this.setState((state) => {
                state.selectedCheckboxes = clonedSet;
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

    createCheckbox = label => (
        <CheckBox
        label={label}
        handleCheckboxChange={this.toggleCheckbox}
        key={label} />
    )

    createCheckBoxList = () =>(
        this.state.categories.map(this.createCheckbox)
    )

    render(){
        return (
        <div> 
        <form onSubmit={this.handleFormSubmit}>
            {this.createCheckBoxList()}
         <FormGroup>
             <ControlLabel>
                 Company: 
             </ControlLabel>
         </FormGroup>
         <button className="btn btn-default" type="submit">Save</button>
         </form>
        </div>
         );
    }
}