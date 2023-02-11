import { Title, Text, NumberInput, Flex } from '@mantine/core';
import { IconCpu } from '@tabler/icons-react';

interface IterationsSelectorProps {}

const IterationsSelector: React.FC<IterationsSelectorProps> = ({}) => {
    return (
        <>
            <Title order={3} align='left'>
                Set Iterations
            </Title>
            <Text fz='sm'>
                Increasing the number of iterations effectively increases the
                rendering depth — shows more detail but places a higher
                computational load on your device.
            </Text>
            <Flex justify='center'>
                <NumberInput
                    icon={<IconCpu />}
                    placeholder='Set number of iterations'
                    value={200}
                    sx={{
                        justifyContent: 'center',
                        width: '120px'
                    }}
                />
            </Flex>
        </>
    );
};

export default IterationsSelector;
