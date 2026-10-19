import { useAnecdotes, useVote } from "./store"


// 1 Implement first the ability to vote for anecdotes. The number of votes must be stored in the Zustand store.
// 2 Add the ability to add new anecdotes to the application. (You can keep the addition form uncontrolled as in the earlier example.)
// 3 Separate the creation of a new anecdote into its own component called AnecdoteForm and separate the display of the anecdote list into its own component called AnecdoteList.
// 4 Ensure that the anecdotes are kept in descending order by number of votes. (Array.toSorted())

const App = () => {
  const anecdotes = useAnecdotes()

  const vote = useVote()

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form>
        <div>
          <input data-testid="new" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App
