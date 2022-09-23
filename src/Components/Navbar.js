import React, { Component } from 'react';
import { faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Input,
  Navbar,
  Nav,
  NavItem,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap';
import { Link } from 'react-router-dom';

class CustomNavbar extends Component {

  state = {
    location: '/'
  }

  render() {
    let location = window.location.href;
    return (
      <div className='flex-row navbar-home'>
        <div className='navbar-items'>
          <Navbar expand="md" container="fluid">
            <UncontrolledDropdown className='dropdown-left' >
              <DropdownToggle className="nav-toggler">
                <FontAwesomeIcon className="icon" icon={faBars} />
              </DropdownToggle>
              <DropdownMenu className='dropdown-menu-left' >
                <DropdownItem className={`nav-align-items-center text-center`} >
                  <Link to="/" className="navbar-link" onClick={() => { this.setState({ location: '/home' }) }}>Home</Link>
                </DropdownItem>
                <DropdownItem className={`nav-align-items-center text-center`}>
                  <Link to="/movies" className="navbar-link" onClick={() => { this.setState({ location: '/movies' }) }}>Movies
                  </Link>
                </DropdownItem>
                <DropdownItem className={`nav-align-items-center text-center`}>
                  <Link to="/series" className="navbar-link" onClick={() => { this.setState({ location: '/series' }) }}>Series
                  </Link>
                </DropdownItem>
                <DropdownItem className={`nav-align-items-center text-center`}>
                  <Link to="/celebrities" className="navbar-link" onClick={() => { this.setState({ location: '/celebrities' }) }}>People
                  </Link>
                </DropdownItem>
                <DropdownItem className={`nav-align-items-center text-center`}>
                  <Link to="/mylist" className="navbar-link" onClick={() => { this.setState({ location: '/mylist' }) }}>My list
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <div className="navbar-logo pr-5 no-shrink relative">
              AIMDb
            </div>
            <Nav className='me-auto' navbar>
              <div className='d-flex flex-row'>
                <NavItem className={`nav-align-items-center pr-5 `} >
                  <Link to="/" className="navbar-link" onClick={() => { this.setState({ location: '/home' }) }}>Home
                    <div className={`${this.state.location.includes("home") ? "underlined" : ""}`}></div>
                  </Link>
                </NavItem>
                <NavItem className={`nav-align-items-center pr-5`}>
                  <Link to="/movies" className="navbar-link" onClick={() => { this.setState({ location: '/movies' }) }}>Movies
                    <div className={`${location.includes("movies") ? "underlined" : ""}`}></div>
                  </Link>
                </NavItem>
                <NavItem className={`nav-align-items-center pr-5 `}>
                  <Link to="/series" className="navbar-link" onClick={() => { this.setState({ location: '/series' }) }}>Series
                    <div className={`${location.includes("series") ? "underlined" : ""}`}></div>
                  </Link>
                </NavItem>
                <NavItem className={`nav-align-items-center pr-5`}>
                  <Link to="/celebrities" className="navbar-link" onClick={() => { this.setState({ location: '/celebrities' }) }}>People
                    <div className={`${location.includes("celebrities") ? "underlined" : ""}`}></div>
                  </Link>
                </NavItem>
                <NavItem className={`nav-align-items-center pr-2 `}>
                  <Link to="/mylist" className="navbar-link" onClick={() => { this.setState({ location: '/mylist' }) }}>My list
                    <div className={`${location.includes("mylist") ? "underlined" : ""}`}></div>
                  </Link>
                </NavItem>
              </div>
            </Nav>
          </Navbar>
        </div>
        <div className='navbar-right'>
          <div className='d-flex justify-content-center search'>
            <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass}></FontAwesomeIcon>
            <Input type={'search'} placeholder={'Search'} className="search-bar no-shrink">
            </Input>
          </div>
          <div className='d-flex align-items-center profile'>
            <div>
              <img src='http://argoxinterns:2003/default-avatar.jpg' className='profile-pic no-shrink' alt='avatar poster' />
            </div>
            <UncontrolledDropdown className='test profile-name'>
              <DropdownToggle caret nav className='test link'>Tester</DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>Profile</DropdownItem>
                <DropdownItem>Settings</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Log out</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </div>
    )
  }
}

export default CustomNavbar;