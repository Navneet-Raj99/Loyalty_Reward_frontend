import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import { Badge } from 'antd';
import { firebase } from '../../pages/Auth/Firebase';
import { connectWallet } from '../../helper';

const Header = () => {
  const [auth, setAuth, account, setAccount] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  const navigate = useNavigate()
  const logout = async (value) => {

    window.location.reload("/");

  };


  const onLogout = () => {
    try {
      navigate("/")
      logout()

    } catch (error) {

    }
  }

  const onClick = async () => {
    try {
      await window.ethereum.request({ method: 'eth_accounts' });
      await window.ethereum.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] });
      await window.ethereum.request({ method: 'eth_accounts' });
      const response = await connectWallet();
      // console.log(response);
      if (response.accountFound === true) {
        console.log({"Wallet Connected":response?.account})
        setAccount(response.account);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleLogout = async () => {
    setAuth({
      ...auth,
      user: null,
      token: '',
    });
    await firebase.auth().signOut();
    localStorage.removeItem('auth');
    toast.success('Logout Successfully');
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              <img
                src="https://i.imgur.com/GMS8w8r.png"
                style={{ height: '50px', width: '100%' }}
                alt="Logo"
              />
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink to="/" className="nav-link ">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={'/categories'}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={'/categories'}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map(c => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* Add Wallet Icon Link Here */}
              {
                (auth?.user && account == "") ? (
                  <li className="nav-item nav-link ">

                    <i class="fa-solid fa-wallet fa-beat " onClick={onClick}></i>

                  </li>
                ) : (
                  <></>
                )
              }
              {account && (
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                  <div style={{ cursor: "pointer", backgroundColor: "#530ac4", marginRight: "10px" }} className="text-white my-auto p-2 rounded-2 connected_account">
                    Account : {account.substring(0, 4)}....{account.substring(account.length - 4, account.length)}
                  </div>
                  <CustomButton title="Logout" onClick={onLogout} />
                  {/* <BiLogOut/> */}

                </div>
              )}

              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/verifyemail" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: 'none' }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${auth?.user?.isSeller === 1 ? 'admin' : 'user'
                            }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                  <Badge count={cart?.length} showZero offset={[10, -5]}>
                    Cart
                  </Badge>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

const CustomButton = (props) => {
  const { title, onClick, disabled = false } = props;
  return (
    <div disabled={disabled} style={{ cursor: "pointer", backgroundColor: "#42145F", textAlign: "center" }} className="text-white my-auto p-2 rounded-2" onClick={onClick}>
      {title === "Logout" ? <>Logout</> : title}
    </div>
  );
};

export default Header;
