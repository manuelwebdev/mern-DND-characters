import { createContext, useReducer } from 'react'

export const CharactersContext = createContext<any>(null)

export const charactersReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_CHARACTER':
      return {
        characters: action.payload,
      }
    case 'CREATE_CHARACTER':
      return {
        characters: [action.payload, ...state.characters],
      }
    default:
      return state
  }
}

export const CharactersContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(charactersReducer, {
    characters: null,
  })

  return (
    <CharactersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CharactersContext.Provider>
  )
}
