import Types from '../Types'

const handlers = {
    [Types.ADD.RAW_IMAGE_URI]: (state, {payload}) => ({
        ...state,
        images: [
            ...state.images,
            {
                status: Types.STATUS.RAW_IMAGE,
                uriId: payload.uri,
                rawImage: payload
            }
        ]
    }),
    [Types.SHOW_RAW_IMAGE]: (state, {payload}) => {
        const image = state.images.find((image) => image.uriId === payload.uriId)
        image.status = Types.STATUS.RAW_IMAGE
        return ({...state})
    },
    [Types.SHOW_PROCESSING_STATUS]: (state, {payload}) => {
        const image = state.images.find((image) => image.uriId === payload.uriId)
        image.status = Types.STATUS.PROCESSING
        return ({...state})
    },
    [Types.SHOW_DETECTED_IMAGE]: (state, {payload}) => {
        const image = state.images.find((image) => image.uriId === payload.uriId)
        image.status = Types.STATUS.DETECTED_IMAGE
        return ({...state})
    },
    [Types.ADD.DETECTED_IMAGE_BASE64]: (state, {payload}) => {
        const image = state.images.find((image) => image.uriId === payload.originId)
        image.status = Types.STATUS.DETECTED_IMAGE
        image.detectedImage = payload
        return ({...state})
    },
    [Types.SET.URL]: (state, {payload}) => ({...state, serverAddress: payload}),
    [Types.SET.PORT]: (state, {payload}) => ({...state, serverPort: payload}),
    [Types.SET.ADDRESS_PORT]: (state, {payload}) => ({...state, ...payload }),
    DEFAULT: state => state
}

export default (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}