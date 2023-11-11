const initialState :string = "Shop All"

export const tabReducer= (state: string = initialState, action: any) => {
    switch (action.type) {
        case "CHANGE":
          return state = action.payload
        default:
          return state;
      }
}