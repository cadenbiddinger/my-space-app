import React from 'react';
import { Header, } from 'semantic-ui-react';
import AllPosts from './components/AllPosts'

const Home = () => (
  <Header as="h3" textAlign="center">Welcome to Myspace.</Header>
  <AllPosts />
)

export default Home;