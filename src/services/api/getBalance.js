const Web3 = require("web3");

export const handler = (app) => app.post("/balance", async (req, res, next) => {

let address = req.address;

const web3 = await new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/1fe8dfb4e22441f1b98fdcef166437d3'));

let balance = web3.eth.getBalance(address)

res.send(balance)

});
