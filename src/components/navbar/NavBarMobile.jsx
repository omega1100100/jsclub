import React, { Component } from 'react';
import { Icon } from 'antd';
import { connect } from 'react-redux';
import { bake_cookie } from 'sfcookies';
import { Link } from 'react-router-dom';

import logo from '../../img/logo.png';
import { setEnglish, setVietnamese, setJapanese } from '../../actions';
import MenuButton from './MenuButton';

class NavBarMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openBar: false,
      openLanguageBar: false
    };
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleLanguageClick = this.handleLanguageClick.bind(this);
  }

  handleMenuClick() {
    const openBar = !this.state.openBar;
    if (openBar) this.setState({ openLanguageBar: false });
    this.setState({ openBar });
  }

  handleLanguageClick() {
    // spin icon
    document.getElementById('global-icon').classList.toggle('global-active');

    const openLanguageBar = !this.state.openLanguageBar;
    if (openLanguageBar) this.setState({ openBar: false });
    this.setState({ openLanguageBar });
  }

  chooseLanguageClick(language = 'en') {
    const openLanguageBar = !this.state.openLanguageBar;
    if (openLanguageBar) this.setState({ openBar: false });
    this.setState({ openLanguageBar });
    switch (language) {
      case 'en':
        this.props.setEnglish();
        bake_cookie('language_cookie', 'en');
        console.log('bake_cookie successful');
        break;
      case 'vn':
        this.props.setVietnamese();
        bake_cookie('language_cookie', 'vn');
        console.log('bake_cookie successful');
        break;
      case 'jp':
        this.props.setJapanese();
        bake_cookie('language_cookie', 'jp');
        console.log('bake_cookie successful');
        break;
      default:
        console.error('bug bug bug');
    }
  }

  render() {
    const { i18n } = this.props;
    document.title = i18n.webTitle;

    const bar = () =>
      this.state.openBar ? (
        <div>
          <ul className="navbar-ul">
            <li className="navbar-li">
              <Link to="/about">{i18n.aboutUs}</Link>
            </li>
            <li className="navbar-li">
              <Link to="/events">{i18n.events}</Link>
            </li>
            <li className="navbar-li">
              <Link to="/partners">{i18n.partners}</Link>
            </li>
            <li className="navbar-li navbar-li-last">
              <Link to="/news">{i18n.news}</Link>
            </li>
          </ul>
        </div>
      ) : (
        <div />
      );
    const languageBar = () =>
      this.state.openLanguageBar ? (
        <div>
          <ul className="navbar-ul">
            <li className="navbar-li">
              <div className="lang">
                <div onClick={() => this.chooseLanguageClick('vn')}>Tiếng Việt</div>
              </div>
            </li>
            <li className="navbar-li">
              <div className="lang">
                <div onClick={() => this.chooseLanguageClick('en')}>English</div>
              </div>
            </li>
            <li className="navbar-li navbar-li-last">
              <div className="lang">
                <div onClick={() => this.chooseLanguageClick('jp')}>日本語</div>
              </div>
            </li>
          </ul>
        </div>
      ) : (
        <div />
      );
    return (
      <div>
        <div style={{ height: '48px', background: '#000000' }} />
        <div className="navbar-wrap">
          <div className="navbar navbar-mb">
            <span className="navbar-e">
              <MenuButton handleMenuClick={this.handleMenuClick} />
            </span>
            <span className="navbar-e">
              <Link to="/">
                <img src={logo} alt="logo" style={{ height: '64px' }} />
              </Link>
            </span>
            <span className="navbar-e">
              <Icon id="global-icon" type="global" style={{ fontSize: '30px' }} onClick={this.handleLanguageClick} />
            </span>
          </div>
          {bar()}
          {languageBar()}
        </div>
      </div>
    );
  }
}

function mapStateToProp(state) {
  const { scroll, i18n } = state;
  return {
    isScroll: scroll,
    i18n
  };
}

export default connect(
  mapStateToProp,
  { setEnglish, setVietnamese, setJapanese }
)(NavBarMobile);
