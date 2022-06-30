import { useQueryClient, useMutation } from 'react-query'
import useStore from '../store'
import { supabase } from '../utils/supabase'
import { Task } from '../types/types'

export const useMutateTask = () => {
  const queryClient = useQueryClient()
  const reset = useStore((state) => state.resetEditedTask)

  const createTaskMutation = useMutation(async (task: Omit<Task, 'id' | 'created_at'>) => {
    const { data, error } = await supabase.from('todos').insert(task)
    if (error) throw new Error(error.message)
    return data
  })
}
{}, {}