import React, { useState } from 'react'
import { Outlet } from 'react-router'
import '../App.css'

function App() {
    const [buyInCost, setBuyInCost] = useState(Number)
    const [chipsPerBuyIn, setChipsPerBuyIn] = useState(Number)
    return (
        <div>
            <Outlet context={[buyInCost, setBuyInCost, chipsPerBuyIn, setChipsPerBuyIn]} />
        </div>
    )
}

export default App
