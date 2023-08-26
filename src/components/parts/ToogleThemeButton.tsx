import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';

interface ToggleThemeButtonProps {
  mode: 'light' | 'dark';
  onChange: (event: React.MouseEvent<HTMLElement>, newMode: 'light' | 'dark') => void;
}

const ToggleThemeButton = ({ mode, onChange }: ToggleThemeButtonProps) => {
  return (
    <ToggleButtonGroup value={mode} exclusive onChange={onChange} aria-label='toggle light/dark theme'>
      {mode === 'dark' ? (
        <ToggleButton value='light' style={{ border: 'none' }}>
          <Brightness7Icon />
        </ToggleButton>
      ) : (
        <ToggleButton value='dark' style={{ border: 'none' }}>
          <Brightness4Icon htmlColor='white' />
        </ToggleButton>
      )}
    </ToggleButtonGroup>
  );
};

export default ToggleThemeButton;
