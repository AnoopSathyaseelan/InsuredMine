exports.santizeBody = async(model, body) => {

    Object.keys(body).forEach((key) => {
        if (!model.hasOwnProperty(key)) {
            delete body[key];
        }
    })
}