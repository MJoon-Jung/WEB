import React, { useEffect, useState, useCallback } from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { END } from 'redux-saga';
import axios from 'axios';
import useSWR from 'swr';
import NicknameEditForm from '../components/NicknameEditForm';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import wrapper from '../store/configureStore';

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result) => result.data);

  // const [followersOffset, setFollowersOffset] = useState(0);
  // const [followingsOffset, setFollowingsOffset] = useState(0);
  const [followersLimit, setFollowersLimit] = useState(3);
  const [followingsLimit, setFollowingsLimit] = useState(3);
  // const [followersDatas, setFollowersDatas] = useState([]);
  // const [followingsDatas, setFollowingsDatas] = useState([]);

  const { data: followersData, error: followerError } = useSWR(`http://localhost:3065/user/followers?limit=${followersLimit}`, fetcher);
  const { data: followingsData, error: followingError } = useSWR(`http://localhost:3065/user/followings?limit=${followingsLimit}`, fetcher);
  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);

  // useEffect(() => {
  //   if (followersData) {
  //     setFollowersDatas(followersData.concat(followersDatas));
  //   }
  // }, [followersData]);

  // useEffect(() => {
  //   if (followingsData) {
  //     setFollowingsDatas(followingsData.concat(followingsDatas));
  //   }
  // }, [followingsData]);

  const loadingMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3);
  });

  const loadingMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3);
  });

  if (!me) {
    return '내 정보 로딩중...';
  }

  if (followerError || followingError) {
    console.error(followerError || followingError);
    return <div>팔로잉/팔로워 로딩 중 에러가 발생합니다.</div>;
  }

  return (
    <AppLayout>
      <Head>
        <title>내 프로필 </title>
      </Head>
      <NicknameEditForm />
      <FollowList
        header="팔로잉"
        data={followingsData}
        onClickMore={loadingMoreFollowings}
        loading={!followingsData && !followingError}
      />
      <FollowList
        header="팔로워"
        data={followersData}
        onClickMore={loadingMoreFollowers}
        loading={!followersData && !followerError}
      />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Profile;
