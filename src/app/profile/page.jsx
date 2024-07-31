"use client";
import React, { useState, useEffect } from 'react';
import { FaUser, FaList, FaAddressBook, FaShoppingBag, FaImage } from "react-icons/fa";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState({});
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState({});
  const router = useRouter();

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:6000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Error fetching user data');
      }
    };

    fetchUserData();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:6000/api/user', user, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile');
    }
  };

  const handleAddressSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:6000/api/address', address, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Address saved successfully');
    } catch (error) {
      console.error('Error saving address:', error);
      toast.error('Error saving address');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://localhost:6000/api/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      toast.success('Account deleted successfully');
      router.push('/login');
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error('Error deleting account');
    }
  };

  return (
    <section id='profile'>
      <ToastContainer />
      <div className='container mx-auto mt-4'>
        <div className='max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <FaUser className='text-4xl' />
              <div className='ml-4'>
                <h2 className='text-2xl font-bold'>{user.firstName} {user.lastName}</h2>
                <p>{user.email}</p>
              </div>
            </div>
            <div className='flex items-center'>
              <label htmlFor='image-upload' className='cursor-pointer'>
                <FaImage className='text-2xl' />
              </label>
              <input
                type='file'
                id='image-upload'
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              {image && <img src={image} alt='Profile' className='h-12 w-12 rounded-full ml-4' />}
            </div>
          </div>
          <div className='flex justify-around mt-6'>
            <button onClick={() => handleTabClick('profile')} className='flex items-center'>
              <FaUser className='mr-2' /> Profile
            </button>
            <button onClick={() => handleTabClick('orders')} className='flex items-center'>
              <FaShoppingBag className='mr-2' /> Orders
            </button>
            <button onClick={() => handleTabClick('wishlist')} className='flex items-center'>
              <FaList className='mr-2' /> Wishlist
            </button>
            <button onClick={() => handleTabClick('address')} className='flex items-center'>
              <FaAddressBook className='mr-2' /> Address Book
            </button>
          </div>
          {activeTab === 'profile' && (
            <div className='mt-6'>
              <h3 className='text-xl font-bold'>Edit Profile</h3>
              <form onSubmit={handleProfileUpdate} className='mt-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label>First Name</label>
                    <input
                      type='text'
                      value={user.firstName}
                      onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                      className='w-full border border-gray-300 rounded-md p-2'
                      required
                    />
                  </div>
                  <div>
                    <label>Last Name</label>
                    <input
                      type='text'
                      value={user.lastName}
                      onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                      className='w-full border border-gray-300 rounded-md p-2'
                      required
                    />
                  </div>
                  <div>
                    <label>Email</label>
                    <input
                      type='email'
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                      className='w-full border border-gray-300 rounded-md p-2'
                      required
                    />
                  </div>
                  <div>
                    <label>Mobile</label>
                    <input
                      type='text'
                      value={user.mobile}
                      onChange={(e) => setUser({ ...user, mobile: e.target.value })}
                      className='w-full border border-gray-300 rounded-md p-2'
                      required
                    />
                  </div>
                  <div>
                    <label>Password</label>
                    <input
                      type='password'
                      value={user.password}
                      onChange={(e) => setUser({ ...user, password: e.target.value })}
                      className='w-full border border-gray-300 rounded-md p-2'
                    />
                  </div>
                </div>
                <div className='flex justify-between items-center mt-4'>
                  <button
                    type='submit'
                    className='bg-blue-500 text-white px-4 py-2 rounded-md'
                  >
                    Save Changes
                  </button>
                  <button
                    type='button'
                    onClick={handleDeleteAccount}
                    className='bg-red-500 text-white px-4 py-2 rounded-md'
                  >
                    Delete Account
                  </button>
                </div>
              </form>
            </div>
          )}
          {activeTab === 'orders' && (
            <div className='mt-6'>
              <h3 className='text-xl font-bold'>My Orders</h3>
              {/* Display user orders */}
            </div>
          )}
          {activeTab === 'wishlist' && (
            <div className='mt-6'>
              <h3 className='text-xl font-bold'>My Wishlist</h3>
              {/* Display user wishlist */}
            </div>
          )}
          {activeTab === 'address' && (
            <div className='mt-6'>
              <h3 className='text-xl font-bold'>Address Book</h3>
              <form onSubmit={handleAddressSave} className='mt-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label>Country</label>
                    <input
                      type='text'
                      value={address.country}
                      onChange={(e) => setAddress({ ...address, country: e.target.value })}
                      className='w-full border border-gray-300 rounded-md p-2'
                      required
                    />
                  </div>
                  <div>
                    <label>County</label>
                    <input
                      type='text'
                      value={address.county}
                      onChange={(e) => setAddress({ ...address, county: e.target.value })}
                      className='w-full border border-gray-300 rounded-md p-2'
                      required
                    />
                  </div>
                  <div>
                    <label>Town</label>
                    <input
                      type='text'
                      value={address.town}
                      onChange={(e) => setAddress({ ...address, town: e.target.value })}
                      className='w-full border border-gray-300 rounded-md p-2'
                      required
                    />
                  </div>
                  <div>
                    <label>Postal Code</label>
                    <input
                      type='text'
                      value={address.postalCode}
                      onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                      className='w-full border border-gray-300 rounded-md p-2'
                      required
                    />
                  </div>
                </div>
                <button
                  type='submit'
                  className='bg-blue-500 text-white px-4 py-2 rounded-md mt-4'
                >
                  Save Address
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default profile;
