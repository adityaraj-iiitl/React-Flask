import {useState , useEffect} from 'react'

function App()
{
  const [tasks,setTasks]=useState(()=>{
    const savedTasks= localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks):[];
  });
  useEffect(()=>{
    localStorage.setItem("tasks",JSON.stringify(tasks));
  },[tasks]);
  const [newTask,setNewTask]=useState("");

  function handleInputChange(event)
  {
    setNewTask(event.target.value);
  }
  function deleteTask(index)
  {
    const updatedTasks=[...tasks];
    updatedTasks.splice(index,1);
    setTasks(updatedTasks);
  }
  function moveTaskUp(index)
  {
    if(index>0)
    {
      const updatedTasks=[...tasks];
      const temp=updatedTasks[index];
      updatedTasks[index]=updatedTasks[index-1];
      updatedTasks[index-1]=temp;
      setTasks(updatedTasks);
    }
  }
  function moveTaskDown(index)
  {
    if(index<tasks.length()-1)
    {
      const updatedTasks=[...tasks];
      const temp=updatedTasks[index];
      updatedTasks[index]=updatedTasks[index+1];
      updatedTasks[index+1]=temp;
      setTasks(updatedTasks)
    }
  }
  return(<>
  <div className="to-do-list">
    <h1 >To-Do-List</h1>

    <div className="input-container" >
      <input type="text" style={{fontSize:'25px' , paddingLeft:'10px'}} placeholder="Enter a new task..." value={newTask} onChange={handleInputChange} />
      <button onClick={() => {if(newTask.trim()!==""){setTasks([...tasks,newTask]);setNewTask("")}}} style={{backgroundColor:'green', fontSize:'25px'}}>Add Task</button>
    </div>
    <div className="task-container">
    {tasks.map((task,index)=>(
      <div className="task-container" key={index}>
        <div className="task-row">
          <span className="text">{task}</span>
          <div className="buttons">
          <button onClick={()=>deleteTask(index)} style={{backgroundColor:'red' , fontSize:'25px', }}>Delete</button>
          <button onClick={()=>moveTaskUp(index)} style={{backgroundColor:'aqua' , fontSize:'25px', paddingLeft:'20px'}}>⬆️</button>
          <button onClick={()=>moveTaskDown(index)} style={{backgroundColor:'aqua' , fontSize:'25px', paddingLeft:'20px'}}>⬇️</button>
          </div>
          </div>
      </div>
      
    ))}
    </div>
  </div>
  </>)
}

export default App;