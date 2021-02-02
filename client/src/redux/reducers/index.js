let defaultState = {
    selectedBranchId: null,
    selectedRiskAreaCode: null
}

const reducers = (state = defaultState, action) => {
    switch (action.type) {
        case "selectBranchId":
            return {
                ...state,
                selectedBranchId: action.payload
            }
            case "selectRiskAreaCode":
                return {
                    ...state,
                    selectedRiskAreaCode: action.payload
                }
        default:
            return state;
    }
}

export default reducers;