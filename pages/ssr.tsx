import React from 'react'
import Link from 'next/link'
import { Router, useRouter } from 'next/router'
import { NextPage, type GetServerSideProps } from 'next'
import { Layout } from '../components/Layout'
import { supabase } from '../utils/supabase'
import { Task, Notice } from '../types/types'

type Props = {
  tasks: Task[]
  notices: Notice[]
}

const Ssr: NextPage<Props> = ({ tasks, notices }) => {
  const router = useRouter()
  return (
    <Layout title="SSR">
      <h1 className="text-center text-5xl m-3 font-bold text-pink-500">SSR</h1>
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
      <Link href="/ssg" prefetch={false}>
        <a className="my-10 text-xs">Link to ssg</a>
      </Link>
      <Link href="/isr" prefetch={false}>
        <a className="my-10 text-xs">Link to isr</a>
      </Link>
      <button
        className="mb-10 text-xs"
        onClick={() => {
          router.push('/ssg')
        }}
      >
        Route to ssg
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

export default Ssr

export const getServerSideProps: GetServerSideProps = async () => {
  console.log('getServerSideProps/ssg invoked')
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
