


const initialState: number = 0
export const paginationReducer = (state: number = initialState, action: any) => {
    switch (action.type) {
        case 1:
            return state = 1;
        case 2:
            return state = 2;
        case 3:
            return state = 3;
        case 4:
            return state = 4;
        case 5:
            return state = 5;
        default:
            return state = 1

    }
}