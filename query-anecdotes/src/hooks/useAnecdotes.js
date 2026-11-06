import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createNewAnecdote, updateAnecdote } from '../requests/anecdotes'
import useNotify from './useNotify'

export const useAnecdotes = () => {
  const queryClient = useQueryClient()
  const { displayNotification } = useNotify()

  const result = useQuery({
    queryKey:['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: createNewAnecdote,
    onSuccess: newAnecdote => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueriesData(['anecdotes'], anecdotes.concat(newAnecdote))
      displayNotification(`anecdote '${newAnecdote.content}' created`)
    },
    onError: () => {
      displayNotification('too short anecdote, must have length 5 or more')
    }
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: newAnecdote => newAnecdoteMutation.mutate({ content: newAnecdote }),
    vote: anecdote => {
      updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    }
  }
}