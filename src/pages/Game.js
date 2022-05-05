import React, { useEffect, useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
// Material UI
import Alert from '@mui/material/Alert'
// Css
import '../App.css'
// Helper Fns
import helperFunctions from '../helperFunctions'
// Components
import ExitGameDialog from '../components/ExitGameDialog'

function Game() {
    // State
    const [
        buyInCost, // setBuyInCost,
        ,
        chipsPerBuyIn, // setChipsPerBuyIn,
        ,
        playersArray,
        setPlayersArray,
    ] = useOutletContext()
    const [newPlayer, setNewPlayer] = useState('')
    const [alertMsg, setAlertMsg] = useState(null)
    const [alertSeverity, setAlertSeverity] = useState(null)
    const [indexNum, setIndexNum] = useState(0)
    const [payoutDisplay, setPayoutDisplay] = useState(null)
    const navigate = useNavigate()

    const addPlayer = (e) => {
        e.preventDefault()
        if (newPlayer.length === 0) return // add display warning: cannot enter players without a name
        const obj = {
            name: newPlayer,
            buyIns: 0,
            endingChips: 0,
            index: indexNum,
        }
        setPlayersArray([...playersArray, obj])
        setIndexNum(indexNum + 1)
        setNewPlayer('')
    }
    const handleSetNewPlayer = (e) => {
        setNewPlayer(e.target.value)
    }
    const handleCalculatePayouts = (e) => {
        e.preventDefault()
        const payout = helperFunctions.calculatePayouts(
            playersArray,
            buyInCost,
            buyInCost / chipsPerBuyIn
        )
        setPayoutDisplay(payout)
        setTimeout(() => {
            setPayoutDisplay(null)
        }, 5000)
    }
    const handleBuyInChange = (e) => {
        const { name, value } = e.target
        const playerIndex = playersArray.findIndex((x) => x.index === Number(name))
        if (playerIndex === -1) {
            // to do: handle error gracefully
        } else {
            setPlayersArray([
                ...playersArray.slice(0, playerIndex),
                { ...playersArray[playerIndex], buyIns: value },
                ...playersArray.slice(playerIndex + 1),
            ])
        }
    }
    const handleEndChipCountChange = (e) => {
        const { name, value } = e.target
        const playerIndex = playersArray.findIndex((x) => x.index === Number(name))
        if (playerIndex === -1) {
            // to do: handle error gracefully
        } else {
            setPlayersArray([
                ...playersArray.slice(0, playerIndex),
                { ...playersArray[playerIndex], endingChips: value },
                ...playersArray.slice(playerIndex + 1),
            ])
        }
    }
    // Effects
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
            }, 1000)
        }
    }, [buyInCost, chipsPerBuyIn, navigate])

    return (
        <div id="appWrapper">
            <h1> Poker Assistant Home Page</h1>
            {alertMsg && <Alert severity={alertSeverity}>{alertMsg}</Alert>}
            <div> Buy in Cost: {buyInCost || '0'}</div>
            <div> Chips per Buy In: {chipsPerBuyIn || '0'}</div>
            <div> $/Chip {buyInCost / chipsPerBuyIn || '0'}</div>
            <br />
            <form onSubmit={addPlayer}>
                add Player
                <input
                    value={newPlayer}
                    onChange={handleSetNewPlayer}
                    placeholder="Enter player name"
                />
                <button type="submit">addPlayer</button>
            </form>
            <br />
            <br />
            <div style={{ display: 'flex' }}>
                <div>player Name </div> <div> ::Buy ins</div>
            </div>
            <form onSubmit={handleCalculatePayouts}>
                {playersArray &&
                    playersArray.map((player) => {
                        return (
                            <div key={player.index}>
                                {player.name}{' '}
                                <input
                                    onChange={handleBuyInChange}
                                    name={player.index}
                                    value={player.buyIns}
                                />{' '}
                                <input
                                    onChange={handleEndChipCountChange}
                                    name={player.index}
                                    value={player.endingChips}
                                />
                            </div>
                        )
                    })}
                <br />
                <button type="submit">calculate payouts</button>
            </form>

            {payoutDisplay &&
                payoutDisplay.map((elm, index) => {
                    // eslint-disable-next-line react/no-array-index-key
                    return <div key={index}> {elm} </div>
                })}
            <ExitGameDialog />

            {/* <button type="button" onClick={handleExit}>
                Exit Game - Home
            </button> */}
        </div>
    )
}

export default Game

// const handleRemovePlayer = (e) => {
//     const { name } = e.target
//     const playerIndex = playersArray.findIndex((x) => x.index === Number(name))
//     if (playerIndex === -1) {
//         // to do: handle error gracefully
//     } else {
//         setPlayersArray([
//             ...playersArray.slice(0, playerIndex),
//             ...playersArray.slice(playerIndex + 1),
//         ])
//     }
// }

/* <button type="button" onClick={handleRemovePlayer}> Remove Player </button> */
