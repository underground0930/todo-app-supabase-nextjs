import create from 'zustand'
import { EditedTask, EditedNotice } from './types/types'

type State = {
  editedTask: EditedTask
  editedNotice: EditedNotice
  updateEditedTask: (payload: EditedTask) => void
  updateEditedNotice: (payload: EditedNotice) => void
  resetEditedTask: () => void
  resetEditedNotice: () => void
}
const useStore = create<State>((set) => ({
  editedTask: { id: '', title: '' },
  editedNotice: { id: '', content: '' },
  updateEditedTask: (payload) => {
    return set({
      editedTask: {
        id: payload.id,
        title: payload.title,
      },
    })
  },
  resetEditedTask: () => {
    return set({
      editedTask: {
        id: '',
        title: '',
      },
    })
  },
  updateEditedNotice: (payload) => {
    return set({
      editedNotice: {
        id: payload.id,
        content: payload.content,
      },
    })
  },
  resetEditedNotice: () => {
    return set({
      editedTask: {
        id: '',
        title: '',
      },
    })
  },
}))

export default useStore
