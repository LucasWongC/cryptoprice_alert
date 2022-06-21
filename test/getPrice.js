const { expect } = require('chai')

const { checkStatus } = require('../getPrice.js')

describe('Get Price Test', function () {
  it('Test checkStatus', async function () {
    const caseStay = checkStatus(18345.12, 18346.95, 0.01)

    const caseUp = checkStatus(18345.12, 18346.97, 0.01)

    const caseDown = checkStatus(18345.12, 18343.28, 0.01)

    expect(caseStay).to.equal(0)

    expect(caseUp).to.equal(1)

    expect(caseDown).to.equal(-1)
  })
})
