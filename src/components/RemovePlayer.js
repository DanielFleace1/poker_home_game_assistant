import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'

// import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const ITEM_HEIGHT = 20
const ITEM_PADDING_TOP = 0
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 10,
            // border: 'solid',
            // size: 'sm',
        },
    },
}

// eslint-disable-next-line react/prop-types
function RemovePlayer() {
    const [
        ,
        ,
        ,
        ,
        // setBuyInCost,
        // setChipsPerBuyIn,
        playersArray,
        setPlayersArray,
    ] = useOutletContext()

    const names = []

    playersArray.forEach((player) => {
        names.push(player.name)
    })

    // eslint-disable-next-line no-unused-vars
    const [removePlayer, setRemovePlayer] = useState([])

    const handleRemovePlayer = (e) => {
        e.preventDefault()

        const playerIndex = playersArray.findIndex((x) => x.name === removePlayer[0])
        if (playerIndex === -1) {
            // handle error
        } else {
            setPlayersArray([
                ...playersArray.slice(0, playerIndex),
                ...playersArray.slice(playerIndex + 1),
            ])
            setRemovePlayer([])
        }
    }

    const handleDropDownChange = (e) => {
        e.preventDefault()
        const {
            target: { value },
        } = e
        if (value[0] === undefined) {
            setRemovePlayer([])
        } else {
            const arr = []
            arr.push(value[0])
            setRemovePlayer(arr)
        }
    }

    return (
        <div>
            <form onSubmit={handleRemovePlayer}>
                <FormControl sx={{ margin: 1, width: 150 }}>
                    <InputLabel id="demo-multiple-name-label">Name</InputLabel>
                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={removePlayer}
                        onChange={handleDropDownChange}
                        input={<OutlinedInput label="Name" />}
                        MenuProps={MenuProps}
                        sx={{ height: '40px' }}
                    >
                        {names.map((name) => (
                            <MenuItem key={name} value={name}>
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <button type="submit"> remove player</button>
            </form>
        </div>
    )
}

export default RemovePlayer
