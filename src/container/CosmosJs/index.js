import React from "react";
import cosmosjs from "@cosmostation/cosmosjs";
import './index.css';

const CosmosJs = () => {
    const chainId = "flixstudio";
    const lcdUrl = "http://135.181.64.116:1317"
    const rpcUrl = "http://135.181.64.116:26657"
    const flixnet = cosmosjs.network(lcdUrl, chainId);
    flixnet.setBech32MainPrefix("freeflix");
    flixnet.setPath("m/44'/118'/0'/0/0");

    const mnemonic = "chat head maximum soon spirit cream immense dove lake quote whip borrow emerge scissors wonder cloud plate horse copy grain focus soon impulse april";
    const address = flixnet.getAddress(mnemonic);
    // const to_mnemonic = "prison stick shove detail primary annual ugly phone surface media suspect essence celery goat correct prosper radio horn normal able struggle coast giraffe fatal";
    // const to_address = flixnet.getAddress(to_mnemonic);

    const ecpairPriv = flixnet.getECPairPriv(mnemonic);

    const sign = () => {
        flixnet.getAccounts(address).then(data => {
            console.log('get accounts', data)
            let stdSignMsg = flixnet.newStdMsg({
                msgs: [
                    {
                        type: "cosmos-sdk/MsgSend",
                        value: {
                            amount: [
                                {
                                    amount: String(5000),
                                    denom: "flix"
                                }
                            ],
                            from_address: address,
                            to_address: address
                        }
                    }
                ],
                chain_id: chainId,
                fee: {amount: [{amount: String(10), denom: "flix"}], gas: String(200000)},
                memo: "",
                account_number: String(data.result.value.account_number),
                sequence: String(data.result.value.sequence)
            });

            let signedTx = flixnet.sign(stdSignMsg, ecpairPriv, 'block');
            flixnet.broadcast(signedTx).then(response => console.log('Cosmos Js signedTx ', response));
        })
    }

    return (
        <div className="cosmosjs">
            <div className="cosmosjs_header">
                Cosmos JS SignedTx
            </div>
            <div>
                <button className="cosmosjs_button" onClick={() => sign()}>
                    Click to Sign with Cosmos Js
                </button>
                <div className="cosmosjs_info">After Signing with Cosmos Js, Please Check Console for response </div>
            </div>
        </div>
    )
}

export default CosmosJs;