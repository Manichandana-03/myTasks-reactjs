import './index.css'

const Tasks = props => {
  const {taskDetails} = props
  const {taskName, taskCategory} = taskDetails
  return (
    <li>
      <p>{taskName}</p>
      <p>{taskCategory}</p>
    </li>
  )
}

export default Tasks
