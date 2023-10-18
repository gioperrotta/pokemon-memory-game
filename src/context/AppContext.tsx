/* eslint-disable react-refresh/only-export-components */
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react'

interface Props {
  id: string
  name: string
  image: string
  flipped: boolean
  checked: boolean
}

type CardProps = Props | null

interface AppContext {
  cards: CardProps[]
  setCards: Dispatch<SetStateAction<CardProps[]>>

  numberFlipped: number
  setNumberFlipped: Dispatch<SetStateAction<number>>
}

const AppContext = createContext<AppContext>(null!)

export function AppProvider({ children }: { children: ReactNode }) {
  const [cards, setCards] = useState<CardProps[]>([])

  const [numberFlipped, setNumberFlipped] = useState(0)


  return (
    <AppContext.Provider value={{
      cards, setCards,
      numberFlipped, setNumberFlipped,

    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)