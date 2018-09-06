import React, { Component } from "react";

export class RadioButton extends React.Component{
    constructor(props){
        super(props);
            this.state = {
                isChecked: false,
            }
        }
    
    toggleRadioButton = () =>{
        console.log(this.props);
        const {handleRadioButtonChange, name, label} = this.props;
        this.setState(({isChecked}) => (
            {
                isChecked: !isChecked
            }
        ));

       handleRadioButtonChange(label);
    }

    render(){
        const { label } = this.props;
        const { name } = this.props;
        const { isChecked } = this.state;

        return(
          <div className="radio">
          <label>
              <input type="radio" name={name} checked={isChecked} onChange={this.toggleRadioButton} />
              {label}
          </label>
          </div>
        );
    }
}