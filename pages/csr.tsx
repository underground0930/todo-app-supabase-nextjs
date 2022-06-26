import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { supabase } from '../utils/supabase'
import { Task, Notice } from '../types/types'
import { Layout } from '../components/Layout'

const Csr: NextPage = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [notices, setNotices] = useState<Notice[]>([])

  useEffect(() => {
    const getTasks = async () => {
      const { data: tasks } = await supabase
        .from<Task>('todos')
        .select('*')
        .order('created_at', { ascending: true })
      if (!tasks) return
      setTasks(tasks)
    }
    const getNotices = async () => {
      const { data: notices } = await supabase
        .from<Notice>('notices')
        .select('*')
        .order('created_at', { ascending: true })

      if (!notices) return
      setNotices(notices)
    }
    getTasks()
    getNotices()
  }, [])

  return (
    <Layout title={'csr'}>
      <h1 className="text-center text-5xl m-3 font-bold text-green-500">SSG + CSF</h1>
      <ul className="mb-3">
        {tasks.map((task) => (
          <li key={task.id}>
            <a>{task.title}</a>
          </li>
        ))}
      </ul>
      <ul className="mb-3">
        {notices.map((notice) => (
          <li key={notice.id}>
            <a>{notice.content}</a>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default Csr
