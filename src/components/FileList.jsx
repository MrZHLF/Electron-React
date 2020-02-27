import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import PropTypes from 'prop-types'

import useKeyPress from './../hooks/useKeyPress.js'

const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {
  const [editStatus, setEditStatus] = useState(false) //切换状态
  const [value, setValue] = useState('') //input属性值
  // 回车键
  const enterPressed = useKeyPress(13)
  // esc键
  const encPressed = useKeyPress(27)
  const closeSearch = () => {
    // ESC键
    setEditStatus(false)
    setValue('')
  }

  useEffect(() => {
    if (enterPressed && editStatus) {
      //   键盘回车键
      const editItem = files.find(file => file.id === editStatus)
      onSaveEdit(editItem.id, value)
      setEditStatus(false)
      setValue('')
    }

    if (encPressed && editStatus) {
      closeSearch()
    }
  })

  return (
    <ul className="list-group list-group-flush file-list">
      {files.map(file => (
        <li
          className="list-group-item bg-light row d-flex align-items-center file-item mx-0"
          key={file.id}
          data-id={file.id}
          data-title={file.title}
        >
          {/* 预览 */
          file.id !== editStatus && (
            <>
              <span className="col-2">
                <FontAwesomeIcon size="lg" icon={faMarkdown} />
              </span>
              <span
                className="col-6 c-link"
                onClick={() => {
                  onFileClick(file.id)
                }}
              >
                {file.title}
              </span>
              <button
                type="button"
                className="icon-button col-2"
                onClick={() => {
                  setEditStatus(file.id)
                  setValue(file.title)
                }}
              >
                <FontAwesomeIcon size="lg" icon={faEdit} title="编辑" />
              </button>
              <button
                type="button"
                className="icon-button col-2"
                onClick={() => {
                  onFileDelete(file.id)
                }}
              >
                <FontAwesomeIcon size="lg" icon={faTrash} title="删除" />
              </button>
            </>
          )}
          {/* 编辑状态 */
          file.id == editStatus && (
            <>
              <input
                className="form-control col-10"
                value={value}
                onChange={e => {
                  setValue(e.target.value)
                }}
              />
              <button
                type="button"
                className="icon-button col-2"
                onClick={closeSearch}
              >
                <FontAwesomeIcon size="lg" icon={faTimes} title="关闭" />
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  )
}

FileList.propTypes = {
  title: PropTypes.string,
  onFileClick: PropTypes.func,
  onFileDelete: PropTypes.func,
  onSaveEdit: PropTypes.func
}
export default FileList
