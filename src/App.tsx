import styles from './App.module.css';
import { Header } from './components/Header';
import { Task } from './components/Task';
import { TaskInfo } from './components/TaskInfo';
import { FaPlusCircle, FaClipboard } from 'react-icons/fa';
import { FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './global.css';

interface contentTask {
  id: string,
  content: string,
  isCompleted: boolean,
}

export function App() {

  const [tasks, setTasks] = useState<contentTask[]>([]);
  const [newTask, setNewTasks] = useState('');

  const canSubmit = newTask.length === 0;
  const numberOfTasks = tasks.length;
  const numberOfCompletedTasks = tasks.filter(task => task.isCompleted).length
  const containTasks = numberOfTasks === 0;

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    setTasks([...tasks, {
      id: uuidv4(),
      content: newTask,
      isCompleted: false,
    }])

    setNewTasks('');
  }

  function handleNewTaskChange(taskId: string){
    const newTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted
        }
      }
      return task;
    })
    
    setTasks(newTasks)
  }

  function handleDeleteTask (taskDelete: string) {
    const taskWithoutDeleteOne = tasks.filter((task) => {
      return task.id != taskDelete;
    })

    setTasks(taskWithoutDeleteOne);
  }

  return (
    <div>
      <Header />

      <div className={styles.contentApp}>

        <div className={styles.newTaskField}>
          <form onSubmit={handleCreateNewTask}>
            <input
              type="search"
              placeholder="Adicione uma nova tarefa"
              name="inText"
              value={newTask}
              onChange={event => setNewTasks(event.target.value)}
            />
            <button type="submit" disabled={canSubmit}>
              Criar
              <FaPlusCircle size={15} />
            </button>
          </form>
        </div>

        <div className={styles.taskContent}>
          <TaskInfo
            tasks={numberOfTasks}
            completedTasks={numberOfCompletedTasks}
          />
          <hr />
          <div className={containTasks ? styles.emptyTaskContent : styles.emptyTaskContentDisabled}>
            <FaClipboard size={50} />
            <h3>
              <span>Você ainda não tem tarefas cadastradas</span> Crie tarefas e organize seus itens a fazer
            </h3>
          </div>
          <div className={styles.tasks}>
            {tasks.map(tasks => {
              return(
                <Task
                  key={tasks.id}
                  id={tasks.id}
                  content={tasks.content}
                  isCompleted={tasks.isCompleted}
                  onDeleteTask={handleDeleteTask}
                  onCompletedTask={handleNewTaskChange}
                />
              )
            })}
          </div>
        </div>

      </div>

    </div>
  )
}

export default App
