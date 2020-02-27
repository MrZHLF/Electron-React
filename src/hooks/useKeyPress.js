import React, { useState, useEffect } from 'react'

const useKeyPress = targetKeyCode => {
  const [keyPressed, setKeyPressed] = useState(false)

  const keyDownHandler = ({ keyCode }) => {
    if (keyCode === targetKeyCode) {
      // 按下
      setKeyPressed(true)
    }
  }

  const keyUpHandler = ({ keyCode }) => {
    if (keyCode === targetKeyCode) {
      // 松开
      setKeyPressed(false)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler)
    document.addEventListener('keyup', keyUpHandler)
    return () => {
      document.removeEventListener('keydown', keyDownHandler)
      document.removeEventListener('keyup', keyUpHandler)
    }
  }, [])

  return keyPressed
}

export default useKeyPress
