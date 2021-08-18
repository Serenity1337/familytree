import React, { useState } from 'react'
import AddNodeModal from '../../Modals/AddNodeModal'
import EditNodeModal from '../../Modals/EditNodeModal'

export const RenderTree = (props) => {
  const [treeNodeId, settreeNodeId] = useState(Number)
  const [treeEditNodeId, settreeEditNodeId] = useState(Number)
  const [tempTree, settempTree] = useState({})
  const toggleFormModal = (currentNode) => {
    settreeNodeId(currentNode.id)
  }
  console.log(tempTree)
  const toggleEditFormModal = (currentNode) => {
    settreeEditNodeId(currentNode.id)
  }

  const showBranch = (tree, currentNode) => {
    if (tree.id === currentNode.id) {
      tree.descendants = [...tempTree[tree.id], ...tree.descendants]
      const tempTreeClone = { ...tempTree }
      delete tempTreeClone[tree.id]
      settempTree(tempTreeClone)
      return tree
    } else {
      tree.descendants.map((node, index) => {
        if (node.id === currentNode.id) {
          node.descendants = [...tempTree[node.id], ...node.descendants]
          const tempTreeClone = { ...tempTree }
          delete tempTreeClone[node.id]
          settempTree(tempTreeClone)
          return tree
        } else {
          return showBranch(node, currentNode)
        }
      })
    }
    return tree
  }

  const hideBranch = (tree, currentNode) => {
    if (tree.id === currentNode.id) {
      const tempTreeClone = { ...tempTree }
      tempTreeClone[tree.id] = tree.descendants
      settempTree(tempTreeClone)
      tree.descendants = []
      return tree
    } else {
      tree.descendants.map((node, index) => {
        if (node.id === currentNode.id) {
          const tempTreeClone = { ...tempTree }
          tempTreeClone[node.id] = node.descendants
          settempTree(tempTreeClone)
          node.descendants = []
          return tree
        } else {
          return hideBranch(node, currentNode)
        }
      })
    }
    return tree
  }
  const hideOrShowBranchHandler = (currentNode) => {
    const treeCopy = { ...props.tree }
    let fullTree
    if (tempTree[currentNode.id]) {
      fullTree = showBranch(treeCopy, currentNode)
      props.settree(fullTree)
    } else {
      fullTree = hideBranch(treeCopy, currentNode)
      props.settree(fullTree)
    }
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
          <span style={{ marginTop: '30px', width: '50%' }}>
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
              alignItems: 'flex-end',
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
                <span
                  style={{ cursor: 'pointer', marginRight: '5px' }}
                  onClick={() => toggleEditFormModal(currentNode)}
                >
                  edit
                </span>

                {tempTree[currentNode.id] ? (
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => hideOrShowBranchHandler(currentNode)}
                  >
                    show
                  </span>
                ) : (
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => hideOrShowBranchHandler(currentNode)}
                  >
                    hide
                  </span>
                )}
                {treeNodeId === currentNode.id ? (
                  <AddNodeModal
                    tree={props.tree}
                    currentNode={currentNode}
                    settreeNodeId={settreeNodeId}
                    settree={props.settree}
                  />
                ) : null}
                {treeEditNodeId === currentNode.id ? (
                  <EditNodeModal
                    tree={props.tree}
                    currentNode={currentNode}
                    settreeEditNodeId={settreeNodeId}
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
                <span
                  style={{ cursor: 'pointer', marginRight: '5px' }}
                  onClick={() => toggleEditFormModal(currentNode)}
                >
                  edit
                </span>
                {tempTree[currentNode.id] ? (
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => hideOrShowBranchHandler(currentNode)}
                  >
                    show
                  </span>
                ) : (
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => hideOrShowBranchHandler(currentNode)}
                  >
                    hide
                  </span>
                )}
                {treeNodeId === currentNode.id ? (
                  <AddNodeModal
                    tree={props.tree}
                    currentNode={currentNode}
                    settreeNodeId={settreeNodeId}
                    settree={props.settree}
                  />
                ) : null}
                {treeEditNodeId === currentNode.id ? (
                  <EditNodeModal
                    tree={props.tree}
                    currentNode={currentNode}
                    settreeEditNodeId={settreeEditNodeId}
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
