import React, { Component } from 'react';
import { connect } from 'react-redux';
import { read_cookie } from 'sfcookies';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import { setMobile, setScroll, setJapanese, setVietnamese, setEnglish, setScrollFlexible } from '../actions';
import HomePage from './homepage/HomePage';
import AboutPage from './about-page/About';
import MembersPage from './members-page/Members';
import PartnersPage from './partners-page/Partners';
// import NewsPage from './news-page/News';
import ScrollTop from './ScrollTop';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.setLanguage = this.setLanguage.bind(this);
  }

  setLanguage() {
    const language = read_cookie('language_cookie');
    switch (language) {
      case 'vi':
        this.props.setVietnamese();
        console.log('read cookie: language vi successful');
        break;
      case 'en':
        this.props.setEnglish();
        console.log('read cookie: language en successful');
        break;
      case 'jp':
        this.props.setJapanese();
        console.log('read cookie: language jp successful');
        break;
      default:
        this.props.setJapanese();
        console.log('do not regconize cookie: set default language = jp');
    }
  }

  componentDidMount() {
    this.setLanguage();
    // REDUX : set width of device every 50ms
    this.interval = setInterval(() => this.props.setMobile(Math.max(document.documentElement.clientWidth, window.innerWidth || 0)), 50);
    window.addEventListener('scroll', this.handleScroll);
  }

  // lifecycle
  componentWillUnmount() {
    clearInterval(this.interval);
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (window.scrollY === 0) {
      if (this.props.isScrollFlexible) this.props.setScrollFlexible(false);
    } else if (window.scrollY > 0) {
      if (!this.props.isScrollFlexible) this.props.setScrollFlexible(true);
      if (!this.props.isScroll) this.props.setScroll(true);
    }
  }

  render() {
    return (
      <div>
        {/* handy */}
        {this.props.isScrollFlexible && <ScrollTop />}
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/members" component={MembersPage} />
            <Route path="/partners" component={PartnersPage} />
            {/* <Route path="/news" component={NewsPage} /> */}
          </Switch>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { scroll, scrollFlexible } = state;
  return {
    isScroll: scroll,
    isScrollFlexible: scrollFlexible
  };
}

export default connect(
  mapStateToProps,
  { setMobile, setScroll, setJapanese, setVietnamese, setEnglish, setScrollFlexible }
)(App);
