const DappToken = artifacts.require('DappToken')
const DaiToken = artifacts.require('DaiToken')
const TokenFarm = artifacts.require('TokenFarm')

require('chai')
  .use(require('chai-as-promised'))
  .should()

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}
contract('TokenFarm', (accounts) => {

  let daiToken, dappToken, tokenFarm

  before(async () => {
    // Load contracts
    daiToken = await DaiToken.new()
    dappToken = await DappToken.new()
    tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address)

    // transfer all Dapp tokens to Farm
    await dappToken.transfer(tokenFarm.address, tokens('1000000'))

    // send tokens to investor
    await daiToken.transfer(investor, token('100'), { from: owner})
  })

  // Write tests here..
  describe('Mock DAI deployment', async () =>{
    it('has a name', async () =>{
      const name = await daiToken.name()
      assert.equal(name, 'Mock DAI Token')
    })
  })

})
