import React, { useEffect, useState } from 'react'
import './Todo.css';
import { AiFillDelete   } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";

const Todo = () => {

    const [iscompletescreen,setiscompletescreen] = useState(false);
    const [alltodos,settodos] = useState([]);
    const [newtittle,setnewtittle]=useState("")
    const [newdescription,setnewdescription] = useState('');
    const [completedtodo,setcompletedtodo] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
 




    const handleaddtodo = () =>{
        let newtodoitem = {
            tittle:newtittle,
            description:newdescription,
        }

        let updatetodo = [...alltodos];
        updatetodo.push(newtodoitem);
        settodos(updatetodo);
        localStorage.setItem ('todolist', JSON.stringify (updatetodo));
    }

    const handleDeleteTodo = index => {
      let reducedTodo = [...alltodos];
      reducedTodo.shift(index);
  
      localStorage.setItem ('todolist', JSON.stringify (reducedTodo));
      settodos (reducedTodo);
    };
    const handleDeleteTodo1 = index => {
      
      let reducedTodo1 = [...completedtodo];
      reducedTodo1.shift(index);
  
      localStorage.setItem ('completedtodo', JSON.stringify (reducedTodo1));
      setcompletedtodo (reducedTodo1);

    };


    const handlecomplete = (index) => {

      let filtereditem = {
        ...alltodos[index],
      
        
       
      }
      let updatedcompletedarr = [...completedtodo];
      updatedcompletedarr.push(filtereditem)
      setcompletedtodo(updatedcompletedarr)
      handleDeleteTodo(index)
      localStorage.setItem ('completedtodo', JSON.stringify (updatedcompletedarr));
      
    }

    useEffect(() =>{

        let  savedtodo = JSON.parse(localStorage.getItem("todolist"))
        let  savedcompletedtodo = JSON.parse(localStorage.getItem("completedtodo"))
        if (savedtodo) {
            settodos (savedtodo);
          }

          if (savedcompletedtodo) {
            setcompletedtodo(savedcompletedtodo);
          }
      
    },[])


    const filteredTodos = alltodos.filter(todo =>
      todo.tittle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const filteredCompletedTodos = completedtodo.filter(todo =>
      todo.tittle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    







  return (
    <div>
      <h1>My Todo</h1>



      <div className='todo-wrapper'>
        <div className='todo-input'>
            <div className='todo-input-item'>
                <label>Tittle</label>
                <input type='text' value={newtittle} onChange= { (e) => setnewtittle (e.target.value) }  placeholder='what is a task tittle ' />
            </div>
            <div className='todo-input-item'>
                <label>Description</label>
                <input type='text' placeholder='what is a task description?' value={newdescription} onChange = {(e) => setnewdescription (e.target.value) }/>
            </div>
            <div className='todo-input-item'>
                <button type='button' className='primary-btn' onClick={handleaddtodo}>Add</button>
            </div>


        <div className="todo-input-item">
        <label>Search</label>
          <input
            type='text'
            placeholder='Search tasks...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
            

        
         </div>

         <div className='btn-area'>
            <button className={`secondary-btn ${iscompletescreen === false && "active" }` } onClick={()=> setiscompletescreen (false) }
            >todo</button>
            <button className={`secondary-btn ${iscompletescreen === true && "active" }` } onClick={()=> setiscompletescreen (true) }>completed</button>
         </div>


         <div className='todo-list'>

            {iscompletescreen === false  &&  filteredTodos.map((item,index) => {
                return(
                    <div  className='todo-list-item' key={index}>
                    <div>
                      <h2>{item.tittle}</h2>
                        <p>{item.description}</p>
                    </div>
                    <div>
                         <AiFillDelete className='icon' onClick={()=>handleDeleteTodo(index)} title="Delete?" />
                        <FaCheck  className='check-icon'  onClick={()=>handlecomplete(index)} />
                     </div>
    
                </div>

                )
            }
        ) }

                {iscompletescreen === true  &&  filteredCompletedTodos.map((item,index) => {
                return(
                    <div  className='todo-list-item' key={index}>
                    <div>
                      <h2>{item.tittle}</h2>
                        <p>{item.description}</p>
                    </div>
                    <div>
                         <AiFillDelete className='icon' onClick={()=>handleDeleteTodo1(index)} title="Delete?" />
                     
                     </div>
    
                </div>

                )
            }
        ) }
                 

      






          
           
         </div>

      </div>










    </div>
  )
}

export default Todo
