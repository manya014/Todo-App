import { useState } from "react";
import "./Todo.css"
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { TodoDate } from "./TodoDate";
import {getLocalStorageTodoData, setLocalStorageTodoData} from "./TodoLocalStorage";
export const Todo = ()=>{
    ////use- state///////////////////////////////////////////////////////////////////////
    const [task, setTask] = useState(() => getLocalStorageTodoData());
    //////form- submit//////////////////////////////////////////////////////////////////////
    const handleFormSubmit = (inputValue) =>{
        const {id, content, checked} = inputValue;
        // to check if input field is empty or not
        if(!content) return;
        // to check if the data is already existing or not
        // if(task.includes(inputValue)) return;
        const ifTodoContentMatched = task.find((curTask) => curTask.content===content);
        if(ifTodoContentMatched)return;

        setTask((prev) => [...prev,{id:id, content:content, checked:checked}
        ]);
        }
    /////adding data to local storage///////////////////////////////////////////////////////////////////////
    setLocalStorageTodoData(task);

    ///////clear all-btn////////////////////////////////////////////////////////////
    const hanldeClearTodoData=()=>{
        setTask([]);
    }
    //////delete - todo btn/////////////////////////////////////////////////////////////////////
    const handleDeleteTodo=(value)=>{
        const updatedTask = task.filter((curtask)=> curtask.content !== value);
        setTask(updatedTask);
    }
    //////check-uncheck btn//////////////////////////////////////////////////////////////////////////
    const handleCheckedTodo =(content) =>{
       const updatedTask = task.map((curTask)=>{
        if(curTask.content===content){
            return {...curTask, checked:!curTask.checked}
        }
        else{
            return curTask;
        }
       })
       setTask(updatedTask);
    }
    //////////////////////////////////////////////////////////////////////////////////////
    return(
        <section className="todo-container">
            <header>
                <h1>Todo List</h1>
                <TodoDate/>
            </header>
            <TodoForm onAddTodo = {handleFormSubmit}/>
            <section className="myUnOrdList">
                <ul>
                {
                task.map((curTask, index)=>{
                    return <TodoList 
                    key = {curTask.id} 
                    data = {curTask.content} 
                    checked = {curTask.checked}
                    onHandleDeleteTodo = {handleDeleteTodo}
                    onHandleCheckedTodo = {handleCheckedTodo}
                    />
                })
                }
                </ul>
            </section>
                <button className="clear-btn" onClick={hanldeClearTodoData}>Clear All</button>
        </section>
    );
};