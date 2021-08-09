import React, { Component } from 'react';
import shortid from 'shortid';

export default class Todolist extends Component {
    state={
        text:'',
    }
    handelChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        this.props.onSubmit({
            id:shortid.generate(),
            text:this.state.text,
            complete:false
        });
        this.setState({
            text:''
        })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        value={this.state.text}
                        placeholder="todos..."
                        name="text"
                        onChange={this.handelChange}
                        required
                    />
                    <button onClick={this.handleSubmit}>Add Todos</button>
                 </form>
            </div>
        )
    }
}
