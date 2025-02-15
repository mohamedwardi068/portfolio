import React from 'react'
import PropTypes from "prop-types";
import avtarImage from "../assets/avatar-image.png"

import "../styles/avatar.css"

const Avatar = ({ page }) => {
    const avtarClass = `avatar ${page}`;
    const spanclass = `shadow-overlay-${page}`


    return (
        <>
            <span className={spanclass}></span>
            <img src={avtarImage} className={avtarClass} alt='avatar' />
        </>
    )

}
Avatar.propTypes = {
    page: PropTypes.string.isRequired,
}
export default Avatar;
