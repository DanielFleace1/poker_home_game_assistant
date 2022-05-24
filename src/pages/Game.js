import React, { useEffect, useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import '../styling/Game.css'
import helperFunctions from '../helperFunctions'
import ExitGameDialog from '../components/ExitGameDialog'
import Notification from '../components/Notification'
import PayoutDialog from '../components/PayoutsDialog'

function Game() {
    const [
        buyInCost,
        setBuyInCost,
        chipsPerBuyIn,
        setChipsPerBuyIn,
        playersArray,
        setPlayersArray,
    ] = useOutletContext()
    const [newPlayer, setNewPlayer] = useState('')
    const [removePlayer, setRemovePlayer] = useState('')
    const [alertMsg, setAlertMsg] = useState(false)
    const [indexNum, setIndexNum] = useState(0)
    // const [payoutDisplay, setPayoutDisplay] = useState(false)
    const [openPayout, setOpenPayout] = useState(false)
    const [payouts, setPayouts] = useState([])
    const navigate = useNavigate()

    const indexNumStorage = window.sessionStorage.getItem('indexNumStorage')

    if (indexNumStorage && Number(indexNumStorage) !== indexNum) {
        setIndexNum(Number(indexNumStorage))
    }

    const addPlayer = (e) => {
        e.preventDefault()
        if (newPlayer.length === 0) return // add display warning: cannot enter players without a name
        const obj = {
            name: newPlayer,
            buyIns: '',
            endingChips: '',
            index: indexNum,
        }
        if (playersArray.findIndex((x) => x.name === obj.name) > -1) {
            setAlertMsg('Enter a unique name for each player. ')
            setTimeout(() => {
                setAlertMsg(false)
            }, 3000)
            return
        }
        const playersArrayStorage = [...playersArray, obj]
        const setIndexNumStorage = indexNum + 1
        setPlayersArray([...playersArray, obj])
        setIndexNum(indexNum + 1)
        setNewPlayer('')
        window.sessionStorage.setItem('playersArrayStorage', JSON.stringify(playersArrayStorage))
        window.sessionStorage.setItem('indexNumStorage', setIndexNumStorage)
    }

    const handleSetNewPlayer = (e) => {
        setNewPlayer(e.target.value)
    }

    const checkTotalChipsBuyIns = () => {
        let totalChipsbuyIns = 0
        playersArray.forEach((player) => {
            totalChipsbuyIns += Number(player.buyIns) * Number(chipsPerBuyIn)
        })
        return totalChipsbuyIns
    }

    const checkTotalChipsChipCount = () => {
        let totalChipsChipCount = 0
        playersArray.forEach((player) => {
            totalChipsChipCount += Number(player.endingChips)
        })
        return totalChipsChipCount
    }

    const handleCalculatePayouts = (e) => {
        e.preventDefault()
        if (playersArray.length <= 1) {
            setAlertMsg('add multiple players to calculate payouts')
            setTimeout(() => {
                setAlertMsg(false)
            }, 1000)
            return
        }
        const check1 = checkTotalChipsBuyIns()
        const check2 = checkTotalChipsChipCount()
        if (check1 !== check2) {
            // Refractor this message. Add  a display to show players how much they are off
            setAlertMsg(
                'Sum(total Buy Ins)* Chips per buy Buy in must equal Total chips in ending chips'
            )
            setTimeout(() => {
                setAlertMsg(false)
            }, 1000)
            return
        }
        const payout = helperFunctions.calculatePayouts(
            playersArray,
            buyInCost,
            buyInCost / chipsPerBuyIn
        )
        setPayouts(payout)
        setOpenPayout(true)
    }

    const handleBuyInChange = (e) => {
        const { name, value } = e.target
        const playerIndex = playersArray.findIndex((x) => x.index === Number(name))
        if (playerIndex === -1) {
            return
        }
        setPlayersArray([
            ...playersArray.slice(0, playerIndex),
            { ...playersArray[playerIndex], buyIns: value },
            ...playersArray.slice(playerIndex + 1),
        ])
    }
    const handleEndChipCountChange = (e) => {
        const { name, value } = e.target
        const playerIndex = playersArray.findIndex((x) => x.index === Number(name))
        if (playerIndex === -1) {
            return
        }
        setPlayersArray([
            ...playersArray.slice(0, playerIndex),
            { ...playersArray[playerIndex], endingChips: value },
            ...playersArray.slice(playerIndex + 1),
        ])
    }
    const handleRemovePlayer = (e) => {
        e.preventDefault()
        const playerIndex = playersArray.findIndex((x) => String(x.index) === removePlayer)
        if (playerIndex === -1) {
            return
        }
        setPlayersArray(
            [...playersArray.slice(0, playerIndex), ...playersArray.slice(playerIndex + 1)] || []
        )
        setRemovePlayer('')
        const playersArrayStorage = [
            ...playersArray.slice(0, playerIndex),
            ...playersArray.slice(playerIndex + 1),
        ]
        window.sessionStorage.setItem('playersArrayStorage', JSON.stringify(playersArrayStorage))
    }

    // Effects
    useEffect(() => {
        if (Number(buyInCost) === 0 || Number(chipsPerBuyIn) === 0) {
            setAlertMsg(
                'Please enter amounts > 0 for: "Buy in Cost" & "Chips per Buy in": You will be directed to the home screen where you can do so!'
            )
            setTimeout(() => {
                navigate('/')
                setAlertMsg(false)
            }, 1000)
        }
    }, [buyInCost, chipsPerBuyIn, navigate])

    return (
        <div id="bg">
            <div id="homeWrapper">
                <div className="gameTitle"> Poker Assistant Game Page</div>
                <div className="gameSubHeading"> Current Game Info!</div>
                {alertMsg && <Notification alertMsg={alertMsg} />}
                <div className="g_CurrentGameInfoContainer">
                    <div className="g_cGiC_text"> Buy in Cost: </div>
                    <div className="g_cGiC_nubmer">{buyInCost || '0'}</div>
                    <div className="g_cGiC_text"> Chips per Buy In: </div>
                    <div className="g_cGiC_nubmer">{chipsPerBuyIn || '0'}</div>
                    <div className="g_cGiC_text"> $/Chip </div>
                    <div className="g_cGiC_nubmer"> {buyInCost / chipsPerBuyIn || '0'}</div>
                </div>
                <div id="g_formContainer">
                    <form className="gameForm" onSubmit={addPlayer}>
                        <div id="g_addPlayerContainer">
                            <div id="g_PlayerName">Add Player Name: </div>
                            <input
                                value={newPlayer}
                                onChange={handleSetNewPlayer}
                                // placeholder="Click to Enter"
                                className="g_PlayerNameInput"
                            />
                        </div>
                        <button id="addPlayerButton" type="submit">
                            Add Player
                        </button>
                    </form>
                    <div id="g_listedPlayersFormHeadingsContainer">
                        <div className="g_lPFH_text">Name </div>
                        <div id="g_lPFH_buyIns" className="g_lPFH_text">
                            {' '}
                            Buy Ins
                        </div>
                        <div className="g_lPFH_text"> Ending Chips</div>
                    </div>
                    <form id="g_listedPlayersFormContainer" onSubmit={handleCalculatePayouts}>
                        {playersArray &&
                            playersArray.map((player) => {
                                return (
                                    <div className="g_lpFGC_Container" key={player.index}>
                                        <div className="g_lpFGC_name"> {player.name}</div>
                                        <input
                                            className="g_lpFGC_InputBuyIn"
                                            onChange={handleBuyInChange}
                                            name={player.index}
                                            value={player.buyIns}
                                            required
                                            type="number"
                                            min="0"
                                        />{' '}
                                        <input
                                            className="g_lpFGC_InputEndingChips"
                                            onChange={handleEndChipCountChange}
                                            name={player.index}
                                            value={player.endingChips}
                                            required
                                            type="number"
                                            min="0"
                                        />
                                    </div>
                                )
                            })}
                        <button id="g_calculatePayouts" type="submit">
                            Calculate payouts
                        </button>
                    </form>
                    <form onSubmit={handleRemovePlayer}>
                        <select
                            value={removePlayer || 'DEFAULT'}
                            onChange={(e) => {
                                setRemovePlayer(e.target.value)
                            }}
                            name="players"
                        >
                            <option value="DEFAULT">Reomve Players</option>
                            {playersArray.map((player) => {
                                return (
                                    <option type="text" value={player.index} key={player.index}>
                                        {' '}
                                        {player.name}
                                    </option>
                                )
                            })}
                        </select>
                        <button type="submit">Remove Player</button>
                    </form>
                </div>
                <ExitGameDialog />
                <PayoutDialog
                    openPayout={openPayout}
                    payouts={payouts}
                    setOpenPayout={setOpenPayout}
                    setPlayersArray={setPlayersArray}
                    setChipsPerBuyIn={setChipsPerBuyIn}
                    setBuyInCost={setBuyInCost}
                />
            </div>
        </div>
    )
}
export default Game
