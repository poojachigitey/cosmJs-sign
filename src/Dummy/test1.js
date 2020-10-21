import React, {Component} from 'react';
import './App.css';
import {Bech32} from "@cosmjs/encoding";
import {Random} from "@cosmjs/crypto";
import {defaultFee, defaultNetworkId, faucetAddress, wallet} from '../faucet';
import {
    LcdClient,
    makeSignDoc,
    AuthExtension,
    setupAuthExtension,
    makeStdTx,
    SigningCosmosClient,
    Secp256k1HdWallet
} from "@cosmjs/launchpad";
import { WasmExtension, setupWasmExtension } from "@cosmjs/cosmwasm";
import { wasmd } from '../constants/url';

// const WasmClient = LcdClient & AuthExtension & WasmExtension;

const makeWasmClient = (apiUrl) => {
    return LcdClient.withExtensions({ apiUrl }, setupAuthExtension, setupWasmExtension);
};

class App extends Component {
    async componentDidMount() {
        const apiUrl = wasmd.endpoint;
        // const client = new LcdClient(apiUrl);
        // const client = makeWasmClient(apiUrl);

        // const {account_number, sequence} = (
        //     await client.auth.account(faucetAddress)
        // ).result.value;

        const emptyAddress = Bech32.encode("cosmos", Random.getBytes(20));
        const memo = "My first contract on chain";

        const sendTokensMsg = {
            type: "cosmos-sdk/MsgSend",
            value: {
                from_address: faucetAddress,
                to_address: emptyAddress,
                amount: [
                    {
                        denom: "ucosm",
                        amount: "1234567",
                    },
                ],
            },
        };

        const signDoc = makeSignDoc(
            [sendTokensMsg],
            defaultFee,
            defaultNetworkId,
            memo,
            0,
            0,
            // account_number,
            // sequence,
        );

        // const { signed, signature } = await wallet.sign(faucetAddress, signDoc);
        // const signedTx = makeStdTx(signed, signature);
        // const broadcastResult = await client.broadcastTx(signedTx);
    }

    render() {
        return (
            <div className="App">
                Hello World
            </div>
        );
    }
}

export default App;
