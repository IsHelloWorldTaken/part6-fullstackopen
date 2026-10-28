import { useAnecdotes } from "../anecdoteStore"
import Anecdote from "./Anecdote"

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()

  return (
    <div>
      {anecdotes.map(anecdote => (
        <Anecdote anecdoteObject={anecdote} key={anecdote.id}/>
      ))}
    </div>
  )
}

export default AnecdoteList