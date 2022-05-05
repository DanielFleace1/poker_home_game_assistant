import React, { useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
// Material UI
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Slide from '@mui/material/Slide'

const Transition = React.forwardRef(function Transition(props, ref) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Slide direction="up" ref={ref} {...props} />
})

function ExitGameDialog() {
    // State
    const [, setBuyInCost, , setChipsPerBuyIn, , setPlayersArray] = useOutletContext()
    const [open, setOpen] = useState(false)
    // React Router - Use Navigate
    const navigate = useNavigate()
    // Handlers
    const handleExit = () => {
        // Clear state for Game: Buy In Cost, Chips Per Buy In, Players Array
        setPlayersArray([])
        setChipsPerBuyIn(0)
        setBuyInCost(0)
        navigate('/')
    }
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <button type="button" onClick={handleOpen}>
                Exit Game
            </button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to exit game? You will lose all buy in and player
                        information.
                    </DialogContentText>
                    <DialogActions>
                        <button onClick={handleExit} type="button">
                            End Game
                        </button>
                        <button onClick={handleClose} type="button">
                            Return to Game
                        </button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ExitGameDialog
