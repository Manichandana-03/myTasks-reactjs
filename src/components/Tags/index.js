import './index.css'

const Tags = props => {
  const {tagDetails, changeTag, isActive} = props
  const {optionId, displayText} = tagDetails
  const className = isActive ? '#f3aa4e' : 'transparent'
  const tagClicked = () => {
    changeTag(optionId)
  }
  return (
    <li>
      <button
        type="button"
        onClick={tagClicked}
        className={`button ${className}`}
      >
        {displayText}
      </button>
    </li>
  )
}
export default Tags
