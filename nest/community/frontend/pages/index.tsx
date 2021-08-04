import React from 'react';
import AppLayout from '../components/AppLayout'
import SWRDevtools from '@jjordy/swr-devtools'
import { cache, mutate } from 'swr'

export default function Home() {
  return (
    <>
      <SWRDevtools cache={cache} mutate={mutate} />
      <AppLayout />
    </>
  )
}