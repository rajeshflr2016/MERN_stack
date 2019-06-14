import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const triggerDelete = (id) => {
	if(window.confirm("Are you sure you want to delete this task?")){	
	  axios.get('http://localhost:4000/todos/delete/'+id)
	  .then(res => {
	  	alert(res.data);
	  });
	 }
}

const Todo = props => (

    <tr class>
        <td>{props.todo.todo_description}</td>
        <td>{props.todo.todo_responsible}</td>
        <td>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/"+props.todo._id}>Edit</Link>
        </td>
        <td>
            <button onClick={(e)=>{
				      e.stopPropagation();
				      e.preventDefault();
				      triggerDelete(props.todo._id);
   			}} className="button muted-button">Delete</button>
        </td>
    </tr>
)

export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.deleteUser = this.deleteUser.bind(this);
        //this.handleClick = this.handleClick.bind(this);
        this.state = {todos: [],_id:null,onDelete:{} };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    todoList() {
        return this.state.todos.map(function(currentTodo, i){
            return <Todo todo={currentTodo} key={i} />;
        })
    }

    deleteUser(id){
    	console.log(id);
    }

    // handleClick(e) {
    // 	console.log('testing'+id);
    //     // e.preventDefault();
    //     // const obj = {
    //     //     todo_description: this.state.todo_description,
    //     //     todo_responsible: this.state.todo_responsible,
    //     //     todo_priority: this.state.todo_priority,
    //     //     todo_completed: this.state.todo_completed
    //     // };
    //     // console.log(obj);
    //     // axios.post('http://localhost:4000/todos/update/'+this.props.match.params.id, obj)
    //     //     .then(res => console.log(res.data));
        
    //     // this.props.history.push('/');
    // }

    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}