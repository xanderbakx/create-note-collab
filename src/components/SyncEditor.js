import React, { useEffect, useMemo, useState } from 'react'
import { createEditor, Node } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { v4 as uuidv4 } from 'uuid'
import io from 'socket.io-client'

const socket = io('http://localhost:8080')

// const serialize = nodes => {
//   console.log(nodes.newValue)
//   return nodes.newValue.map(n => Node.string(n)).join('')
// }

const SyncEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState([
    {
      children: [
        { text: 'This is editable plain text, just like a <textarea>!' },
      ],
    },
  ])

  //const content = serialize(value)
  const uniqueId = uuidv4()

  useEffect(() => {
    socket.on('update-content', data => {
      console.log('update', data)
      setValue(data)
    })
  })

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={newValue => {
        console.log('change')
        setValue(newValue)
        socket.emit(
          'update-content',
          //setValue(newValue)
          newValue
        )
      }}
    >
      <Editable />
    </Slate>
  )
}

export default SyncEditor
