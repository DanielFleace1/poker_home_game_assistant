import React from 'react'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'

// eslint-disable-next-line react/prop-types
function Notification({ alertMsg }) {
    return (
        <Stack sx={{ width: '50%', textAlign: 'center' }} spacing={2}>
            <Alert severity="error">{alertMsg} </Alert>
        </Stack>
    )
}

export default Notification
