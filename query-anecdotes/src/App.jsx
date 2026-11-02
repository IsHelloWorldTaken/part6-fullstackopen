import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'

const App = () => {

  const getAnecdotes = async () => {
    const response = await fetch('http://localhost:3001/anecdotes')

    console.log(JSON.parse(JSON.stringify(result)))

    if (!response.ok) {
      throw new Error('Failed to fetch anecdotes')
    }

    return await response.json()
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1
  })

  const anecdotes = result.data


  const handleVote = (anecdote) => {
    console.log('vote')
  }

  if (result.isPending) {
    return <div>loading data...</div>
  } else if (result.isError) {
    return <div>anecdote service is not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App