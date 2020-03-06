import React, { useState } from 'react'
import SimpleMDE from 'react-simplemde-editor'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'easymde/dist/easymde.min.css'
import uuidv4 from 'uuid/v4'

import { flattenArr, objToArr } from './utils/helper'
import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons'

import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import defaultFiles from './utils/defaultFiles'
import BottomBtn from './components/BottomBtn.jsx'
import TabList from './components/TabList'

function App() {
  const [files, setFiles] = useState(flattenArr(defaultFiles))
  const [activeFileID, setActiveFileID] = useState('')
  const [opendFileIDs, setOpendFileIDs] = useState([])
  const [unsavedFileIDs, setUnsavedFileIDs] = useState([])
  const [searchedFiles, setSearchedFiles] = useState([]) //搜索
  const filesArr = objToArr(files)

  const fileClick = fileID => {
    setActiveFileID(fileID) //选择的
    // 判断是否打开tab切换
    if (!opendFileIDs.includes(fileID)) {
      setOpendFileIDs([...opendFileIDs, fileID]) //打开当前的,tab打开
    }
  }

  const tabClick = fileID => {
    // 点击了当前的tab
    setActiveFileID(fileID)
  }

  const tabClose = id => {
    // 关闭tab
    const tabswithout = opendFileIDs.filter(fileID => fileID !== id)
    setOpendFileIDs(tabswithout)
    // 清空内容，高亮其他
    if (tabswithout.length > 0) {
      // 如果还有tab 设置第一个
      setActiveFileID(tabswithout[0])
    } else {
      setActiveFileID('')
    }
  }

  const fileChange = (id, value) => {
    // 更新内容
    // const newFiles = files.map(file => {
    //   if (file.id === id) {
    //     file.body = value
    //   }
    //   return file
    // })
    const newFile = { ...files[id], body: value }

    setFiles({ ...files, [id]: newFile })

    if (!unsavedFileIDs.includes(id)) {
      setUnsavedFileIDs([...unsavedFileIDs, id])
    }
  }

  const deleteFile = id => {
    // 删除
    // const newFiles = files.filter(file => file.id !== id)
    delete files[id]
    setFiles(files)
    // 关闭tab
    tabClose(id)
  }
  const updateFileName = (id, title) => {
    // 更新标题
    const modifiledFile = { ...files[id], title, isNew: false }
    setFiles({ ...files, [id]: modifiledFile })
  }

  const fileSearch = keyword => {
    // 搜索
    const newFiles = filesArr.filter(file => file.title.includes(keyword))
    setSearchedFiles(newFiles)
  }

  const createNewFile = () => {
    // 创建文件
    const newID = uuidv4() //自动生成id
    // const newFiles = [
    //   ...files,
    //   {
    //     id: newID,
    //     title: '',
    //     body: '## 请输入新创建的内容',
    //     createdAt: new Date().getTime(),
    //     isNew: true
    //   }
    // ]
    const newFile = {
      id: newID,
      title: '',
      body: '## 请输入新创建的内容',
      createdAt: new Date().getTime(),
      isNew: true
    }
    setFiles({ ...files, [newID]: newFile })
  }

  // const activeFile = files.find(find => find.id === activeFileID)
  const activeFile = files[activeFileID]
  let opendFiles = opendFileIDs.map(openID => {
    return files[openID]
  })
  const fileListArr = searchedFiles.length > 0 ? searchedFiles : filesArr
  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
        <div className="col-3 bg-light left-panel">
          <FileSearch title="我的云文档" onFileSearch={fileSearch} />{' '}
          <FileList
            files={fileListArr}
            onFileClick={fileClick}
            onFileDelete={deleteFile}
            onSaveEdit={updateFileName}
          />{' '}
          <div className="row no-gutters button-group">
            <div className="col-6">
              <BottomBtn
                text="新建"
                onBtnClick={createNewFile}
                colorClass="btn-primary"
                icon={faPlus}
              />{' '}
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
          {' '}
          {!activeFile && (
            <div className="start-page"> 选择或者创建新的Markdown 文档 </div>
          )}{' '}
          {activeFile && (
            <>
              <TabList
                files={opendFiles}
                activeId={activeFileID}
                unsaveId={unsavedFileIDs}
                onTabClick={tabClick}
                onCloseTab={tabClose}
              />{' '}
              <SimpleMDE
                key={activeFile && activeFile.id}
                value={activeFile && activeFile.body}
                onChange={value => {
                  fileChange(activeFile.id, value)
                }}
                options={{
                  minHeight: '515px'
                }}
              />{' '}
            </>
          )}{' '}
        </div>{' '}
      </div>{' '}
    </div>
  )
}

export default App
