import { useAnecdotes } from "../anecdoteStore"
import Anecdote from "./Anecdote"

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()

  const anecdotesSorted = anecdotes => {
    return anecdotes.toSorted((anecdoteA, anecdoteB) => (
      anecdoteB.votes - anecdoteA.votes
    ))
  }

  return (
    <div>
      {anecdotesSorted(anecdotes).map(anecdote => (
        <Anecdote anecdoteObject={anecdote} key={anecdote.id}/>
      ))}
    </div>
  )
}

export default AnecdoteList