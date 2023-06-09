import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg`
  display: block;
  max-height: 100%;
  max-width: 100%;
`

export const Ethereum: React.FC<{ className?: string }> = (props) => (
  <Wrapper
    className={`ethereum ${props.className}`}
    fill="none"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
      fill="#627EEA"
    />
    <path
      d="M12.374 2.99854V9.65135L17.9968 12.1642L12.374 2.99854Z"
      fill="white"
      fillOpacity="0.602"
    />
    <path d="M12.374 2.99854L6.75122 12.1642L12.374 9.65135V2.99854Z" fill="white" />
    <path d="M12.374 16.4745V20.995L18 13.2104L12.374 16.4745Z" fill="white" fillOpacity="0.602" />
    <path d="M12.374 20.995V16.4745L6.75122 13.2104L12.374 20.995Z" fill="white" />
    <path
      d="M12.374 15.4283L17.9968 12.1642L12.374 9.65137V15.4283Z"
      fill="white"
      fillOpacity="0.2"
    />
    <path
      d="M6.75122 12.1642L12.374 15.4283V9.65137L6.75122 12.1642Z"
      fill="white"
      fillOpacity="0.602"
    />
  </Wrapper>
)
