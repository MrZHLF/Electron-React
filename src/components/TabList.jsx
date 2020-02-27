import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
const TabList = ({ files, activeId, unsaveId, onTabClick, onCloseTab }) => {
  return (
    <ul className="nav nav-pills">
      {files.map(file => {
        const fClassName = classNames({
          'nav-link': true,
          active: file.id === activeId
        })
        return (
          <li className="nav-item" key={file.id}>
            <a
              href="#"
              className={fClassName}
              onClick={e => {
                onTabClick(file.id)
              }}
            >
              {file.title}
              <span className="ml-2">
                <FontAwesomeIcon size="lg" icon={faTimes} />
              </span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
TabList.prototype = {
  files: PropTypes.array,
  activeId: PropTypes.string,
  unsaveId: PropTypes.array,
  onTabClick: PropTypes.func,
  onCloseTab: PropTypes.func
}

TabList.defaultProps = {
  unsaveId: []
}
export default TabList
