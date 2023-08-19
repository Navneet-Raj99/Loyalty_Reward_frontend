import React, { useState, useEffect } from 'react';
import Layout from './../components/Layout/Layout';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';
import { AiFillWarning } from 'react-icons/ai';
import axios from 'axios';
import toast from 'react-hot-toast';
import '../styles/CartStyles.css';

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState('');
  const [instance, setInstance] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const toggleDescription = id => {
    setExpandedDescriptions({
      ...expandedDescriptions,
      [id]: !expandedDescriptions[id],
    });
  };
  //total price
  const checkoutHandler = async amount => {
    try {
      const {
        data: { key },
      } = await axios.get('/api/getkey');
      console.log('====================================');
      console.log(key);
      console.log('====================================');
      const {
        data: { order },
      } = await axios.post('/api/v1/payment/checkout', {
        amount,
      });

      const options = {
        key,
        amount: order.amount,
        currency: 'INR',
        name: 'BIKE RENTAL',
        description: 'BIKEEE',
        image: 'https://avatars.githubusercontent.com/u/25058652?v=4',
        order_id: order.id,
        callback_url:
          'http://localhost:8080/api/v1/payment/paymentverification',
        prefill: {
          name: 'Gaurav Kumar',
          email: 'gaurav.kumar@example.com',
          contact: '9999999999',
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#121212',
        },
        handler: async response => {
          // The response contains the razorpay_order_id, razorpay_payment_id, and razorpay_signature
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;

          // Now you need to send these details back to your server for verification
          // using another API endpoint on your server

          try {
            const response = await axios.post(
              '/api/v1/payment/paymentverification',
              {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
                cart,
              },
            );

            if (response.data.success) {
              // Payment successful, handle success case here
              // For example, navigate to a success page or show a success message
              console.log('Payment successful');
              navigate(`/paymentsuccess?reference=${razorpay_payment_id}`); // Redirect to a success page
            } else {
              // Payment failed, handle failure case here
              // For example, show an error message to the user
              console.log('Payment failed');
            }
          } catch (error) {
            // Handle error from the server, if any
            console.log('Error during payment verification:', error);
          }
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.log('Error during checkout:', error);
    }
  };

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map(item => {
        total = total + item.price;
      });
      return total.toLocaleString('en-US', {
        style: 'currency',
        currency: 'INR',
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = pid => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex(item => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem('cart', JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  // const getToken = async () => {
  //   try {
  //     const { data } = await axios.get("/api/v1/product/braintree/token");
  //     setClientToken(data?.clientToken);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getToken();
  // }, [auth?.token]);

  //handle payments
  // const handlePayment = async () => {
  //   try {
  //     setLoading(true);
  //     const { nonce } = await instance.requestPaymentMethod();
  //     const { data } = await axios.post("/api/v1/product/braintree/payment", {
  //       nonce,
  //       cart,
  //     });
  //     setLoading(false);
  //     localStorage.removeItem("cart");
  //     setCart([]);
  //     navigate("/dashboard/user/orders");
  //     toast.success("Payment Completed Successfully ");
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };
  return (
    <Layout>
      <div className="cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? 'Hello Guest'
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? '' : 'please login to checkout !'
                    }`
                  : ' Your Cart Is Empty'}
              </p>
            </h1>
          </div>
        </div>
        <div className="container ">
          <div className="row ">
            <div className="col-md-7  p-0 m-0">
              {cart?.map(p => (
                <div className="row card flex-row" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={p.imgUrl}
                      className="card-img-top"
                      alt={p.name}
                      width="100%"
                      height={'130px'}
                    />
                  </div>
                  <div className="col-md-6">
                    <p>{p.name}</p>
                    <div style={{ display: 'flex', alignItems: 'baseline' }}>
                      <span>
                        {expandedDescriptions[p._id]
                          ? p.description
                          : p.description.substring(0, 30) + '...'}
                        <button
                          style={{
                            padding: 0,
                            margin: 0,
                            fontSize: 'inherit',
                            textAlign: 'left',
                            border: 'none',
                            background: 'none',
                            outline: 'none',
                            cursor: 'pointer',
                            color: 'blue',
                          }}
                          onClick={() => toggleDescription(p._id)}
                        >
                          {expandedDescriptions[p._id]
                            ? 'Show Less'
                            : 'Show More'}
                        </button>
                      </span>
                    </div>

                    <p>Price : {p.price}</p>
                  </div>
                  <div className="col-md-4 cart-remove-btn">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {cart?.length > 0 ? (
              <div className="col-md-5 cart-summary ">
                <h2>Cart Summary</h2>
                <p>Total | Checkout | Payment</p>
                <hr />
                <h4>Total : {totalPrice()} </h4>
                {auth?.user?.address ? (
                  <>
                    <div className="mb-3">
                      <h4>Current Address</h4>
                      <h5>{auth?.user?.address}</h5>
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => navigate('/dashboard/user/profile')}
                      >
                        Update Address
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="mb-3">
                    {auth?.token ? (
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => navigate('/dashboard/user/profile')}
                      >
                        Update Address
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-warning"
                        onClick={() =>
                          navigate('/login', {
                            state: '/cart',
                          })
                        }
                      >
                        Plase Login to checkout
                      </button>
                    )}
                  </div>
                )}
                <div className="mt-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => checkoutHandler(cart[0].price)}
                  >
                    Make Payment
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
