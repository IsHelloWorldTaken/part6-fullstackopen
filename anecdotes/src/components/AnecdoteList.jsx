import { useAnecdotes, useActions } from "../store"

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { vote } = useActions()

  const anecdotesSorted = anecdotes => {
    return anecdotes.toSorted((anecdoteA, anecdoteB) => (
      anecdoteB.votes - anecdoteA.votes
    ))
  }

  return (
    <div>
      {anecdotesSorted(anecdotes).map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList