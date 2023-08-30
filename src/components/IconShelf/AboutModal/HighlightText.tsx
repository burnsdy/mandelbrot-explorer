import { Highlight } from '@mantine/core';

interface HighlightTextProps {
  children: string;
}

const HighlightText = ({ children }: HighlightTextProps) => {
  return (
    <Highlight
      highlight={children}
      highlightStyles={{
        backgroundColor: 'rgba(132, 94, 247, 0.2)',
        color: 'inherit'
      }}
    >
      {children}
    </Highlight>
  );
};

export default HighlightText;
