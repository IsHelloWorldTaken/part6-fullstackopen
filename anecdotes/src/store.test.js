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

  it('store returns an array of anecdotes sorted by votes', async () => {
    const mockAnecdotes = [
      { content: 'Test - no votes', id: 1, votes: 0 },
      { content: 'Test - some votes', id: 2, votes: 3 }
    ]
    useAnecdoteStore.setState({ anecdotes: mockAnecdotes, filter: '' })

    const { result: anecdoteResult } = renderHook(() => useAnecdotes())
    expect(anecdoteResult.current).toEqual([mockAnecdotes[1], mockAnecdotes[0]])
  })
})