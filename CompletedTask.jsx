import React from 'react';
import $ from 'jquery';

class CompletedTask extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			isDragLeft : false
		}
	}
	delTas(ind) {
		this.props.handleDelete(ind-1);
	}

	editTas(ind){
		this.props.handleEdit(ind-1);
	}
	editSave(ind){
		var newTitle = this.refs.tile.value;
		var newDescr = this.refs.descr.value;
		var prity = this.refs.prio.value;
		
		this.props.handleEditSave(ind-1 , newTitle , newDescr , prity);
	}
	createFirst(ind){
		var newTitle = this.refs.tile.value;
		var newDescr = this.refs.descr.value;
		var prity = this.refs.prio.value;
		this.props.handleFirstTask(ind-1 , newTitle , newDescr , prity);

	}
	dragTask(ev){
		var index = $(ev.target).find('td').first().text();
		this.props.handleDragOpenTask(index);
	}
    render() {
    	
    	if(!this.props.isEditable & !this.props.isFirstTask){
			return(
                <tr id="rowsTable" draggable="true" onDrag={this.dragTask.bind(this)}><td>{this.props.id}</td><td>{this.props.title}</td><td>{this.props.description}</td><td>{this.props.priority}</td><td>&nbsp;&nbsp;&nbsp;&nbsp;<img src="editTask.png" title="Edit" onClick={this.editTas.bind(this,this.props.id)}></img>&nbsp;&nbsp;&nbsp;&nbsp;<img src="deleteTask.png" title="Delete" onClick={this.delTas.bind(this,this.props.id)}></img></td></tr>
            );
    	}
    	else if(this.props.isEditable) {
			return(
                <tr id="rowsTable"><td>{this.props.id}</td><td><input type="text" defaultValue={this.props.title} ref="tile"></input></td><td><input type="text" defaultValue={this.props.description} ref="descr"></input></td><td><select id="prioDropDown" ref="prio" defaultValue={this.props.priority}><option>P0</option><option>P1</option><option>P2</option><option>P3</option></select></td><td><img src="tickMark.png" title="Save" onClick={this.editSave.bind(this,this.props.id)}></img>&nbsp;&nbsp;&nbsp;&nbsp;<img src="deleteTask.png" title="Delete" onClick={this.delTas.bind(this,this.props.id)}></img></td></tr>
            );
    	}
    	else if(this.props.isFirstTask){
    		
    		return(
                <tr id="rowsTable"><td>{this.props.id}</td><td><input type="text" defaultValue="" placeholder={this.props.title} ref="tile"></input></td><td><input type="text" defaultValue="" placeholder={this.props.description} ref="descr"></input></td><td><select id="prioDropDown" ref="prio"><option>P0</option><option>P1</option><option>P2</option><option>P3</option></select></td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="tickMark.png" title="Create" onClick={this.createFirst.bind(this,this.props.id)}></img></td></tr>
            );
    	}
        
   }
};

export default CompletedTask;