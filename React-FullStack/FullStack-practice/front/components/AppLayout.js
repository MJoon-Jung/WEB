import React, { useState } from 'react';
import PropTypes from "prop-types";
import Link from "next/link";
import { Menu, Input, Row, Col } from 'antd';
import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;
const AppLayout = ({ children }) => {

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <div>
     <Menu mode="horizontal">
      <Menu.Item>
        <Link href="/">    
          <a>홈</a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link href="/profile">    
          <a>프로필 창입니다.</a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link href="/signup">    
          <a>회원가입 창입니다</a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <SearchInput placeholder="input search text" />
      </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={8}>
          {isLoggedIn ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={8}>
        {children}
        </Col>
        <Col xs={24} md={8}>
          <a href="https://github.com/MJoon-Jung" target="_blank" rel="noreffer noopener">my gitgub</a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
