import { create } from 'zustand'

const useNotificationStore = create(set => ({
  message: null,
  actions: {
    setNotification: newMessage => {
      set(({ message: newMessage }))
      setTimeout(() => set(({ message: null })), 5000)
    }
  }
}))

export const useNotificationMessage = () => useNotificationStore(state => state.message)
export const useNotificationActions = () => useNotificationStore(state => state.actions)