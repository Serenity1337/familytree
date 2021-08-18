import React, { useState, useEffect } from 'react'

export const AddNodeModal = (props) => {
  const [profile, setprofile] = useState({})

  useEffect(() => {
    profile.id = new Date().getTime()
    profile.descendants = []
  }, [])

  const inputProfileHandler = (event) => {
    const profileCopy = { ...profile }
    profileCopy[event.target.name] = event.target.value
    setprofile(profileCopy)
  }
  const findNode = (tree, currentNode) => {
    if (tree.id === currentNode.id) {
      tree.descendants = [...tree.descendants, profile]
      return tree
    } else {
      tree.descendants.map((node, index) => {
        if (node.id === currentNode.id) {
          node.descendants = [...node.descendants, profile]
          return node
        } else {
          return findNode(node, currentNode)
        }
      })
    }
    return tree
  }
  const addNodeHandler = (event) => {
    event.preventDefault()
    console.log(props)
    const fullTree = findNode(props.tree, props.currentNode)
    props.settree(fullTree)
    props.settreeNodeId(null)
  }
  return (
    <div
      style={{
        backgroundColor: '#111',
        opacity: '0.8',
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        left: '0',
        top: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <form
        action=''
        style={{
          width: '400px',
          height: '400px',
          margin: 'auto',
          opacity: '1',
          paddingLeft: '200px',
        }}
        onSubmit={(event) => addNodeHandler(event)}
      >
        <input
          type='text'
          placeholder='Enter your name'
          style={{ display: 'block' }}
          onChange={inputProfileHandler}
          name='name'
        />
        <input
          type='text'
          placeholder='Enter your surname'
          style={{ display: 'block', margin: '10px 0px' }}
          onChange={inputProfileHandler}
          name='surname'
        />
        <input
          type='date'
          name='dob'
          id=''
          style={{ display: 'block' }}
          onChange={inputProfileHandler}
        />
        <div
          style={{ display: 'flex', justifyContent: 'left', marginTop: '10px' }}
        >
          <button style={{ marginRight: '65px' }}>cancel</button>
          <button type='submit'>save</button>
        </div>
      </form>
    </div>
  )
}
