import React, { useState } from 'react'
import { Outlet } from 'react-router'
import '../App.css'

function App() {
    const [buyInCost, setBuyInCost] = useState(Number)
    const [chipsPerBuyIn, setChipsPerBuyIn] = useState(Number)
    const [playersArray, setPlayersArray] = useState([])

    const buyInCostStorage = window.sessionStorage.getItem('buyInCost')
    const chipsPerBuyInStorage = window.sessionStorage.getItem('chipsPerBuyIn')
    if (!buyInCost || !chipsPerBuyIn) {
        if (buyInCostStorage && chipsPerBuyInStorage) {
            setBuyInCost(buyInCostStorage)
            setChipsPerBuyIn(chipsPerBuyInStorage)
        }
    }

    if (playersArray.length === 0) {
        const playersArrayStorage = JSON.parse(sessionStorage.getItem('playersArrayStorage'))
        if (playersArrayStorage && playersArrayStorage.length !== 0)
            setPlayersArray(playersArrayStorage)
    }

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
