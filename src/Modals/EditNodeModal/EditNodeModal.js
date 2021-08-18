import React, { useState } from 'react'

export const EditNodeModal = (props) => {
  const [profile, setprofile] = useState({ ...props.currentNode })

  const inputProfileHandler = (event) => {
    const profileCopy = { ...profile }
    profileCopy[event.target.name] = event.target.value
    setprofile(profileCopy)
  }
  const findNode = (tree, currentNode) => {
    if (tree.id === currentNode.id) {
      tree.name = profile.name
      tree.surname = profile.surname

      return tree
    } else {
      tree.descendants.map((node, index) => {
        if (node.id === currentNode.id) {
          tree.name = profile.name
          tree.surname = profile.surname
          return tree
        } else {
          return findNode(node, currentNode)
        }
      })
    }
    return tree
  }
  const editNodeHandler = (event) => {
    const treeCopy = { ...props.tree }
    event.preventDefault()
    const fullTree = findNode(treeCopy, props.currentNode)
    props.settree(fullTree)
    props.settreeEditNodeId(null)
  }
  const cancelEditNodeHandler = () => {
    props.settreeEditNodeId(null)
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
        onSubmit={(event) => editNodeHandler(event)}
      >
        <input
          type='text'
          placeholder='Enter your new name'
          style={{ display: 'block' }}
          onChange={inputProfileHandler}
          name='name'
          value={profile.name}
        />
        <input
          type='text'
          placeholder='Enter your new surname'
          style={{ display: 'block', margin: '10px 0px' }}
          onChange={inputProfileHandler}
          name='surname'
          value={profile.surname}
        />
        <div
          style={{ display: 'flex', justifyContent: 'left', marginTop: '10px' }}
        >
          <button
            style={{ marginRight: '65px' }}
            onClick={cancelEditNodeHandler}
          >
            cancel
          </button>
          <button type='submit'>save</button>
        </div>
      </form>
    </div>
  )
}
