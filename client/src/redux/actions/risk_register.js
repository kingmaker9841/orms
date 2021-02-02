export const setSelectedBranch = (branchId) => {
    return ({
        type: 'selectBranchId',
        payload: branchId,
    })
}
export const setSelectedRiskArea = (riskAreaCode) => {
    return ({
        type: 'selectRiskAreaCode',
        payload: riskAreaCode,
    })
}