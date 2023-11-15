import React from 'react'

type Props = {
  character: any
}

export default function CharacterDetails(props: Props) {
  const {
    character: {
      _id,
      name,
      class: characterClass,
      level = 0,
      race = 'unknown',
      background = null,
      alignment = null,
    },
  } = props
  return (
    <div className='characterDetails'>
      <h2>Name: {name}</h2>
      <p>Class: {characterClass}</p>
      <p>Level: {level}</p>
      <p>Race: {race}</p>
      <p>Background: {background}</p>
      <p>Alignment: {alignment}</p>
    </div>
  )
}
