const Web3 = require("web3");
const {  findQuery } = require("../../db/models/DelegateRequest")

export const handler = (app) => app.post("/all-transactions",async(req, res, next) => {
  const web3 = await new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/1fe8dfb4e22441f1b98fdcef166437d3'));

    const { address } = req.body;

    console.log("TRANSACTION LIST REQUEST BODY",req.body)
    
     try {
      let allTransactions = await findQuery({ from:address });

      let receivedTransactions = await findQuery({ "delegatedFunctionArguments.1" : address });

    //   console.log("SENT TRANSCTIONS",allTransactions)

        const newTransactions = []

      allTransactions.forEach( async (transactions)=>{

        if( transactions.status == 3){

            const data = {
              status: 1,
              hash: transactions.transactionHash,
              timestamp: transactions.createdAt,
              from: transactions.from,
              to: transactions.delegatedFunctionArguments[1],
              amount: transactions.delegatedFunctionArguments[2]/1000000000000000000,
              gasFeeInTokens: transactions.delegatedFunctionArguments[3]/1000000000000000000,
              blockNumber: transactions.txReceipt.blockNumber
            }
            newTransactions.push(data)
        }


        if(transactions.status == 0 ){

            const data = {
                status: 0,
                hash: "Transaction Failed",
                timestamp: transactions.createdAt,
                from: transactions.from,
                to: transactions.context.functionArguments[0],
                amount: transactions.context.functionArguments[1]/1000000000000000000,
                gasFeeInTokens: "NA",
                blockNumber: "NA"
              }
              newTransactions.push(data)

        }

        if(transactions.status == 4 ){

          let receipt = await web3.eth.getTransactionReceipt('0x5985e0c1778b030ed8a0c2de786299e59e2cc092bd1a623ba441825b28ca0770');


            const data = {
              status: 1,
              hash: transactions.transactionHash,
              timestamp: transactions.createdAt,
              from: transactions.from,
              to: transactions.delegatedFunctionArguments[1],
              amount: transactions.delegatedFunctionArguments[2]/1000000000000000000,
              gasFeeInTokens: transactions.delegatedFunctionArguments[3]/1000000000000000000,
              blockNumber: receipt.blockNumber
              }
              newTransactions.push(data)

        }
      });

      receivedTransactions.forEach( async(transactions)=>{

        if( transactions.status == 3 ){

            const data = {
              status: 1,
              hash: transactions.transactionHash,
              timestamp: transactions.createdAt,
              from: transactions.from,
              to: transactions.delegatedFunctionArguments[1],
              amount: transactions.delegatedFunctionArguments[2]/1000000000000000000,
              gasFeeInTokens: transactions.delegatedFunctionArguments[3]/1000000000000000000,
              blockNumber: transactions.txReceipt.blockNumber
            }
            newTransactions.push(data)
        }


        if(transactions.status == 0 ){

            const data = {
                status: 0,
                hash: "Transaction Failed",
                timestamp: transactions.createdAt,
                from: transactions.from,
                to: transactions.context.functionArguments[0],
                amount: transactions.context.functionArguments[1]/1000000000000000000,
                gasFeeInTokens: "NA",
                blockNumber: "NA"
              }
              newTransactions.push(data)

        }

        if(transactions.status == 4 ){

          let receipt = await web3.eth.getTransactionReceipt('0x5985e0c1778b030ed8a0c2de786299e59e2cc092bd1a623ba441825b28ca0770');


            const data = {
              status: 1,
              hash: transactions.transactionHash,
              timestamp: transactions.createdAt,
              from: transactions.from,
              to: transactions.delegatedFunctionArguments[1],
              amount: transactions.delegatedFunctionArguments[2]/1000000000000000000,
              gasFeeInTokens: transactions.delegatedFunctionArguments[3]/1000000000000000000,
              blockNumber: receipt.blockNumber
              }
              newTransactions.push(data)

        }
      });
      let reversedList=newTransactions.reverse()

      res.status(200).send(reversedList)
     } catch (error) {
       console.log(error);
     }
  });