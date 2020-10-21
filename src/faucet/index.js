import {LcdClient, makeCosmoshubPath, Secp256k1HdWallet} from "@cosmjs/launchpad";
import {Bip39, Random} from "@cosmjs/crypto";

const defaultHttpUrl = "http://135.181.64.116:1317";
export const defaultNetworkId = "srinu-testnet1";
export const defaultFee = {
    amount: [
        {
            amount: "5000",
            denom: "fmt",
        },
    ],
    gas: "890000",
};

const mnemonic = Bip39.encode(Random.getBytes(16)).toString();
export const faucetAddress = "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6";

// export const wallet = Secp256k1HdWallet.fromMnemonic(mnemonic);
export const wallet = Secp256k1HdWallet.fromMnemonic(mnemonic, makeCosmoshubPath(0), "cosmos");
// export const wallet = Secp256k1HdWallet.generate(12, makeCosmoshubPath(0), "cosmos");

// export const wallet = createWallets(mnemonic, constants.addressPrefix, constants.concurrency, true);

export const client = new LcdClient(defaultHttpUrl);
