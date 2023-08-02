import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import Tags from './components/Tags'
import Tasks from './components/Tasks'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    inputTask: '',
    selectTag: tagsList[0].optionId,
    activeTag: 'INITIAL',
    myTaskList: [],
  }

  onChangeTextInput = event => {
    this.setState({inputTask: event.target.value})
  }

  updateOption = event => {
    this.setState({selectTag: event.target.value})
  }

  addTask = event => {
    event.preventDefault()
    const {inputTask, selectTag} = this.state
    const newTask = {
      id: uuidv4(),
      taskName: inputTask,
      taskCategory: selectTag,
    }
    if (inputTask.length !== 0) {
      this.setState(prevState => ({
        myTaskList: [...prevState.myTaskList, newTask],
        inputTask: '',
        selectTag: tagsList[0].optionId,
      }))
    }
  }

  changeTag = id => {
    this.setState(prevState => ({
      activeTag: prevState.activeTag === id ? 'INITIAL' : id,
    }))
  }

  render() {
    const {selectTag, inputTask, myTaskList, activeTag} = this.state
    const filteredTaskList =
      activeTag === 'INITIAL'
        ? myTaskList
        : myTaskList.filter(each => each.taskCategory === activeTag)
    return (
      <div className="app-container">
        <div className="con-1">
          <h1>Create a task!</h1>
          <form onSubmit={this.addTask}>
            <label htmlFor="task">Task</label>
            <br />
            <input
              id="task"
              value={inputTask}
              type="text"
              onChange={this.onChangeTextInput}
              placeholder="Enter the task here"
            />
            <br />
            <label htmlFor="tag">Tags</label>
            <br />
            <select value={selectTag} id="tag" onChange={this.updateOption}>
              {tagsList.map(eachTag => (
                <option value={eachTag.optionId}>{eachTag.displayText}</option>
              ))}
            </select>
            <button type="submit">Add Task</button>
          </form>
        </div>

        <div className="con-2">
          <div className="tags-container">
            <h1>Tags</h1>
            <ul>
              {tagsList.map(eachTag => (
                <Tags
                  key={eachTag.optionId}
                  tagDetails={eachTag}
                  isActive={eachTag.optionId === activeTag}
                  changeTag={this.changeTag}
                />
              ))}
            </ul>
          </div>
          <div>
            <h1>Tasks</h1>
            {filteredTaskList.length > 0 ? (
              <ul>
                {filteredTaskList.map(each => (
                  <Tasks key={each.id} taskDetails={each} />
                ))}
              </ul>
            ) : (
              <div>
                <p>No Tasks Added Yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
