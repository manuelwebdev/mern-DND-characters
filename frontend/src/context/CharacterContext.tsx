import { createContext, useReducer } from 'react'

export const CharactersContext = createContext<any>(null)

export const charactersReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_CHARACTER':
      return {
        characters: action?.payload,
      }
    case 'CREATE_CHARACTER':
      return {
        characters: [action?.payload, ...state?.characters],
      }
    case 'DELETE_CHARACTER':
      const removedCharacterList = state?.characters?.filter(
        (character: any) => character?._id !== action?.payload?._id
      )
      return {
        characters: removedCharacterList,
      }
    case 'UPDATE_CHARACTER':
      const updatedCharacterList = state?.characters?.map((character: any) => {
        if (character?._id === action?.payload?._id) {
          return action?.payload
        } else {
          return character
        }
      })
      return {
        characters: updatedCharacterList,
      }

    default:
      return state
  }
}

export const CharactersContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(charactersReducer, {
    characters: [],
  })

  return (
    <CharactersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CharactersContext.Provider>
  )
}
