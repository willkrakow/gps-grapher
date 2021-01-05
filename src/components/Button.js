import styled from 'styled-components'


export const FancyButton = styled.button.attrs(props => ({
    className: "btn-outline btn-outline"
}))`
`

export const UploadButton = styled.button.attrs((props) => ({
  className: "btn btn-outline btn-success text-light",
}))`
  border: none;
  background-image: linear-gradient(
    to bottom right,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.3) 100%
  );
  border-radius: 20px 80px 20px 80px;
  padding: 8px 24px;
  transition: all 0.4s ease-out;
  font-weight: bold;
  &:hover {
    background-image: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.2) 100%
    );
    box-shadow: 0px 4px 8px rgba(0, 20, 50, 0.6);
    transform: translateY(-1px);
  }
`;


export const BrowseLabel = styled.label.attrs((props) => ({
  className: "bg-primary text-light",
}))`
  border: none;
  background-image: linear-gradient(
    to bottom right,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.3) 100%
  );
  border-radius: 20px 80px 20px 80px;
  padding: 8px 24px;
  transition: all 0.4s ease-out;
  font-weight: bold;
  &:hover {
    background-image: linear-gradient(
      to bottom right,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.2) 100%
    );
    box-shadow: 0px 4px 4px rgba(0, 20, 50, 0.9);
    transform: translateY(-1px);
  }
`;

