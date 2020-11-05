const Web3 = require("web3");
const crypto = require("../../utils/crypto")
export const handler = (app) => app.get("/create-ethaccount", async (req, res, next) => {

const web3 = await new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/1fe8dfb4e22441f1b98fdcef166437d3'));

    let privateData = web3.eth.accounts.create();

    // let signdata = await web3.eth.sign("Hello world", "0x6E79AB0386df58642A77A9Ff876E969a5362f905")

    var rawTransaction = {
        from: "0x1876b1125D8aAa6A6A4C5DAaE771571e572e856B",
        to: "0x21AF90459b9aF1Ff1405e1020aF568FFC0186DA5",
        value: web3.utils.toHex(web3.utils.toWei("0.001", "ether")),
        gas: 200000,
        chainId: 3
      };
      
    let signdata = await web3.eth.accounts.signTransaction(rawTransaction,"Hello world", "0x3324273de0769a8d280be5b88fb1d88b6463c36743389c3f71ad6476070ec28b")

    let encryptedKey = await crypto.serverEncryption(privateData.privateKey);

    const data = {
        key:privateData.privateKey,
        address:privateData.address,
        sing: signdata
    }

    res.send(data)

});