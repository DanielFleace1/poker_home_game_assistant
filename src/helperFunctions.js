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
    // console.log('calculate payt outs')
    // create a deep copy of players ary
    const deepClone = JSON.parse(JSON.stringify(playersArray))
    const ary = getAry(deepClone, buyInCost, dollarChip)
    const rA = []
    for (let i = ary.length - 1; i >= 0; i -= 1) {
        if (ary[i].profit > 0) return rA
        for (let j = 0; j < ary.length; j += 1) {
            if (ary[j].owed < 0) break
            if (ary[i].owed + ary[j].owed <= 0 && ary[j].owed !== 0) {
                rA.push(`${ary[i].name} pays ${ary[j].name} ${ary[j].owed}`)
                ary[i].owed += ary[j].owed
                ary[j].owed = 0
            } else if (ary[i].owed + ary[j].owed > 0) {
                rA.push(`${ary[i].name} pays ${ary[j].name} ${Math.abs(ary[i].owed)}`)
                ary[j].owed += ary[j].owed
                ary[i].owed = 0
            }
        }
    }
    return rA
}

export default { calculatePayouts }
