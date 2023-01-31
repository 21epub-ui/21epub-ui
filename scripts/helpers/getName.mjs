import { argv } from 'node:process'

const getName = () => argv.slice(2).at(0)

export default getName
