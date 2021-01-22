import React from 'react'
import styled from 'styled-components'

const Menu = styled.div.attrs(props => ({
    className: "bg-dark"
}))`
width: 100vw;
display: flex;
justify-content: flex-end;
align-items: center;
`

const MenuItem = styled.a.attrs(props => ({
    className: "text-light mx-3"
}))`
display: block;
transition: all 0.4s ease;
&:hover {
    background-image: linear-gradient(to bottom right, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.3) 100%);
    box-shadow: 0 2px 0 rgb(0, 72, 255);
}
`


export default function Topbar() {
    return (
        <Menu>
            <MenuItem href="/" alt="home">Home</MenuItem>
        </Menu>
    )
}
