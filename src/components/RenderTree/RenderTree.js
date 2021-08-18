import React, { useState } from 'react'
import AddNodeModal from '../../Modals/AddNodeModal'

export const RenderTree = (props) => {
  const [treeNodeId, settreeNodeId] = useState(Number)
  const toggleFormModal = (familyData) => {
    settreeNodeId(familyData.id)
  }

  const deleteNode = (tree, currentNode) => {
    console.log('test')
    if (tree.id === currentNode.id) {
      console.log('asd')
      return tree
    } else {
      tree.descendants.map((node, index) => {
        if (node.id === currentNode.id) {
          tree.descendants.splice(index, 1)
          return tree
        } else {
          return deleteNode(node, currentNode)
        }
      })
    }
    return tree
  }
  const deleteNodeHandler = (currentNode) => {
    const treeCopy = { ...props.tree }
    const fullTree = deleteNode(treeCopy, currentNode)
    props.settree(fullTree)
  }

  const RenderTreeHandler = (currentNode) => {
    console.log(currentNode)
    const elements = []
    if (currentNode.descendants.length > 0) {
      currentNode.descendants.map((profile, index) => {
        elements.push(
          <span style={{ marginTop: '30px' }}>
            {RenderTreeHandler(profile)}
          </span>
        )
      })
      return (
        <div>
          <span
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {elements}
          </span>
          <div
            style={{
              textAlign: 'center',
              marginRight: '30px',
              margin: '30px, auto, 0px, auto',
            }}
          >
            <span
              style={{
                backgroundColor: 'grey',
                margin: '20px 10px',
                borderRadius: '50%',
                textAlign: 'center',
                display: 'inline-block',
                width: 'auto',
                padding: '10px',
              }}
            >
              <div>
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => toggleFormModal(currentNode)}
                >
                  +
                </span>
                <span
                  style={{ margin: '0px 15px', cursor: 'pointer' }}
                  onClick={() => deleteNodeHandler(currentNode)}
                >
                  x
                </span>
                <span style={{ cursor: 'pointer' }}>edit</span>
                {treeNodeId === currentNode.id ? (
                  <AddNodeModal
                    tree={props.tree}
                    currentNode={currentNode}
                    settreeNodeId={settreeNodeId}
                    settree={props.settree}
                  />
                ) : null}
              </div>
              {currentNode.name}
            </span>
          </div>
        </div>
      )
    } else {
      return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <span style={{ display: 'flex', justifyContent: 'center' }}>
            {elements}
          </span>
          <div
            style={{
              textAlign: 'center',
              marginRight: '30px',
              margin: '30px, auto, 0px, auto',
            }}
          >
            <span
              style={{
                backgroundColor: 'grey',
                margin: '20px 10px',
                borderRadius: '50%',
                textAlign: 'center',
                display: 'inline-block',
                width: 'auto',
                padding: '10px',
              }}
            >
              <div>
                <span
                  onClick={() => toggleFormModal(currentNode)}
                  style={{ cursor: 'pointer' }}
                >
                  +
                </span>
                <span
                  style={{ margin: '0px 15px', cursor: 'pointer' }}
                  onClick={() => deleteNodeHandler(currentNode)}
                >
                  x
                </span>
                <span style={{ cursor: 'pointer' }}>edit</span>
                {treeNodeId === currentNode.id ? (
                  <AddNodeModal
                    tree={props.tree}
                    currentNode={currentNode}
                    settreeNodeId={settreeNodeId}
                    settree={props.settree}
                  />
                ) : null}
              </div>
              {currentNode.name}
            </span>
          </div>
        </div>
      )
    }
  }
  return <div>{RenderTreeHandler(props.tree)}</div>
}
