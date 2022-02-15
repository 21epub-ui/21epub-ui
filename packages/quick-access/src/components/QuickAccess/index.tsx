import { QueryClient, QueryClientProvider } from 'react-query'
import type { QuickAccessProps } from '../../index.types'
import QuickAccessMenu from '../QuickAccessMenu'

const queryClient = new QueryClient()

const QuickAccess: React.FC<QuickAccessProps> = ({ ...props }) => (
  <QueryClientProvider client={queryClient}>
    <QuickAccessMenu {...props} />
  </QueryClientProvider>
)

export default QuickAccess
