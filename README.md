# TswanaTech-AI-Health-Coach
# FiTswana AI  

## Try FiTswana AI  
FiTswana AI is live on the Internet Computer. Experience next-level health management by visiting [here]().  

**Notes**: 
- FiTswana AI connects to Ai models from web2 using HTTPS outcalls for secure and efficient operations.  
- Optimal performance on desktop browsers (Chrome and Edge recommended).  
- Ensure minimal resource contention for an improved experience.  

---

## About FiTswana AI  

FiTswana AI is a decentralized, AI-driven health coach designed to promote proactive health management. Developed on the Internet Computer by **TswanaTech**, FiTswana AI ensures privacy, security, and seamless functionality for users.  

### Key Features  

### Key Features

- **Decentralized**: Operates directly within the browser. Users can choose if they want to log in and store their chats on the decentralized cloud and under their control.
- **Trusted**: No corporation behind, just an AI serving the user.
- **Open-source**: Built on open-source software (notably Web LLM and Internet Computer).
- **Personalized**: Users engage in meaningful conversations and ask questions, all while ensuring their privacy.

---

## Architecture  

FiTswana AI is built using modern technologies to ensure scalability, security, and performance:  

### Frontend  
- Built using **React** and **TypeScript** for a smooth, user-friendly interface.  

### Backend  
- Developed with **Motoko** for secure data handling on the Internet Computer.  

### AI Integration/ web LLM  
- The open-source project Web LLM allows us to load and interact with open-source AI models through HTTPS OUTCALLS. The selected model is loaded and cached into the browser and runs directly there, thus on the user's device. That way all interactions and data may stay local to the device. This significantly improves privacy and control over user data.

### Authentication  
- not yet implemented but proposedly **Internet Identity** for seamless and secure user login.  
---

## Internet Computer Resources  

Learn more about the Internet Computer through these resources:  
- [Quick Start Guide](https://sdk.dfinity.org/docs/quickstart/quickstart-intro.html)  
- [Motoko Language Documentation](https://sdk.dfinity.org/docs/language-guide/motoko.html)  
- [Canister Management Guide](https://sdk.dfinity.org/docs/developers-guide/canister-lifecycle.html)  

---

## Running FiTswana AI Locally  

### Prerequisites  
Ensure the following are installed:  
- [Node.js](https://nodejs.org/)  
- [DFX SDK](https://internetcomputer.org/docs/current/developer-docs/build/install/)  
- [Vessel](https://github.com/dfinity/vessel)  

### Steps  

**Install Dependencies**  
```bash
npm install
```
**Start Local Replica**
```bash
npm run dev
```
Note: this starts a local replica of the Internet Computer (IC) which includes the canisters state stored from previous sessions.
If you want to start a clean local IC replica (i.e. all canister state is erased) run instead:
*To reset local state:*
```bash
npm run erase-replica
```
**Deploy Canisters**
```bash
dfx deploy --argument "(principal \"$(dfx identity get-principal)\")" FiTswana_backend --network local
dfx deploy FiTswana_frontend --network local
```  
**Deployment to Internet Computer Mainnet**
**Development Deployment**
```bash
dfx deploy --network development --argument "(principal \"$(dfx identity get-principal)\")" FiTswana_backend  
dfx deploy FiTswana_frontend --network development
```
**Production Deployment**
```bash
npm install  
dfx start --background  
dfx deploy --network ic --argument "(principal \"$(dfx identity get-principal)\")" FiTswana_backend  
dfx deploy --network ic FiTswana_frontend  
```
Deploy to Mainnet (live IC):
Ensure that all changes needed for Mainnet deployment have been made (e.g. define HOST in store.ts)
```bash
dfx deploy --network ic --argument "( principal\"$(dfx identity get-principal)\" )" DeVinci_backend
dfx deploy --network ic DeVinci_frontend
```
In case there are authentication issues, you could try this command
(Note that only authorized identities which are set up as canister controllers may deploy the production canisters)
```bash
dfx deploy --network ic --wallet "$(dfx identity --network ic get-wallet)"
```

# Credits
Running FiTswana in your browser is enabled by the great open-source project [Web LLM](https://webllm.mlc.ai/)

Serving this app and hosting the data securely and in a decentralized way is made possible by the [Internet Computer](https://internetcomputer.org/)

## Cycles for Production Canisters
Due to the IC's reverse gas model, developers charge their canisters with cycles to pay for any used computational resources. The following can help with managing these cycles.

Fund wallet with cycles (from ICP): https://medium.com/dfinity/internet-computer-basics-part-3-funding-a-cycles-wallet-a724efebd111

Top up cycles:
```bash
dfx identity --network=ic get-wallet
dfx wallet --network ic balance
dfx canister --network ic status DeVinci_backend
dfx canister --network ic status DeVinci_frontend
dfx canister --network ic --wallet 3v5vy-2aaaa-aaaai-aapla-cai deposit-cycles 3000000000000 DeVinci_backend
dfx canister --network ic --wallet 3v5vy-2aaaa-aaaai-aapla-cai deposit-cycles 300000000000 DeVinci_frontend
```
