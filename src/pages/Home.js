import React from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
// import '../styling/App.css'
import '../styling/homePage.css'

function Home() {
    // State

    const [buyInCost, setBuyInCost, chipsPerBuyIn, setChipsPerBuyIn, , ,] = useOutletContext()
    // Handler Functions
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        window.sessionStorage.setItem('buyInCost', buyInCost)
        window.sessionStorage.setItem('chipsPerBuyIn', chipsPerBuyIn)
        navigate('/game')
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
        <div id="bg">
            <div id="homeWrapper">
                <div className="hpPokerTitle">Poker Assistant Home Page</div>
                <div className="hpPokerSubHeading"> Set up your game!</div>
                <form className="hpForm" onSubmit={handleSubmit}>
                    <div>
                        <div className="formText">Buy in Cost $:</div>
                        <input
                            type="number"
                            value={buyInCost || ''}
                            name="buyInCost"
                            onChange={handleInputChange}
                            required
                            min="1"
                            className="hpFormInputs"
                        />
                    </div>
                    <div>
                        <div className="formText">Chips per Buy In:</div>
                        <input
                            type="number"
                            value={chipsPerBuyIn || ''}
                            name="chipsPerBuyIn"
                            onChange={handleInputChange}
                            required
                            min="1"
                            className="hpFormInputs"
                        />
                    </div>
                    <div className="hpGameInfo">
                        <div className="hpGameInfoText"> $/chips:</div>
                        <div className="hpGameInfoNumber">
                            {chipsPerBuyIn > 0 && buyInCost > 0 && buyInCost / chipsPerBuyIn}
                        </div>
                    </div>
                    <button id="hpStartButton" type="submit">
                        Start Game !
                    </button>
                </form>
                <br />
                <button id="hpInfoButton" type="button" onClick={handleShowInfo}>
                    Info
                </button>
            </div>
        </div>
    )
}

export default Home
