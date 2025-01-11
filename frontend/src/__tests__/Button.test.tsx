import { render, fireEvent } from '@testing-library/react'; 
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import Button from '@/components/Button';

describe('Button component', () => {
  it('renders children text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock}>Click Me</Button>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('has default type="button"', () => {
    render(<Button>Default Type</Button>);
    const buttonElement = screen.getByText('Default Type') as HTMLButtonElement;
    expect(buttonElement.type).toBe('button');
  });
});
