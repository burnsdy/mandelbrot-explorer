import { Title, Text, NumberInput, Flex } from '@mantine/core';
import { IconCpu } from '@tabler/icons-react';
import { DEFAULT_MAX_ITERATIONS } from '../../../utils/constants';

interface MaxIterationsSelectorProps {
  maxIterations: number;
  setMaxIterations: React.Dispatch<React.SetStateAction<number>>;
}

const MaxIterationsSelector = ({
  maxIterations,
  setMaxIterations
}: MaxIterationsSelectorProps) => {
  const updateMaxIterations = (value: number | undefined) => {
    if (value) {
      setMaxIterations(value);
    } else {
      setMaxIterations(DEFAULT_MAX_ITERATIONS);
    }
  };

  return (
    <>
      <Title order={3} align='left'>
        Set Maximum Iterations
      </Title>
      <Text fz='sm'>
        Increasing the number of iterations effectively increases the rendering
        depth — more detail is shown but a higher computational load is placed
        on your device.
      </Text>
      <Flex justify='center'>
        <NumberInput
          icon={<IconCpu />}
          min={0}
          max={2000}
          value={maxIterations}
          onChange={updateMaxIterations}
          sx={{
            justifyContent: 'center',
            width: '120px'
          }}
        />
      </Flex>
    </>
  );
};

export default MaxIterationsSelector;
