import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

const useStatsStore = create(set => ({
  good: 0,
  neutral: 0,
  bad: 0,
  addByVote: (vote) => {
    set(state => ({[vote]: state[vote] + 1}))
  }
}))

export const useStatsIncrement = () => useStatsStore(state => state.addByVote)
export const useVotes = () => useStatsStore(
  useShallow(state => ({
    good: state.good,
    neutral: state.neutral,
    bad: state.bad
  }))
)