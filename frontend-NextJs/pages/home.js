import Head from 'next/head';
import HomePageComponent from '../components/HomePage';

const HomePage = ({ user, messages, loginHistory }) => {
  return (
    <div>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Welcome to the home page" />
      </Head>
      <HomePageComponent user={user} messages={messages} loginHistory={loginHistory} />
    </div>
  );
};

export default HomePage;
