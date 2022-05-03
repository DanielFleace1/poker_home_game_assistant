import React, { useState } from 'react'

import './App.css'

function App() {
    // State
    const [buyInCost, setBuyInCost] = useState(Number)
    const [chipsPerBuyIn, setChipsPerBuyIn] = useState(Number)

    // Handler Functions
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const handleInputChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        if (name === 'buyInCost') {
            setBuyInCost(value)
        }
        if (name === 'chipsPerBuyIn') {
            setChipsPerBuyIn(value)
        }
    }
    const handleShowInfo = () => {
        // console.log('Show Info')
    }

    return (
        <div id="appWrapper">
            <h1> Poker Assistant Home Page</h1>
            <div>buy in cost:{buyInCost || '0'} </div>{' '}
            <div>Chips per buy in: {chipsPerBuyIn || '0'}</div>
            <br />
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    value={buyInCost || ''}
                    name="buyInCost"
                    onChange={handleInputChange}
                />
                : Buy in Cost <br />
                <input
                    type="number"
                    value={chipsPerBuyIn || ''}
                    name="chipsPerBuyIn"
                    onChange={handleInputChange}
                />
                : Chips per buyIn
                <br />
                <button type="submit">Start Game</button>
            </form>
            <br />
            <button type="button" onClick={handleShowInfo}>
                Info
            </button>
        </div>
    )
}

export default App
