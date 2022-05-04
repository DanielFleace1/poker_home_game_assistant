import React, { useState } from 'react'
import { Outlet } from 'react-router'
import '../App.css'

function App() {
    const [buyInCost, setBuyInCost] = useState(Number)
    const [chipsPerBuyIn, setChipsPerBuyIn] = useState(Number)
    const [playersArray, setPlayersArray] = useState([])
    return (
        <div>
            <Outlet
                context={[
                    buyInCost,
                    setBuyInCost,
                    chipsPerBuyIn,
                    setChipsPerBuyIn,
                    playersArray,
                    setPlayersArray,
                ]}
            />
        </div>
    )
}

export default App
