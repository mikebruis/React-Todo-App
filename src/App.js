import './App.css';
import { useState, useEffect} from "react";
import{Task} from "./Task"

function App() {
  const[todoList, setTodoList] = useState([]); 
  const [newTask, setNewTask]= useState("");  

  
  const handleChange = (event)=> {
    setNewTask(event.target.value);
  };
  useEffect(()=>{
    window.localStorage.setItem("key1",JSON.stringify(todoList))},[todoList]);

    useEffect(()=>{
      const mydata =window.localStorage.getItem('key1');
      if(mydata)
    
        setTodoList(JSON.parse(mydata)) },[]);

  const addTask = () => {
    const task = {
      id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
      taskName: newTask,
      completed: false,
    };
    setTodoList([...todoList, task]);
  };

const deleteTask = (id) => {
   setTodoList(todoList.filter((task) => task.id !== id));
};
 
const completeTask = (id) => {
  setTodoList(
    todoList.map((task) => {
      if (task.id === id) {
        return { ...task, completed: true};
      } else {
        return task;
      }
    })
  );
}; 

return (
   <div className="App">
     <div className="addTask">
       <input onChange={handleChange} />
       <button onClick= {addTask}> Add Task</button>
       </div>
       <div className="list">
        {todoList.map((task) => {
          return <Task taskName={task.taskName} 
          id={task.id} 
          completed={task.completed}
          deleteTask={deleteTask}
          completeTask={completeTask}
          />;
          
        })}
       </div>
    </div>
     );
      }


export default App;
