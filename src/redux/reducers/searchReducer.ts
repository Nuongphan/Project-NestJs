const initialState :string = ""

export const searchReducer= (state: string = initialState, action: any) => {
    switch (action.type) {
        case "SEARCH":
          return state = action.payload
        default:
          return state;
      }
}