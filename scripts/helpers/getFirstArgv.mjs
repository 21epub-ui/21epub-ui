import { argv } from 'node:process'
import { hideBin } from 'yargs/helpers'

const getFirstArgv = () => hideBin(argv)[0]

export default getFirstArgv
