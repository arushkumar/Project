import React from 'react';
import PropTypes from 'prop-types'
import { Button } from "@progress/kendo-react-buttons";

const MyButton = ({ color, variant, text, onClick}) => {
    return (
        <Button   variant = {variant} color={color} onClick={onClick}> {text}</Button>
     )}

    MyButton.defaultProps = {
    color: "inherit",
    text: 'Hello',
    variant: "text",
}

MyButton.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default MyButton
