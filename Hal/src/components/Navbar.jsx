"use client";

import { Avatar, Dropdown, Navbar } from "flowbite-react";

import { useState } from "react";
import Logo from '../assets/react.svg';
import { Link } from "react-router-dom";

function Component() {

  const [isloggedin , setlogin] = useState(false);
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
          {/* <Dropdown.Header>
            <span className="block text-sm">Karan Rajput</span>
            <span className="block truncate text-sm font-medium">karan@gmail.com</span>
          </Dropdown.Header> */}
          {!isloggedin 
          ? <div>
          <Dropdown.Item>
            <Link to="/login">Login</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/register">Register</Link>
          </Dropdown.Item>
          </div>
            :
          <Dropdown.Item>Sign out</Dropdown.Item>
        }
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link to="/" className="nav-link px-4 py-2" active>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link to="/about" className="nav-link px-4 py-2">
          <Link to="/about">About Us</Link>
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
