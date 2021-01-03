import styled from 'styled-components'

export const TagHeader = styled.h2.attrs((props) => ({
  className: `shadow text-light bg-${props.color}`,
}))`
  margin-left: -3em;
  width: fit-content;
  padding: 0.25em 1.5em;
  font-size: 1.75em;
  margin-top: -0.5em;
  border-radius: 20px 80px 20px 80px;
  @media(max-width: 575px) {
      margin-left: -2.5em;
  }
`;

export const TagTitle = styled.h1.attrs(props => ({
    className:"shadow bg-dark"
}))`
  width: fit-content;
  padding: 0.25em 1.5em;
  font-size: 3em;
  margin-left: -1em;
  border-radius: 20px 80px 20px 80px;
  @media(max-width: 575px) {
      margin-left: 0;
      padding: 0.25em 1em;
  }
`

export const InfoText = styled.p.attrs(props => ({
    className: "text-light text-start text-md-right float-left float-md-right"
}))`
    font-weight: 500;
    font-size: 1.5em;
    line-height: 1.5em;
    display: block;
    width: 100%;
    @media(max-width: 575px) {
        margin-left: -1em;
    }
`