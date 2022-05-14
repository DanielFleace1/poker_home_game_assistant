const getAry = (deepClone, buyInCost, dollarChip) => {
    const ary = []
    deepClone.forEach((elm) => {
        const obj = {
            name: elm.name,
            profit: elm.endingChips * dollarChip - elm.buyIns * buyInCost,
            owed: elm.endingChips * dollarChip - elm.buyIns * buyInCost,
        }
        ary.push(obj)
    })
    return ary
}

const calculatePayouts = (playersArray, buyInCost, dollarChip) => {
    const deepClone = JSON.parse(JSON.stringify(playersArray))
    const ary = getAry(deepClone, buyInCost, dollarChip)
    // Sort ary by owed
    ary.sort(({ owed: a }, { owed: b }) => b - a)
    const rA = []
    // Loop through the array of objects backwards ( who owes the most )
    for (let i = ary.length - 1; i >= 0; i -= 1) {
        // Once Loop reaches players that are profitable rA [payouts statments] are complete
        if (ary[i].profit > 0) return rA
        if (ary[i].profit === 0) rA.push(`${ary[i].name} breaks even.`)
        // Loop through array of objects from start
        for (let j = 0; j < ary.length; j += 1) {
            if (ary[j].owed < 0) break
            if (ary[i].owed + ary[j].owed <= 0 && ary[j].owed !== 0) {
                rA.push(`${ary[i].name} pays ${ary[j].name} ${parseFloat(ary[j].owed).toFixed(2)}.`)
                ary[i].owed += ary[j].owed
                ary[j].owed = 0
            } else if (ary[i].owed + ary[j].owed > 0) {
                rA.push(
                    `${ary[i].name} pays ${ary[j].name} ${parseFloat(Math.abs(ary[i].owed)).toFixed(
                        2
                    )}.`
                )
                ary[j].owed += ary[j].owed
                ary[i].owed = 0
            }
        }
    }
    return rA
}

export default { calculatePayouts }
