const Web3 = require("web3");
const crypto = require("../../utils/crypto")
export const handler = (app) => app.get("/transaction", async (req, res, next) => {

const web3 = await new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/1fe8dfb4e22441f1b98fdcef166437d3'));
    
    let respose = web3.eth.accounts.sign(
      "0x621b9eef89e4961722bb87762d8338384c9ec204ae60aaa6476ceddd16512743",
      "0xc963e654d32e14f2e1a7328eb066b2bc2b6579423a97f27e6b084186f55f1652"
    );

    res.send(respose)

});