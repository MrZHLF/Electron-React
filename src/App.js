import React, { useState } from 'react'
import SimpleMDE from 'react-simplemde-editor'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'easymde/dist/easymde.min.css'
import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons'

import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import defaultFiles from './utils/defaultFiles'
import BottomBtn from './components/BottomBtn.jsx'
import TabList from './components/TabList'

function App() {
  const [files, setFiles] = useState(defaultFiles)
  const [activeFileID, setActiveFileID] = useState('')
  const [opendFileIDs, setOpendFileIDs] = useState([])
  const [unsavedFileIDs, setUnsavedFileIDs] = useState([])

  const opendFiles = opendFileIDs.map(openID => {
    return files.find(file => file.id === openID)
  })

  const activeFile = files.find(find => find.id === activeFileID)

  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
        <div className="col-3 bg-light left-panel">
          <FileSearch
            title="我的云文档"
            onFileSearch={value => {
              console.log(value)
            }}
          />{' '}
          <FileList
            files={files}
            onFileClick={id => {
              console.log(id)
            }}
            onFileDelete={id => {
              console.log('delete', id)
            }}
            onSaveEdit={(id, newValue) => {
              console.log(newValue, id)
            }}
          />{' '}
          <div className="row no-gutters button-group">
            <div className="col-6">
              <BottomBtn text="新建" colorClass="btn-primary" icon={faPlus} />{' '}
            </div>{' '}
            <div className="col-6">
              <BottomBtn
                text="导入"
                colorClass="btn-success"
                icon={faFileImport}
              />{' '}
            </div>{' '}
          </div>{' '}
        </div>{' '}
        <div className="col-9  right-panel">
          {!activeFile && (
            <div className="start-page">选择或者创建新的Markdown 文档</div>
          )}
          {activeFile && (
            <>
              <TabList
                files={opendFiles}
                activeId={{ activeFileID }}
                unsaveId={{ unsavedFileIDs }}
                onTabClick={id => {
                  console.log('tab', id)
                }}
                onCloseTab={id => {
                  console.log('onCloseTab', id)
                }}
              />{' '}
              <SimpleMDE
                value={activeFile && activeFile.body}
                onChange={value => {
                  console.log(value)
                }}
                options={{ minHeight: '515px' }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
