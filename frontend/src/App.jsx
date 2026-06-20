import { useState } from "react";
import { ethers } from "ethers";
import nftData from "./Contract/NFTABI.json";
import { CONTRACT_ADDRESS } from "./Contract/contract";

function App() {

  const [account, setAccount] = useState("");
  const [uri, setUri] = useState("");
  const [totalSupply, setTotalSupply] =
  useState(0);

  async function connectWallet() {

    if (!window.ethereum) {
      alert("Install MetaMask");
      return;
    }

    const accounts =
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });

    setAccount(accounts[0]);
  }

  async function mintNFT() {

    const provider =
      new ethers.BrowserProvider(
        window.ethereum
      );

    
const signer = await provider.getSigner();

    const contract =
      new ethers.Contract(
        CONTRACT_ADDRESS,
        nftData.abi,
        signer
      );

    const tx =
  await contract.mintNFT(uri);

await tx.wait();

setUri("");

const total = await contract.totalSupply();
setTotalSupply(total.toString());
alert(
  `NFT Minted!\nTx Hash: ${tx.hash}`
);
  }

  return (
    <div
  style={{
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #0f172a, #1e293b, #312e81)",
    fontFamily: "Arial, sans-serif",
  }}
>
  <div
    style={{
      width: "450px",
      padding: "35px",
      borderRadius: "24px",
      background: "rgba(255,255,255,0.08)",
      backdropFilter: "blur(15px)",
      border: "1px solid rgba(255,255,255,0.15)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      color: "white",
      textAlign: "center",
    }}
  >
    <h1
      style={{
        marginBottom: "10px",
        fontSize: "2.2rem",
        fontWeight: "bold",
      }}
    >
      🚀 NFT Minting DApp
    </h1>

    <p
      style={{
        color: "#cbd5e1",
        marginBottom: "25px",
      }}
    >
      Mint your NFTs directly on the blockchain
    </p>

    <button
      onClick={connectWallet}
      style={{
        width: "100%",
        padding: "14px",
        border: "none",
        borderRadius: "12px",
        background: "#8b5cf6",
        color: "white",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
        marginBottom: "20px",
      }}
    >
      🔗 Connect Wallet
    </button>

    <div
      style={{
        background: "rgba(255,255,255,0.05)",
        padding: "12px",
        borderRadius: "12px",
        marginBottom: "20px",
        wordBreak: "break-all",
      }}
    >
      <strong>Wallet:</strong>
      <br />
      {account || "Not Connected"}
    </div>

    <input
      type="text"
      placeholder="Enter Metadata URI"
      value={uri}
      onChange={(e) => setUri(e.target.value)}
      style={{
        width: "100%",
        padding: "14px",
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.2)",
        outline: "none",
        marginBottom: "20px",
        background: "rgba(255,255,255,0.08)",
        color: "white",
        fontSize: "15px",
        boxSizing: "border-box",
      }}
    />

    <button
      onClick={mintNFT}
      style={{
        width: "100%",
        padding: "14px",
        border: "none",
        borderRadius: "12px",
        background: "#06b6d4",
        color: "white",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      🎨 Mint NFT
    </button>

    <div
      style={{
        marginTop: "25px",
        padding: "15px",
        borderRadius: "12px",
        background: "rgba(255,255,255,0.05)",
      }}
    >
      <h3 style={{ margin: "0 0 10px 0" }}>
        📈 Collection Stats
      </h3>

      <p
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          color: "#22c55e",
          margin: 0,
        }}
      >
        {totalSupply}
      </p>

      <small style={{ color: "#cbd5e1" }}>
        NFTs Minted
      </small>
    </div>
  </div>
</div>);
}

export default App;