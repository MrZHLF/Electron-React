import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons'

import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import defaultFiles from './utils/defaultFiles'
import BottomBtn from './components/BottomBtn.jsx'
import TabList from './components/TabList'
function App() {
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
            files={defaultFiles}
            onFileClick={id => {
              console.log(id)
            }}
            onFileDelete={id => {
              console.log('delete', id)
            }}
            onSaveEdit={(id, newValue) => {
              console.log(newValue, id)
            }}
          />
          <div className="row no-gutters">
            <div className="col-6">
              <BottomBtn text="新建" colorClass="btn-primary" icon={faPlus} />
            </div>
            <div className="col-6">
              <BottomBtn
                text="导入"
                colorClass="btn-success"
                icon={faFileImport}
              />
            </div>
          </div>
        </div>{' '}
        <div className="col-9  right-panel">
          <TabList
            files={defaultFiles}
            activeId="1"
            onTabClick={id => {
              console.log('tab', id)
            }}
          />
        </div>{' '}
      </div>{' '}
    </div>
  )
}

export default App
