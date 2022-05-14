/* eslint-disable react/prop-types */
import React from 'react'
import { useNavigate } from 'react-router-dom'
// // Material UI
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Slide from '@mui/material/Slide'

const Transition = React.forwardRef(function Transition(props, ref) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Slide direction="up" ref={ref} {...props} />
})

function PayoutDialog({
    openPayout,
    setOpenPayout,
    payouts,
    setPlayersArray,
    setChipsPerBuyIn,
    setBuyInCost,
}) {
    const navigate = useNavigate()
    // Handlers
    const handleExit = () => {
        // Clear state for Game: Buy In Cost, Chips Per Buy In, Players Array
        setPlayersArray([])
        setChipsPerBuyIn(0)
        setBuyInCost(0)
        window.sessionStorage.clear()
        navigate('/')
    }
    const handleClose = () => {
        setOpenPayout(false)
    }
    return (
        <div>
            <Dialog
                open={openPayout}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <DialogContentText>PayOuts</DialogContentText>
                    <div>
                        {payouts &&
                            // eslint-disable-next-line react/prop-types
                            payouts.map((elm, index) => {
                                // eslint-disable-next-line react/no-array-index-key
                                return <div key={index}> {elm} </div>
                            })}
                    </div>
                    <DialogActions>
                        <button onClick={handleClose} type="button">
                            Return to Game
                        </button>
                        <button onClick={handleExit} type="button">
                            End Game | Players & Amounts will be Cleared
                        </button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default PayoutDialog
