import React, {Component} from 'react';
import './App.css';
import {Bech32} from "@cosmjs/encoding";
import {Bip39, Random} from "@cosmjs/crypto";
import {defaultFee, defaultNetworkId} from './faucet';
import {CosmosClient, makeCosmoshubPath, makeSignDoc, makeStdTx, Secp256k1HdWallet} from "@cosmjs/launchpad";
import {wasmd} from './constants/url';

class App extends Component {
    async componentDidMount() {
        const apiUrl = wasmd.endpoint;

        const mnemonic = Bip39.encode(Random.getBytes(16)).toString();
        const wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic, makeCosmoshubPath(0), "cosmos");
        const emptyAddress = Bech32.encode("cosmos", Random.getBytes(20));
        const memo = "My first contract on chain";
        const client = new CosmosClient(apiUrl);

        const [{address}] = await wallet.getAccounts();

        // const { accountNumber, sequence } = await client.getSequence(address);

        const sendTokensMsg = {
            type: "cosmos-sdk/MsgSend",
            value: {
                from_address: address,
                to_address: emptyAddress,
                amount: [
                    {
                        denom: "fmt",
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

        const {signed, signature} = await wallet.sign(address, signDoc);
        const signedTx = makeStdTx(signed, signature);
        console.log('signedTx', signedTx)
        // const broadcastResult = await client.broadcastTx(signedTx);
        // console.log('55555555', broadcastResult);
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
