import { Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

interface InfoAlertProps {
  children: React.ReactNode;
}

const InfoAlert = ({ children }: InfoAlertProps) => (
  <Alert
    icon={<IconInfoCircle size='1rem' />}
    variant='outline'
    sx={{
      backgroundColor: 'inherit',
      color: '#0047AB',
      borderColor: '#0047AB'
    }}
  >
    {children}
  </Alert>
);

export default InfoAlert;
