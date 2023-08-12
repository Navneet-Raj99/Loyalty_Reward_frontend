import React from 'react';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth';

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={'Dashboard - Ecommerce App'}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-9"></div> {/* Left empty space */}
          <div className="col-md-3" style={{ marginLeft: '30px' }}>
            {' '}
            {/* Added margin-right */}
            <div className="row">
              <div className="col-md-10 card w-80 p-3">
                <h3>Details:</h3>
                <p>Name: {auth?.user?.name}</p>
                <p>Email: {auth?.user?.email}</p>
                <p>Address: {auth?.user?.address}</p>
              </div>
              <div
                className="col-md-10 card w-80 p-3"
                style={{ marginTop: '50px' }}
              >
                {' '}
                {/* Added margin-top */}
                <h3>Loyalty Points</h3>
                {/* <p>Tokens: {auth?.user?.tokens}</p>  */}
                <p>Tokens: </p>
                <span
                  role="img"
                  aria-label="token"
                  style={{ fontSize: '30px' }}
                >
                  💰💰💰
                </span>{' '}
                {/* Dummy token icons */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
