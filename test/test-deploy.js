const { expect, assert } = require("chai")
const { ethers } = require("hardhat")
describe("SimpleStorage", function () {
  let simpleStorage, SimpleStorageFactory
  const expectedDetails = {
    name: "Habeeb",
    favoriteNumber: 25,
  }
  beforeEach(async function () {
    SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    simpleStorage = await SimpleStorageFactory.deploy()
  })
  it("Should start with a favorite number of 0", async () => {
    const expectedValue = "0"
    const currentValue = await simpleStorage.retrieve()
    assert.equal(currentValue.toString(), expectedValue)
  })
  it("Should store 89 after calling store function", async () => {
    const expectedValue = "89"
    const txResponse = await simpleStorage.store(expectedValue)
    await txResponse.wait(1)
    const newValue = await simpleStorage.retrieve()
    expect(newValue.toString()).to.equal(expectedValue)
  })
  // it("newPerson should be of type People, line 29", async () => {

  // })
  it("People array should have the new Person at the last index", async () => {
    const txRes = await simpleStorage.addPerson(
      expectedDetails.name,
      expectedDetails.favoriteNumber
    )
    await txRes.wait(1)
    const res = await simpleStorage.people(0)
    // console.log(res.name)
    assert.equal(res.name, expectedDetails.name)
    assert.equal(await res.favoriteNumber, expectedDetails.favoriteNumber)
  })
  it("New favorite number should be mapped to it's corresponding name", async () => {
    const txRes = await simpleStorage.addPerson(
      expectedDetails.name,
      expectedDetails.favoriteNumber
    )
    await txRes.wait(1)
    const mappedValue = await simpleStorage.mappedName(expectedDetails.name)
    // console.log(await simpleStorage.peopleSize())
    assert.equal(
      mappedValue.toString(),
      expectedDetails.favoriteNumber.toString()
    )
  })
  it("Function returnPeople should return an array of People objects", async () => {
    const returnedValue = await simpleStorage.returnPeople()
    assert.typeOf(returnedValue, "array")
  })
})
