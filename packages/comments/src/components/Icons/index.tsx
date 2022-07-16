import type { ChakraProps } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'

export const ImageIcon: React.FC<ChakraProps> = ({ ...props }) => (
  <Box
    as="svg"
    width="1.5em"
    height="1.5em"
    lineHeight="1.5em"
    fill="none"
    viewBox="0 0 24 24"
    focusable="false"
    aria-hidden="true"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeWidth="1.5"
      d="M21.21 7.89918V16.0502C21.21 19.0702 19.32 21.2002 16.3 21.2002H7.65C4.63 21.2002 2.75 19.0702 2.75 16.0502V7.89918C2.75 4.87918 4.64 2.75018 7.65 2.75018H16.3C19.32 2.75018 21.21 4.87918 21.21 7.89918Z"
    />
    <path
      stroke="currentColor"
      strokeWidth="1.5"
      d="M5.28131 16.4309L6.80931 14.8179C7.34031 14.2549 8.22531 14.2279 8.78931 14.7579C8.80631 14.7749 9.72631 15.7099 9.72631 15.7099C10.2813 16.2749 11.1883 16.2839 11.7533 15.7299C11.7903 15.6939 14.0873 12.9079 14.0873 12.9079C14.6793 12.1889 15.7423 12.0859 16.4623 12.6789C16.5103 12.7189 18.6803 14.9459 18.6803 14.9459"
    />
    <path
      stroke="currentColor"
      strokeWidth="1.5"
      d="M10.3126 9.13309C10.3126 10.1021 9.52763 10.8871 8.55863 10.8871C7.58963 10.8871 6.80463 10.1021 6.80463 9.13309C6.80463 8.16409 7.58963 7.37909 8.55863 7.37909C9.52763 7.38009 10.3126 8.16409 10.3126 9.13309Z"
    />
  </Box>
)