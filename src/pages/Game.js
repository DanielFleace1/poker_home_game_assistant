import React, { useEffect, useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import '../App.css'

function Game() {
    // State
    const [buyInCost, , chipsPerBuyIn] = useOutletContext()
    const [alertMsg, setAlertMsg] = useState(null)
    const [alertSeverity, setAlertSeverity] = useState(null)

    const navigate = useNavigate()
    // Handlers
    const handleExit = () => {
        navigate('/')
    }

    useEffect(() => {
        if (Number(buyInCost) === 0 || Number(chipsPerBuyIn) === 0) {
            setAlertMsg(
                'Please enter amounts > 0 for: "Buy in Cost" & "Chips per Buy in": You will be directed to the home screen where you can do so!'
            )
            setAlertSeverity('error')

            setTimeout(() => {
                navigate('/')
                setAlertMsg('')
                setAlertSeverity('')
            }, 5000)
        }
    }, [buyInCost, chipsPerBuyIn, navigate])

    return (
        <div id="appWrapper">
            <h1> Poker Assistant Home Page</h1>
            {alertMsg && <Alert severity={alertSeverity}>{alertMsg}</Alert>}
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
