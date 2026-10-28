import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  }
}))

import anecdoteService from './services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from './anecdoteStore'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

describe('useAnecdoteStore', () => {
  it('initialize() loads anecdotes from the service', async () => {
    const mockAnecdotes = [{ content: 'Test', id: 1, votes: 0 }]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual(mockAnecdotes)
  })

  it('store returns an array of anecdotes sorted by votes', () => {
    const testAnecdotes = [
      { content: 'Test - no votes', id: 1, votes: 0 },
      { content: 'Test - some votes', id: 2, votes: 3 }
    ]

    useAnecdoteStore.setState({ anecdotes: testAnecdotes })

    const { result: anecdoteResult } = renderHook(() => useAnecdotes())
    expect(anecdoteResult.current).toEqual([testAnecdotes[1], testAnecdotes[0]])
  })

  it('when filter is applied, the store returns only the anecdotes matching the filter', async () => {
    const testAnecdotes = [
      { content: 'Dog walks in a park', id: 1, votes: 0 },
      { content: 'Cat sleeps on a table', id: 2, votes: 0 }
    ]
    useAnecdoteStore.setState({ anecdotes: testAnecdotes })

    const { result } = renderHook(() => useAnecdoteActions())
    await act(async () => {
      await result.current.setFilter('cat')
    })

    const { result: anecdoteResult } = renderHook(() => useAnecdotes())
    expect(anecdoteResult.current).toEqual([testAnecdotes[1]])
  })

  it('voting increases the number of votes for an anecdote', async () => {
    const testAnecdote = { content: 'Test', id: 1, votes: 0 }
    useAnecdoteStore.setState({ anecdotes: [testAnecdote] })
    anecdoteService.update.mockResolvedValue({ ...testAnecdote, votes: 1 })

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.vote(testAnecdote.id)
    })

    const { result: anecdoteResult } = renderHook(() => useAnecdotes())
    expect(anecdoteResult.current[0].votes).toBe(1)
  })
})