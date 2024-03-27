import React, { useEffect, useState } from 'react';
import AddForm from '../../component/Addform';
import Navbar from '../../component/navbar';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateid, updatevalue, status } from '../../redux/slice/slice';
import { Link } from 'react-router-dom';

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        getTodos();
    }, []);

    const getTodos = async () => {
        
        const userId = localStorage.getItem('id');
        axios.get(`http://localhost:300/todo?userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },

        })
            .then((response) => {
                console.log(response.data);
                setTodos(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching todos:', error);
            });
    }
const deleteTodo = async (id) => {
    try{
        const response = await axios.delete(`http://localhost:300/todo/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
    }
    )}catch(error){
        console.log(error)
    }
    getTodos();

}
    return (
        
        <div>
                <Navbar />
            <h1>Todo</h1>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>delete</th>
                    <th>edit</th>

        
                </tr>
                {todos.map((todo) => (
                    <tr key={todo._id}>
                        <td>{todo.name}</td>
                        <td>{todo.email}</td>
                        <td><button  onClick={()=>deleteTodo(todo._id)}>Delete</button></td>
                        <td>
                           <Link to={'/Addform'}>
                           <button onClick={() => {dispatch(updateid(todo._id),dispatch(updatevalue(todo)),dispatch(status(true)))}}>Edit</button>
                           </Link>
                            </td>
                    </tr>
                ))}
            </table>
        
            {/* <AddForm/> */}
        </div>
    );
};

export default Todo;
