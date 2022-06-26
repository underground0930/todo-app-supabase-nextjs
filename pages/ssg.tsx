import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextPage, type GetStaticProps } from 'next'
import { Layout } from '../components/Layout'
import { supabase } from '../utils/supabase'
import { Task, Notice } from '../types/types'

type Props = {
  tasks: Task[]
  notices: Notice[]
}

const Ssg: NextPage<Props> = ({ tasks, notices }) => {
  const router = useRouter()

  return (
    <Layout title="SSG">
      <h1 className="text-center text-5xl m-3 font-bold text-blue-500">SSG</h1>
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
      <Link href="/ssr" prefetch={false}>
        <a className="my-3 text-xs">Link to ssr</a>
      </Link>
      <Link href="/isr" prefetch={false}>
        <a className="my-3 text-xs">Link to isr</a>
      </Link>
      <button
        className="mb-3 text-xs"
        onClick={() => {
          router.push('/ssr')
        }}
      >
        Route to ssr
      </button>
      <button
        className="mb-3 text-xs"
        onClick={() => {
          router.push('/isr')
        }}
      >
        Route to isr
      </button>
    </Layout>
  )
}
export default Ssg

export const getStaticProps: GetStaticProps = async () => {
  console.log('getStaticProps/ssg invoked')
  const { data: tasks } = await supabase
    .from<Task>('todos')
    .select('*')
    .order('created_at', { ascending: true })

  const { data: notices } = await supabase
    .from<Notice>('notices')
    .select('*')
    .order('created_at', { ascending: true })

  return {
    props: {
      tasks,
      notices,
    },
  }
}
