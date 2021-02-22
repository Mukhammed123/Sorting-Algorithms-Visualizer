import React from 'react'
import './algo.css'

function AlgoBars(props){
    return(
        <li 
        id={`${props.number}`} 
        style={{height: `${(props.number/props.maxValue)*45}%`}}>
        <span>{props.number}</span>
        </li>
    )
}

export default AlgoBars;