import React from 'react'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'

function AddPlayerNotification() {
    return (
        <Stack sx={{ width: '50%', textAlign: 'center' }} spacing={2}>
            <Alert severity="error"> Use a unique name for each player</Alert>
        </Stack>
    )
}

export default AddPlayerNotification
