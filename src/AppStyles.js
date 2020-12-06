import Constants from "./Constants";

export default {
    Shadows: {
        LIGHT_SHADOW: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,

            elevation: 6
        }
    },
    Inputs: {
        INPUT_BORDER_BOTTOM: {
            width: '100%',
            fontSize: 18,
            padding: 4,
            margin: 4,
            borderBottomColor: Constants.Colors.MAIN_COLOR_BLUE,
            borderBottomWidth: 1
        }
    }
}