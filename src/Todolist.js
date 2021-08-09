import React, { Component } from 'react';
import Todo from './Todo';
import Todoform from './Todoform'

export default class Todolist extends Component {
    state={
        todos:[],
        ShowList:"all",
        toggleAllComplete:true
    }
    addTodo=(todo)=>{
        this.setState({
            todos:[todo, ...this.state.todos]
        })
    }
    toggleComplete=(id)=>{
        this.setState({
            todos:this.state.todos.map(todo =>{
                if(todo.id === id){
                    return {
                        ...todo,
                        complete:!this.complete
                    }
                }
                else{
                    return todo;
                }
            })

        })
    }
    updateShowTodo=(s)=>{
        this.setState({
            ShowList:s
        })
    };
    handleDeleteTodo=(id)=>{
        this.setState({
            todos: this.state.todos.filter(todo =>  todo.id  !== id) 
        })
    }

    DeleteAllCompleteTodo=(id)=>{
        this.setState({
            todos: this.state.todos.filter(todo =>  !todo.complete) 
        })
    }
    render() {
        let todos=[]

        if(this.state.ShowList==='all'){
            todos=this.state.todos;
        }
        else if(this.state.ShowList === 'active') {
          todos= this.state.todos.filter(todo=>!todo.complete)
        }
        else if(this.state.ShowList === 'complete') {
            todos=this.state.todos.filter(todo=>todo.complete)
    }
        return (
            
            <div>
              <Todoform onSubmit={this.addTodo}/>
             {todos.map(todo =>(
                 <Todo
                 key={todo.id}
                 complete={todo.complete}
                 toggleComplete={() => this.toggleComplete(todo.id)}
                 onDelete={() => this.handleDeleteTodo(todo.id)}
                 text={todo.text}
                 todo={todo}/>
                 
             ))}
             <div>todos left :{this.state.todos.filter(todo=>!todo.complete).length}</div>
             <button onClick={()=>this.updateShowTodo("all")}>all</button>
             <button onClick={()=>this.updateShowTodo("active")}>active</button>
             <button onClick={()=>this.updateShowTodo("complete")}>complete</button>
             {this.state.todos.some(todo=>todo.complete)?(<div>
                 <button onClick={this.DeleteAllCompleteTodo}>Remove all complete todos</button>
             </div>):null}
             <div>
                 <button onClick={()=>
                    this.setState({
                        todos:this.state.todos.map(todo=>({
                            ...todo,
                            complete:this.state.toggleAllComplete
                        })),
                        toggleAllComplete:!this.state.toggleAllComplete
                    })}>toggle all complete : {`${this.state.toggleAllComplete}`}</button>
             </div>
            </div>
        )
    }
}
