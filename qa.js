import React from 'react';
class CreateNewTask extends React.Component {
	constructor(props){
		super(props);
	}
	createFirst() {
		this.props.createFirstT();
	}
	render() {
		if(this.props.isClickable === true){
			return(
				<button type="button" id="addnewtask" onClick={this.createFirst.bind(this)}>Add New Task...</button>
			);
		}
		else {
			return(
				<div></div>
			);	bab
		}
		
	}
};
