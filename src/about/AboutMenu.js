import React, { Component } from 'react';
import AboutMenuItem from './AboutMenuItem.js';
import AboutSubHeading from './AboutSubHeading.js';
import AboutSubHeadingsData from './AboutSubHeadingsData.js';
import personalIcon from '../assets/moebius-triangle.png';
import educationIcon from '../assets/upgrade.png';
import careerIcon from '../assets/triple-corn.png';

export default class AboutMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeMenuItem: 1,
      activeSubHeading: 1
    };
  }

  handleMenuItemClick = (menuItem) => {
    this.setState({
      activeMenuItem: menuItem,
      activeSubHeading: 1
    });
  };

  handleSubHeadingClick = (subHeading) => {
    this.setState({
      activeSubHeading: subHeading
    });
  };

  render() {
    const { activeMenuItem, activeSubHeading } = this.state;
    const menuItems = ["Personal", "Education", "Career"];
    const activeMenuTitle = menuItems[activeMenuItem - 1];
    const activeMenuIcon = activeMenuTitle === "Personal" ? personalIcon : activeMenuTitle === "Education" ? educationIcon : careerIcon;
    const subHeadings = AboutSubHeadingsData[activeMenuItem];

    return (
      <>
        <div className="menu">
          {menuItems.map((item, index) => (
            <AboutMenuItem
              key={index} // Unique key for each menu item
              title={item}
              active={activeMenuItem === index + 1}
              onClick={() => this.handleMenuItemClick(index + 1)}
            />
          ))}
        </div>
        
        <div className="sub-container">
          <div className="icon-title-container">
            <img src={activeMenuIcon} alt={activeMenuTitle} className="icon" />
            <h3>{activeMenuTitle}</h3>
          </div>
          {subHeadings.map((subheading, index) => (
            <AboutSubHeading
              key={subheading.id || index} // Use a unique ID from data or fallback to index
              title={subheading.title}
              content={subheading.content}
              active={activeSubHeading === index + 1}
              onClick={() => this.handleSubHeadingClick(index + 1)}
              menuItem={activeMenuItem}
            />
          ))}
        </div>
      </>
    );
  }
}