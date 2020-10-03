import React, {useEffect, useMemo, useState} from 'react';
import {createEditor} from 'slate'
import {Slate, Editable, withReact} from 'slate-react'
import io from 'socket.io-client'

const socket = io('http://localhost:8080')

const SyncEditor = () => {
const editor = useMemo(() => withReact(createEditor()), [])
  // Add the initial value when setting up our state.
  const [value, setValue] = useState([
    {
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ])

  useEffect(() => {
    socket.once('init-value', (value) => {
      setValue(value)
    })
    socket.emit('send-value')
    socket.on('remote-change', ({editorId: value}) => {
      setValue(value)
    })
  })

  return (
    <Slate editor={editor} value={value} onChange={newValue => {
      setValue(newValue)
      socket.emit('text-change', {
        value: newValue
      })
    }}>
      <Editable />
    </Slate>
  )
}

export default SyncEditor