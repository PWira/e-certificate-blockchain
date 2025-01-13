# ECG (E-Certificate Generator)

ECG (E-Certificate Generator) adalah sistem inovatif yang menghadirkan solusi penerbitan sertifikat digital berbasis blockchain untuk institusi pendidikan. Dengan memanfaatkan teknologi blockchain Ethereum dan integrasi MetaMask, ECG memungkinkan institusi untuk menghasilkan sertifikat yang tidak dapat dimanipulasi (immutable) secara efisien dari data pelajar yang diinput. 

Sistem ini dibangun dengan kontrak pintar Solidity yang menjamin keamanan dan keaslian setiap sertifikat yang diterbitkan, sekaligus memberikan kemudahan verifikasi bagi semua pihak. ECG hadir sebagai solusi modern yang menggabungkan kebutuhan administrasi pendidikan dengan keandalan teknologi blockchain, menghadirkan standar baru dalam penerbitan dan verifikasi sertifikat digital yang dapat dipercaya.

## ✨ Features

- **Issue Certificates:** Only the admin account (who deployed the smart contract) can issue new certificates by connecting to MetaMask.
- **View Certificates:** Anyone can view issued certificates by connecting their MetaMask wallet.
- **Blockchain Storage:** All certificate details are stored on the blockchain, ensuring they are secure, immutable, and verifiable.
- **MetaMask Integration:** Connect your MetaMask wallet to interact with the DApp. Ensure you're on the correct network to interact with the deployed smart contract.

## 🚀 Getting Started

To get the Certificate DApp up and running on your local machine, follow these steps:

### Prerequisites

Ensure you have **Node.js**, **MetaMask**, and a preferred smart contract deployment tool installed.

### Smart Contract Deployment

1. **Clone the repository:**

   ```bash
   git clone https://github.com/PWira/e-certificate-blockchain.git
   cd certificate-dapp
   ```

2. **Deploy the Smart Contract:**


   ```bash
   npm install

   npm install -g truffle

   truffle init
   ```

   edit truffle-config.js file and copy the code lines below

   ```js
   networks: {
   development: {
         host: "127.0.0.1", // Your Own Private Blockchain or Public Blockchain network
         port: 7545,  // Check if this matches your port
         network_id: "5777", // Match your  network ID
         gas: 6721975,
         gasPrice: 20000000000
      }
   }
   ```

   ```js
   compilers: {
      solc: {
         version: "0.8.20",      // Fetch exact version from solc-bin (default: truffle's version)
         // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
         settings: {          // See the solidity docs for advice about optimization and evmVersion
         optimizer: {
            enabled: true,
            runs: 200
         },
         evmVersion: "london"
         }
      }
   },
   ```
   **Connect MetaMask:**

   - install metamask extension
   - connect metamask with ECG

   ```bash
   truffle compile --all
   ```

   copy "abi" [] code lines from build/Cert.json or artifact/Cert.json and paste it in src/scdata/Cert.json

   ```bash
   truffle migrate --reset --network development
   ```

   find the lines in terminal after execute the prompt above.

   ```bash
   2_deploy_cert.js
   ================

      Deploying 'Cert'
      ----------------
      > transaction hash:    0x706a075dc477a85dd4290aad8e4600e733982968238c038d6fc92f64743c92ca
      > Blocks: 0            Seconds: 0
      > contract address:    <!-- COPY THIS CONTRACT ADDRESS AND PASTE IN deployed_addresses.js -->
      > block number:        3
      > block timestamp:     1736415079
      > account:             0xCb6C33876360135099f8DEa00b633E72365468fd
      > balance:             99.98516192
      > gas used:            594793 (0x91369)
      > gas price:           20 gwei
      > value sent:          0 ETH
      > total cost:          0.01189586 ETH

      > Saving migration to chain.
   ```

      npm run dev

      open localhost:3000

      If you're need to become admin, change all wallet address in src/components/Navbar.jsx to your chosen admin wallet address

6. **Done!** Now you can issue certificate (if you're an admin) or check if the certificate exist by typing the Certificate ID (without metamask required).

## 🔗 Connecting to MetaMask

- Before issuing or viewing certificates, make sure to connect your MetaMask wallet.
- Only the **admin account** (the account that deployed the smart contract) can issue certificates.
- Any connected user can view the issued certificates.

## 📜 Smart Contract Details

- **Technology Used:** React, Solidity
- **Smart Contract Deployment:** Can be deployed using **Hardhat**, **Truffle**, **Remix**, or any preferred application.
- **Smart Contract ABI and Address:** 
  - ABI: Stored in `src/scdata/Cert.json`.
  - Address: Stored in `src/scdata/deployed_addresses.json`.

## 👤 Admin Access

- The account that deploys the smart contract becomes the **admin**. This account has exclusive rights to issue certificates.
- Ensure that your MetaMask wallet is connected to the admin account to access the certificate issuance page.

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Blockchain:** Ethereum
- **Smart Contract Language:** Solidity
- **Wallet Integration:** MetaMask

## 📝 Usage

1. **Issue Certificate:**
   - Navigate to the "Issue Certificate" page.
   - Ensure you're connected to MetaMask as the admin.
   - Fill in the certificate details and click "Issue".

2. **View Certificate:**
   - Navigate to the "View Certificate" page.
   - Connect to MetaMask with any account.
   - Enter the certificate ID to view its details on the blockchain.

## 📜 License

This project is licensed under the MIT License.
