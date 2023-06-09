import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg`
  display: block;
  max-height: 100%;
  max-width: 100%;
`

export const Polygon: React.FC<{ className?: string }> = (props) => (
  <Wrapper
    className={`polygon ${props.className}`}
    fill="none"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.995 0C18.625 0 24 5.373 24 12.002 24 18.632 18.626 24 12 24 5.37 24 0 18.627 0 12.002-.005 5.373 5.37 0 11.995 0z"
      fill="#8247E5"
    />
    <mask
      height="14"
      id="mask0_11_2"
      maskUnits="userSpaceOnUse"
      style={{ maskType: 'luminance' }}
      width="16"
      x="4"
      y="5"
    >
      <path d="M19.778 5.189H4.048v13.782h15.73V5.19z" fill="#fff" />
    </mask>
    <g mask="url(#mask0_11_2)">
      <path
        d="M15.93 9.387c-.289-.166-.657-.166-.983 0l-2.295 1.36-1.559.864-2.252 1.355c-.288.165-.657.165-.983 0l-1.761-1.072a1.004 1.004 0 01-.491-.864V8.97c0-.33.165-.656.49-.864l1.762-1.03c.288-.164.657-.164.983 0l1.761 1.073c.288.165.491.495.491.864v1.36l1.559-.907V8.069c0-.33-.165-.656-.491-.864L8.883 5.27c-.288-.165-.656-.165-.982 0L4.543 7.248a.911.911 0 00-.491.821v3.867c0 .33.165.657.491.864l3.32 1.936c.288.166.657.166.982 0l2.253-1.317 1.558-.907 2.253-1.317c.288-.165.657-.165.982 0l1.762 1.03c.288.165.491.495.491.864v2.058c0 .33-.165.656-.491.864l-1.72 1.03c-.287.165-.655.165-.981 0l-1.767-1.03a1.004 1.004 0 01-.49-.864V13.83l-1.56.906v1.36c0 .33.166.656.492.864l3.32 1.936c.288.165.656.165.982 0l3.32-1.936c.288-.165.491-.496.491-.864v-3.91c0-.33-.165-.656-.49-.863l-3.32-1.936z"
        fill="#fff"
      />
    </g>
  </Wrapper>
)