import React from 'react'
import RenderTree from '../../components/RenderTree'

export const Home = () => {
  const test = {
    name: 'me',
    surname: 'me',
    dob: 'dob',
    id: 1,
    descendants: [
      {
        name: 'mother',
        surname: 'mother',
        dob: 'dob',
        id: 2,
        descendants: [
          {
            name: 'grandmother',
            surname: 'grandmother',
            dob: 'dob',
            id: 3,
            descendants: [
              {
                name: 'grandgrandmother',
                surname: 'grandgrandmother',
                dob: 'dob',
                id: 6,
                descendants: [],
              },
              {
                name: 'grandgrandfather',
                surname: 'grandgrandfather',
                dob: 'dob',
                id: 7,
                descendants: [],
              },
            ],
          },
          {
            name: 'grandfather',
            surname: 'grandfather',
            dob: 'dob',
            id: 4,
            descendants: [
              {
                name: 'grandgrandmother',
                surname: 'grandgrandmother',
                dob: 'dob',
                id: 6,
                descendants: [],
              },
              {
                name: 'grandgrandfather',
                surname: 'grandgrandfather',
                dob: 'dob',
                id: 7,
                descendants: [],
              },
            ],
          },
        ],
      },
      {
        name: 'father',
        surname: 'father',
        dob: 'dob',
        id: 5,
        descendants: [
          {
            name: 'grandmother',
            surname: 'grandmother',
            dob: 'dob',
            id: 6,
            descendants: [
              {
                name: 'grandgrandmother',
                surname: 'grandgrandmother',
                dob: 'dob',
                id: 6,
                descendants: [],
              },
              {
                name: 'grandgrandfather',
                surname: 'grandgrandfather',
                dob: 'dob',
                id: 7,
                descendants: [],
              },
            ],
          },
          {
            name: 'grandfather',
            surname: 'grandfather',
            dob: 'dob',
            id: 7,
            descendants: [
              {
                name: 'grandgrandmother',
                surname: 'grandgrandmother',
                dob: 'dob',
                id: 6,
                descendants: [],
              },
              {
                name: 'grandgrandfather',
                surname: 'grandgrandfather',
                dob: 'dob',
                id: 7,
                descendants: [],
              },
            ],
          },
        ],
      },
    ],
  }
  return (
    <div>
      <RenderTree test={test} />
    </div>
  )
}
