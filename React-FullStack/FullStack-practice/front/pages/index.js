import AppLayout from "../components/AppLayout";
import Head from 'next/head';
import React from 'react';
const Home = () => {
  return (
    <>
      <Head>
        <title>홈</title>
      </Head>
      <AppLayout>Hello Next</AppLayout>
    </>
  );
};

export default Home;