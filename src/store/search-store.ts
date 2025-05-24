import { create } from 'zustand'

type SearchStore = {
  query: string
  setQuery: (newQuery: string) => void
  clearQuery: () => void
}

export const useSearchStore = create<SearchStore>((set) => ({
  query: '',
  setQuery: (newQuery) => set({ query: newQuery }),
  clearQuery: () => set({ query: '' })
}))
