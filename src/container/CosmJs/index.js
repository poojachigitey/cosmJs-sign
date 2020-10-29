import React, {Component} from 'react';
import {CosmosClient, makeCosmoshubPath, makeSignDoc, makeStdTx, Secp256k1HdWallet} from "@cosmjs/launchpad";
import './index.css'

class CosmJs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signResult: {}
        }
        this.sign = this.sign.bind(this);
    }


    async sign() {
        const apiUrl = "http://135.181.64.116:1317";

        // const mnemonic = Bip39.encode(Random.getBytes(16)).toString();
        const mnemonic = "chat head maximum soon spirit cream immense dove lake quote whip borrow emerge scissors wonder cloud plate horse copy grain focus soon impulse april";

        const wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic, makeCosmoshubPath(0), "freeflix");
        const [{address}] = await wallet.getAccounts();

        const client = new CosmosClient(apiUrl);
        const {accountNumber, sequence} = await client.getSequence(address);

        const defaultNetworkId = "flixstudio";
        const defaultFee = {
            amount: [
                {
                    amount: "5000",
                    denom: "flix",
                },
            ],
            gas: "890000",
        };

        const sendTokensMsg = {
            type: "cosmos-sdk/MsgSend",
            value: {
                from_address: address,
                to_address: address,
                amount: [
                    {
                        denom: "flix",
                        amount: "100",
                    },
                ],
            },
        };

        const signDoc = makeSignDoc(
            [sendTokensMsg],
            defaultFee,
            defaultNetworkId,
            "My first contract on chain",
            accountNumber,
            sequence,
        );

        const {signed, signature} = await wallet.sign(address, signDoc);
        const signedTx = makeStdTx(signed, signature);

        let broadcastResult = await client.broadcastTx(signedTx);
        this.setState({
            signResult: broadcastResult
        })
    }

    render() {
        return (
            <div className="cosmjs">
                <div className="cosmjs_header">
                    COSMJS SignedTx
                </div>
                <div>
                    <button className="cosmjs_button" onClick={() => this.sign()}>
                        Click to Sign with CosmJs
                    </button>
                    <div className="cosmjs_res">
                        {
                            this.state.signResult && this.state.signResult.logs ? 'success' : ''
                        }
                    </div>
                    {
                        this.state.signResult && this.state.signResult.logs &&
                        <div className="tx_hash_cosmjs">
                            <span> Transaction Hash : {"  "}</span>
                            <span>{" "} {this.state.signResult.transactionHash}</span>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default CosmJs;
