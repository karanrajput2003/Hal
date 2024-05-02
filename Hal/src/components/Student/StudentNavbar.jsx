"use client";

import { Avatar, Dropdown, Navbar } from "flowbite-react";

import Logo from '../../assets/react.svg';


import React from "react";
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';

import axios from 'axios';
import { authActions } from "../../store";
axios.defaults.withCredentials = true;

function Component() {
    const isLoggedIn = useSelector(state => state.isLoggedIn)
    const username = useSelector(state => state.username)
    const email = useSelector(state => state.email)

    const  dispatch = useDispatch();
  
    const [user, setUser] = useState();
    const history = useNavigate();
  
    const sendlogout = async () => {
      console.log("ll")
      const res = await axios.post('http://localhost:8080/api/auth/logout',{
        // userId: user.id
      },{
        withCredentials: true
      });
      if(res.status == 200){
        return res;
      }
      return new Error("Unable to logout")
    }
  
    const handlelogout = () => {
      // console.log("ll");
      sendlogout().then(() => {
        dispatch(authActions.logout())
        history("/")

      })
    }
  
    const sendRequest = async () => {
      const res = await axios.get('http://localhost:8080/api/test/user', {
        withCredentials: true
      }).catch(err => {
        alert("Login to your account");
        history("/login")
      });
      const data = await res.data;
      return data;
    }
  
    useEffect(() => {
      // if(!isLoggedIn){
      //   history("/login")
      // }
      sendRequest().then((data) => setUser(data.user))
    }, [isLoggedIn])
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{username }</span>
            <span className="block truncate text-sm font-medium">{email}</span>
          </Dropdown.Header>
          <Dropdown.Item> 
            <button onClick={handlelogout}>Logout</button>
            </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link to="/" className="nav-link px-4 py-2" active>
          <Link to="/user">Home</Link>
        </Navbar.Link>
        <Navbar.Link to="/about" className="nav-link px-4 py-2">
          <Link to="/user/about">About Us</Link>
        </Navbar.Link>
        <Navbar.Link href="#feedback" className="nav-link px-4 py-2">
          Feedback
        </Navbar.Link>
        <Navbar.Link href="#contact" className="nav-link px-4 py-2">
         Contact Us
        </Navbar.Link>
        <Navbar.Link to="/user/activity" className="nav-link px-4 py-2">
          <Link to="/user/activity">Activity</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Component;
