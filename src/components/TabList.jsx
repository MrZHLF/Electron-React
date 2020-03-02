import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './TabList.scss'
const TabList = ({ files, activeId, unsaveId, onTabClick, onCloseTab }) => {
  return (
    <ul className="nav nav-pills tablist-component">
      {files.map(file => {
        const withUnsavedMark = unsaveId.includes(file.id)
        const fClassName = classNames({
          'nav-link': true,
          active: file.id === activeId,
          'nav-active': file.id === activeId,
          'with-Unsaved': withUnsavedMark
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
              <span
                className="ml-2 close-icon"
                onClick={e => {
                  e.stopPropagation()
                  onCloseTab(file.id)
                }}
              >
                <FontAwesomeIcon size="lg" icon={faTimes} />
              </span>
              {withUnsavedMark && (
                <span className="rounded-circle ml-2 unsaved-icon"></span>
              )}
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
