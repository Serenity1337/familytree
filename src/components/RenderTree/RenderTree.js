import React from 'react'

export const RenderTree = (props) => {
  const RenderTreeHandler = (familyData, hashed) => {
    const elements = []
    if (familyData.descendants.length > 0) {
      console.log(familyData)

      let descendanceCopy = [...familyData.descendants]
      descendanceCopy.shift()
      familyData.descendants.map((profile, index) => {
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
          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            {familyData.name}
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <span style={{ display: 'flex', justifyContent: 'center' }}>
            {elements}
          </span>
          <div style={{ textAlign: 'center', marginRight: '30px' }}>
            {familyData.name}
          </div>
        </div>
      )
    }
  }
  return <div>{RenderTreeHandler(props.test)}</div>
}
