import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg`
  display: block;
  max-height: 100%;
  max-width: 100%;
`

export const Goerli: React.FC<{ className?: string }> = (props) => (
  <Wrapper
    className={`goerli ${props.className}`}
    fill="none"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z"
      fill="#627EEA"
    />
    <path d="M12.374 2.999V9.65l5.623 2.513L12.374 3z" fill="#fff" fillOpacity="0.602" />
    <path d="M12.374 2.999l-5.623 9.165 5.623-2.513V3z" fill="#fff" />
    <path d="M12.374 16.474v4.521L18 13.21l-5.626 3.264z" fill="#fff" fillOpacity="0.602" />
    <path d="M12.374 20.995v-4.52L6.751 13.21l5.623 7.785z" fill="#fff" />
    <path d="M12.374 15.428l5.623-3.264-5.623-2.513v5.777z" fill="#fff" fillOpacity="0.2" />
    <path d="M6.751 12.164l5.623 3.264V9.651l-5.623 2.513z" fill="#fff" fillOpacity="0.602" />
    <circle cx="20.5" cy="3.5" fill="#E8663D" r="3.5" />
  </Wrapper>
)
