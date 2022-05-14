import React, { useEffect, useState } from 'react'

import { useOutletContext } from 'react-router-dom'
import helperFunctions from '../helperFunctions'
import ExitGameDialog from '../components/ExitGameDialog'

function Payouts() {
    const [
        buyInCost, // setBuyInCost, // setChipsPerBuyIn,
        ,
        chipsPerBuyIn, // setChipsPerBuyIn,
        ,
        playersArray,
        ,
    ] = useOutletContext()
    // const payout = helperFunctions.calculatePayouts(
    //     playersArray,
    //     buyInCost,
    //     buyInCost / chipsPerBuyIn
    // )
    const [payoutDisplay, setPayoutDisplay] = useState(false)

    useEffect(() => {
        const payout = helperFunctions.calculatePayouts(
            playersArray,
            buyInCost,
            buyInCost / chipsPerBuyIn
        )
        console.log(payout)
        setPayoutDisplay(payout)
    }, [buyInCost, chipsPerBuyIn, playersArray])

    // const test = () => {
    //     console.log('test')
    // // }
    // // test()

    return (
        <div id="appWrapper">
            {payoutDisplay &&
                payoutDisplay.map((elm, index) => {
                    // eslint-disable-next-line react/no-array-index-key
                    return <div key={index}> {elm} </div>
                })}
            {/* <button type="button"> Return To Game</button> */}
            <button type="button">Return To Game </button>
            <ExitGameDialog />
        </div>
    )
}

export default Payouts
