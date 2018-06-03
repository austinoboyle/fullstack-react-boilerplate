module.exports = (data, file) => {
    const match = data.match(/exports.locals = ({[\s\S]*};)/g)[0];
    return "module.exports = " + match;
};
