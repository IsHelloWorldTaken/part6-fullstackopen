import { createContext, useState } from 'react'

const NotificationContext = createContext()

export default NotificationContext

export const NotificationContextProvider = props => {
  const [notification, setNotification] = useState(null)

  const displayNotification = message => {
    setNotification(message)
    setTimeout(() => setNotification(null), 5000)
  }

  return (
    <NotificationContext.Provider value={{ notification, displayNotification }}>
      {props.children}
    </NotificationContext.Provider>
  )
}



// #1 Create - const SomethingContext = createContext()
// #2 Provide - <SomethingContext.Provider value={{ fn1, fn2 }}>...</SomethingContext.Provider>
// #3 Use - cosnt { fn1, fn2 } = useContext(SomethingContext)