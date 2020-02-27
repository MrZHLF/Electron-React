import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'

const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {
  return (
    <ul className="list-group list-group-flush file-list">
      {files.map(file => {
        ;<li
          className="list-group-item bg-light d-flex align-items-center file-item"
          key={file.id}
        >
          <span>{file.title}</span>
        </li>
      })}
    </ul>
  )
}

export default FileList
