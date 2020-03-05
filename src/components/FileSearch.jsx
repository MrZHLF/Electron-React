import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

import useKeyPress from './../hooks/useKeyPress.js'

const FileSearch = ({ title, onFileSearch }) => {
  const [inputAction, setInputAction] = useState(false)
  const [value, setValue] = useState('')
  const inputEl = useRef(null)

  // 回车键
  const enterPressed = useKeyPress(13)
  // esc键
  const encPressed = useKeyPress(27)
  //清空内容
  const closeSearch = () => {
    // e.preventDefault()
    setInputAction(false)
    setValue('')
    onFileSearch('')
  }

  useEffect(() => {
    if (enterPressed && inputAction) {
      onFileSearch(value)
    }
    if (encPressed && inputAction) {
      closeSearch()
    }
    // const handleInputEvent = event => {
    //   const { keyCode } = event
    //   if (keyCode === 13 && inputAction) {
    //     //   键盘回车键
    //     onFileSearch(value)
    //     setValue('')
    //   } else if (keyCode === 27 && inputAction) {
    //     // 键盘esc
    //     closeSearch(event)
    //   }
    // }
    // document.addEventListener('keyup', handleInputEvent)
    // return () => {
    //   document.removeEventListener('keyup', handleInputEvent)
    // }
  })

  //   input聚焦
  useEffect(() => {
    if (inputAction) {
      // current` 指向已挂载到 DOM 上的文本输入元素
      inputEl.current.focus()
    }
  }, [inputAction])

  return (
    <div className="alert alert-primary">
      {!inputAction && (
        <div className="d-flex alert-primary justify-content-between align-items-center mb-0">
          <span>{title}</span>
          <button
            type="button"
            className="icon-button"
            onClick={() => {
              setInputAction(true)
            }}
          >
            <FontAwesomeIcon size="lg" icon={faSearch} title="搜索" />
          </button>
        </div>
      )}
      {inputAction && (
        <div className="d-flex justify-content-between align-items-center">
          <input
            className="form-control"
            value={value}
            ref={inputEl}
            onChange={e => {
              setValue(e.target.value)
            }}
          />
          <button type="button" className="icon-button" onClick={closeSearch}>
            <FontAwesomeIcon size="lg" icon={faTimes} title="关闭" />
          </button>
        </div>
      )}
    </div>
  )
}

// 类型检测  isRequired必填写
FileSearch.propTypes = {
  title: PropTypes.string,
  onFileSearch: PropTypes.func.isRequired
}

// 默认属性
FileSearch.defaultProps = {
  title: '我的云文档'
}
export default FileSearch
