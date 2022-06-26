import React from 'react'
import { NextPage } from 'next'
import { LogoutIcon } from '@heroicons/react/solid'
import { supabase } from '../utils/supabase'
import { Layout } from '../components/Layout'

type Props = {}

const Dashboard: NextPage<Props> = ({}) => {
  const signOut = () => {
    supabase.auth.signOut()
  }
  return (
    <Layout title="dashBord">
      <LogoutIcon className="mb-6 h-6 w-6 cursor-pointer text-blue-500" onClick={signOut} />
    </Layout>
  )
}

export default Dashboard
