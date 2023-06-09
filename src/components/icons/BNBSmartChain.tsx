import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg`
  display: block;
  max-height: 100%;
  max-width: 100%;
`

export const BNBSmartChain: React.FC<{ className?: string }> = (props) => (
  <Wrapper
    className={`BNBSmartChain ${props.className}`}
    fill="none"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      clipRule="evenodd"
      d="M12 0c6.628 0 12 5.372 12 12s-5.372 12-12 12S0 18.628 0 12 5.372 0 12 0z"
      fill="#F0B90B"
      fillRule="evenodd"
    />
    <path
      d="M6.595 12l.009 3.173L9.3 16.76v1.857l-4.274-2.506v-5.039l1.57.928zm0-3.173v1.849l-1.57-.929V7.898l1.57-.929 1.578.93-1.578.928zm3.83-.929l1.571-.929 1.578.93-1.578.928-1.57-.929z"
      fill="#fff"
    />
    <path
      d="M7.73 14.515v-1.857l1.57.928v1.85l-1.57-.92zm2.696 2.91l1.57.929 1.578-.929v1.849l-1.578.929-1.57-.929v-1.849zm5.4-9.527l1.57-.929 1.578.93v1.848l-1.578.929v-1.85l-1.57-.928zm1.57 7.275L17.405 12l1.57-.929v5.039L14.7 18.616V16.76l2.695-1.586z"
      fill="#fff"
    />
    <path d="M16.27 14.515l-1.57.92v-1.848l1.57-.93v1.858z" fill="#fff" />
    <path
      d="M16.27 9.485l.009 1.857-2.704 1.587v3.18l-1.57.92-1.57-.92v-3.18L7.73 11.342V9.485l1.577-.93 2.687 1.595L14.7 8.556l1.578.929h-.007zM7.73 6.313l4.266-2.516 4.274 2.515-1.57.93-2.704-1.595L9.3 7.241l-1.57-.928z"
      fill="#fff"
    />
  </Wrapper>
)
