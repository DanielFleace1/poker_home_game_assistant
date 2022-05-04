import React from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import '../App.css'

function Game() {
    // State
    const [buyInCost, , chipsPerBuyIn] = useOutletContext()
    const navigate = useNavigate()
    // Handlers
    const handleExit = () => {
        navigate('/')
    }

    return (
        <div id="appWrapper">
            <h1> Poker Assistant Home Page</h1>
            <div> Buy in Cost: {buyInCost || '0'}</div>
            <div> Chips per Buy In: {chipsPerBuyIn || '0'}</div>
            <div> $/Chip {buyInCost / chipsPerBuyIn || '0'}</div>
            <button type="button" onClick={handleExit}>
                Exit Game - Home
            </button>
        </div>
    )
}

export default Game
