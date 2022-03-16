import styled from 'styled-components';
import tw from 'tailwind-styled-components';

const Container = styled.div`
  position: relative;
  &::after {
    content: '${({ after }) => after}';
    position: absolute;
    right: 2rem;
    top: 1rem;
  }
`;

const Input = tw.input`
  w-[11rem] 
  border 
  rounded-lg 
  py-4 
  pl-[1rem]
  pr-[2.5rem]
  mr-[1.5rem] 
`;

export const InputAfter = ({ after, placeholder, onChange }) => {
  return (
    <Container after={after}>
      <Input placeholder={placeholder} onChange={onChange} />
    </Container>
  );
};
