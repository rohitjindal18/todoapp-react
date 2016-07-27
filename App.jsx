import React from 'react';
var update = require('react-addons-update');
import OpenTask from './Task.jsx';
import InProgressTask from './InProgressTask.jsx';
import CompletedTask from './CompletedTask.jsx';

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
			);	
		}
		
	}
};

class App extends React.Component {
    constructor(props) {
    	super(props);
    	this.state = {
            openTaskList:[],
            inProgressTaskList:[],
            completedTaskList:[],
            draggedOpenTask : 0,
            draggedInProgressTask : 0,
            isDroppedOnInProgress : false,
            isDroppedOnCompleted : false,
        	unSortOpenTaskList : [],
            unSortInProgressTaskList : [],
        	isClick : true
    	};
    }
    deleteOpenTask(ind){
    
            this.setState({
 			 openTaskList: update(this.state.openTaskList, {$splice: [[ind,1]]})
 			},this.changeTaskList);
    }

    deleteInProgressTask(ind){
            this.setState({
             inProgressTaskList: update(this.state.inProgressTaskList, {$splice: [[ind,1]]})
            },this.changeInProgressTaskList);
    }

    editTask(ind){
    	var myArray = this.state.openTaskList;
    	myArray[ind].isEditable = true;
    	this.setState({
    		openTaskList : myArray
    	});
    }

     editInProgressTask(ind){
        var myArray = this.state.inProgressTaskList;
        myArray[ind].isEditable = true;
        this.setState({
            inProgressTaskList : myArray
        });
    }


    editSaveTask (ind , newtitle , newdescription ,newPriority , newStatus){
    	var myArray = this.state.openTaskList;
    	myArray[ind].title = newtitle;
    	myArray[ind].description = newdescription;
    	myArray[ind].Priority = newPriority;
    	myArray[ind].isEditable = false;
    	myArray[ind].status = newStatus;
    	this.setState({
    		openTaskList : myArray
    	});
    }

    editSaveInProgressTask (ind , newtitle , newdescription ,newPriority , newStatus){
        var myArray = this.state.inProgressTaskList;
        myArray[ind].title = newtitle;
        myArray[ind].description = newdescription;
        myArray[ind].Priority = newPriority;
        myArray[ind].isEditable = false;
        myArray[ind].status = newStatus;
        this.setState({
            inProgressTaskList : myArray
        });
    }
    changeTaskList(){
    	var myArray = this.state.openTaskList;
    	for(var i = 0 ; i<myArray.length;i++){
    		myArray[i].Id = i+1;
    	}
    	this.setState({
    		openTaskList : myArray,
    		unSortOpenTaskList : myArray
    	});
    }

    changeInProgressTaskList(){
        var myArray = this.state.inProgressTaskList;
        for(var i = 0 ; i<myArray.length;i++){
            myArray[i].Id = i+1;
        }
        this.setState({
            inProgressTaskList : myArray,
            unSortOpenTaskList : myArray
        });
    }


    editFirstTask(ind , newTitle , newdescription , newPriority , newStatus) {
    	var myArray = this.state.openTaskList;
    	myArray[ind].title = newTitle;
    	myArray[ind].description = newdescription;
    	myArray[ind].Priority = newPriority;
    	myArray[ind].isFirstTask = false;
    	myArray[ind].status = newStatus;
    	this.setState({
    			openTaskList:myArray,
    			unSortOpenTaskList : myArray
    	});
    }
    createTask(task) {
        this.setState({
            openTaskList: this.state.openTaskList.concat(task),
            unSortOpenTaskList : this.state.unSortOpenTaskList.concat(task)
        })
    }
    createFirstTask() {
    	var taskLength = this.state.openTaskList.length;
    	var firsTask = {Id : taskLength + 1 , title : "Title" , description: "description" , priority : "P0" , status : "Open" ,isEditable: false , isFirstTask : true};
    	this.setState ({
    		openTaskList : this.state.openTaskList.concat(firsTask),
    		unSortOpenTaskList : this.state.unSortOpenTaskList.concat(firsTask)
    	});
    }
    onSortStatus() {
    	this.setState({
    		openTaskList : this.state.unSortOpenTaskList
    	},this.onStat)
    }
    onStat() {
		var myArray = this.state.openTaskList;
    	var sortArray = [];
    	if(this.refs.stat.value=="Status" & this.refs.prio.value=="Priority"){
    		for(var i =0 ;i<myArray.length;i++){
	    			sortArray.push(myArray[i]);
	    	}
	    	this.setState({
    			isClick : true
    		})
    	}
    	else if(this.refs.stat.value!="Status" & this.refs.prio.value!="Priority"){
			for(var i =0 ;i<myArray.length;i++){
	    		if(myArray[i].Priority===this.refs.prio.value & myArray[i].status===this.refs.stat.value){
	    			sortArray.push(myArray[i]);
	    		}
	    	}
	    	this.setState({
    			isClick : false
    		})
    	}
    	else if(this.refs.stat.value=="Status" & this.refs.prio.value!="Priority"){
    		for(var i =0 ;i<myArray.length;i++){
	    		if(myArray[i].Priority===this.refs.prio.value){
	    			sortArray.push(myArray[i]);
	    		}
	    	}
	    	this.setState({
    			isClick : false
    		})
    	}
    	else {
	    	for(var i =0 ;i<myArray.length;i++){
	    		if(myArray[i].status===this.refs.stat.value){
	    			sortArray.push(myArray[i]);
	    		}
	    	}
	    	this.setState({
    			isClick : false
    		})
		}

		for(var i =0;i<sortArray.length;i++){
			sortArray[i].Id = i+1;
		}
		this.setState({
    		openTaskList : sortArray
    	})
    }
    onSortPriority() {
    	this.setState({
    		openTaskList : this.state.unSortTaskList
    	},this.onPrio)
    }
    callB (){
    	console.log("This is callback");
    }
    dragFromOpenTask(taskIndex) {
        this.setState({
            isDroppedOnInProgress  :false,
            draggedOpenTask : this.state.draggedOpenTask = taskIndex
        })
    }

    dragFromInProgressTask(taskIndex) {
        this.setState({
            isDroppedOnCompleted  :false,
            draggedInProgressTask : this.state.draggedInProgressTask = taskIndex
        })
    }

    onPrio() {
		var myArray = this.state.openTaskList;
    	var sortArray = [];
      
    	if(this.refs.prioopen.value=="Priority"){
    		myArray.map(elem => sortArray.push(elem));
    		this.setState({
    			isClick : true
    		})
    	}
		else {
               
				for(var i =0 ;i<myArray.length;i++){
	    		if(myArray[i].Priority===this.refs.prioopen.value){
	    			sortArray.push(myArray[i]);
	    		}
			}
			this.setState({
    			isClick : false
    		})
		}
		for(var i =0;i<sortArray.length;i++){
			sortArray[i].Id = i+1;
		}
		this.setState({
    		openTaskList : sortArray
    	})
    }
    onDropInProgress(ev){
        ev.preventDefault();
        if(!this.state.isDroppedOnInProgress){
               var inProgressArray = this.state.inProgressTaskList;
               var draggedopentask = this.state.draggedOpenTask;
               var myArray = this.state.openTaskList;
               var inProgressArrayTemp = myArray[draggedopentask-1];
               inProgressArray.push(inProgressArrayTemp);
               for(var i=0;i<inProgressArray.length;i++){
                    inProgressArray[i].Id=i+1;
               }
              this.setState({
                 inProgressTaskList : inProgressArray,
                 openTaskList: update(this.state.openTaskList, {$splice: [[draggedopentask-1,1]]}),
                 isDroppedOnInProgress : true
             },this.changeTaskList);
        }
      

    }
    onDropCompleted(ev){
        ev.preventDefault();
        if(!this.state.isDroppedOnCompleted){
               var completeArray = this.state.completedTaskList;
               var draggedinprogresstask = this.state.draggedInProgressTask;
               var myArray = this.state.inProgressTaskList;
               var completedArrayTemp = myArray[draggedinprogresstask-1];
               completeArray.push(completedArrayTemp);
               for(var i=0;i<completeArray.length;i++){
                    completeArray[i].Id=i+1;
               }
              this.setState({
                 completedTaskList : completeArray,
                 inProgressTaskList: update(this.state.inProgressTaskList, {$splice: [[draggedinprogresstask-1,1]]}),
                 isDroppedOnCompleted : true
             },this.changeInProgressTaskList);
        }
      

    }
    render(){
    	
        var component = this;
        var openTasks = this.state.openTaskList.map(function(task , i){
                return(
                    <OpenTask id={task.Id} title={task.title} description={task.description} priority={task.Priority} status={task.status} isEditable={task.isEditable} isFirstTask={task.isFirstTask} handleDelete={component.deleteOpenTask.bind(component)} handleEdit={component.editTask.bind(component)} handleEditSave={component.editSaveTask.bind(component)} handleDragOpenTask={component.dragFromOpenTask.bind(component)} handleFirstTask={component.editFirstTask.bind(component)}/>
                    );
        });
        var inProgressTasks = this.state.inProgressTaskList.map(function(task , i){
                return(
                    <InProgressTask id={task.Id} title={task.title} description={task.description} priority={task.Priority} status={task.status} isEditable={task.isEditable} isFirstTask={task.isFirstTask} handleDelete={component.deleteInProgressTask.bind(component)} handleInProgressEdit={component.editInProgressTask.bind(component)} handleEditInProgressSave={component.editSaveInProgressTask.bind(component)} handleDragInProgressTask={component.dragFromInProgressTask.bind(component)} handleFirstTask={component.editFirstTask.bind(component)}/>
                    );
        });
        var completedTasks = this.state.completedTaskList.map(function(task , i){
                return(
                    <CompletedTask id={task.Id} title={task.title} description={task.description} priority={task.Priority} status={task.status} isEditable={task.isEditable} isFirstTask={task.isFirstTask} handleDelete={component.deleteOpenTask.bind(component)} handleEdit={component.editTask.bind(component)} handleEditSave={component.editSaveTask.bind(component)} handleFirstTask={component.editFirstTask.bind(component)}/>
                    );
        });
        return(
            <div id="tododiv">
                <div id="centerImage"><img src="rohittodo.png"></img></div><br/><br/>
                <div id="CompleteDiv">
                    <div id="openDiv">
                        <img  src="open.png"></img>
                         <table >
                           <tbody>
                            <tr id="firstopenrow" ><td style={{"width":"40px"}}>S.No</td><td>Title</td><td>Description</td><td style={{"width":"70px"}}><select id="sortOnPrio" onChange={this.onSortPriority.bind(this)} ref="prioopen" style={{"color":"white"}}><option>Priority</option><option>P0</option><option>P1</option><option>P2</option><option>P3</option></select></td><td>Actions</td></tr>
                            {openTasks}
                            </tbody>
                        </table><br/>
                        <CreateNewTask isClickable={this.state.isClick} createFirstT={this.createFirstTask.bind(this)}/>
                    </div>
                    <div id="inProgressDiv"  onDragOver={this.onDropInProgress.bind(this)}>
                        <img  src="inprogress.png"></img>
                        <table >
                          <tbody>
                            <tr id="firstprogressrow"><td style={{"width":"40px"}}>S.No</td><td>Title</td><td>Description</td><td style={{"width":"70px"}}><select id="sortOnPrio" onChange={this.onSortPriority.bind(this)} ref="prioinprogress" style={{"color":"white"}}><option>Priority</option><option>P0</option><option>P1</option><option>P2</option><option>P3</option></select></td><td>Actions</td></tr>
                            {inProgressTasks}
                          </tbody>
                        </table> 
                    </div>
                    <div id="completedDiv" onDragOver={this.onDropCompleted.bind(this)}>
                        <img  src="completed.png"></img>
                        <table>
                           <tbody>
                             <tr id="firstcompleterow"><td style={{"width":"40px"}}>S.No</td><td>Title</td><td>Description</td><td style={{"width":"70px"}}><select id="sortOnPrio" onChange={this.onSortPriority.bind(this)} ref="priocomplete" style={{"color":"white"}}><option>Priority</option><option>P0</option><option>P1</option><option>P2</option><option>P3</option></select></td><td>Actions</td></tr>
                             {completedTasks}
                           </tbody>
                        </table>
                    </div>
                </div>      
                <br/>
               
            </div>
            );
    }
};
export default App;