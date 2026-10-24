import { useAnecdotes, useActions } from "../anecdoteStore"
import { useNotificationActions } from "../notificationStore"

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { vote } = useActions()
  const { setNotification } = useNotificationActions()

  const handleVote = anecdote => event => {
    event.preventDefault()

    vote(anecdote.id)
    setNotification(`You voted for '${anecdote.content}'`)
  }

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
            <button onClick={handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList