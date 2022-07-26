const padBytes32 = (str) => {
    str = str.replace("0x", "");
    if (str.length < 32) {
        while(str.length < 32) {
            str = "0" + str;
        }
    }
    str = "0x" + str;
    return str;
};

module.exports = {
    padBytes32
};