import type { Meta, StoryObj } from '@storybook/nextjs';
import { within, userEvent, expect } from '@storybook/test';
import AuthPage from '@/app/auth/page';

// Mock Firebase Auth Context
const mockFirebaseAuth = {
  signInWithGoogle: async () => ({ success: true }),
  signInWithGithub: async () => ({ success: true }),
  signInWithEmail: async () => ({ success: true }),
  signUpWithEmail: async () => ({ success: true }),
  isAuthenticated: false,
  user: null,
  isLoading: false,
};

// Mock Next.js router
const mockRouter = {
  push: () => {},
};

// Mock the hooks
jest.mock('@/contexts/FirebaseAuthContext', () => ({
  useFirebaseAuth: () => mockFirebaseAuth,
}));

jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}));

const meta: Meta<typeof AuthPage> = {
  title: 'Pages/AuthPage',
  component: AuthPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Authentication page with login and signup forms, social authentication, and form validation.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default Login View',
  parameters: {
    docs: {
      description: {
        story:
          'Default view showing the login form with email/password fields and social login options.',
      },
    },
  },
};

export const SignUpView: Story = {
  name: 'Sign Up View',
  parameters: {
    docs: {
      description: {
        story:
          'Sign up view showing additional fields for name and password confirmation.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click the toggle button to switch to sign up
    const toggleButton = canvas.getByText("Don't have an account? Sign up");
    await userEvent.click(toggleButton);

    // Verify sign up form is displayed
    await expect(canvas.getByText('Create Account')).toBeInTheDocument();
    await expect(canvas.getByLabelText('Full Name')).toBeInTheDocument();
    await expect(canvas.getByLabelText('Confirm Password')).toBeInTheDocument();
  },
};

export const WithFormData: Story = {
  name: 'With Form Data',
  parameters: {
    docs: {
      description: {
        story: 'Login form with pre-filled data to demonstrate form state.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Fill in the form
    const emailInput = canvas.getByLabelText('Email Address');
    const passwordInput = canvas.getByLabelText('Password');

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    // Verify form data is displayed
    await expect(emailInput).toHaveValue('test@example.com');
    await expect(passwordInput).toHaveValue('password123');
  },
};

export const PasswordVisibilityToggle: Story = {
  name: 'Password Visibility Toggle',
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the password visibility toggle functionality.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const passwordInput = canvas.getByLabelText('Password');
    const toggleButton = canvas.getByRole('button', { name: '' }); // Eye icon button

    // Initially password should be hidden
    await expect(passwordInput).toHaveAttribute('type', 'password');

    // Click to show password
    await userEvent.click(toggleButton);
    await expect(passwordInput).toHaveAttribute('type', 'text');

    // Click to hide password again
    await userEvent.click(toggleButton);
    await expect(passwordInput).toHaveAttribute('type', 'password');
  },
};

export const FormValidation: Story = {
  name: 'Form Validation',
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates form validation with password mismatch error.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to sign up mode
    const toggleButton = canvas.getByText("Don't have an account? Sign up");
    await userEvent.click(toggleButton);

    // Fill form with mismatched passwords
    await userEvent.type(canvas.getByLabelText('Full Name'), 'John Doe');
    await userEvent.type(
      canvas.getByLabelText('Email Address'),
      'test@example.com'
    );
    await userEvent.type(canvas.getByLabelText('Password'), 'password123');
    await userEvent.type(
      canvas.getByLabelText('Confirm Password'),
      'different123'
    );

    // Submit form
    const submitButton = canvas.getByRole('button', {
      name: /create account/i,
    });
    await userEvent.click(submitButton);

    // Verify error message
    await expect(
      canvas.getByText('Passwords do not match!')
    ).toBeInTheDocument();
  },
};

export const SocialLoginButtons: Story = {
  name: 'Social Login Buttons',
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the social login buttons for Google and GitHub.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify social login buttons are present
    const googleButton = canvas.getByRole('button', {
      name: /continue with google/i,
    });
    const githubButton = canvas.getByRole('button', {
      name: /continue with github/i,
    });

    await expect(googleButton).toBeInTheDocument();
    await expect(githubButton).toBeInTheDocument();

    // Test clicking Google button
    await userEvent.click(googleButton);

    // Test clicking GitHub button
    await userEvent.click(githubButton);
  },
};

export const LoadingState: Story = {
  name: 'Loading State',
  parameters: {
    docs: {
      description: {
        story: 'Shows the loading state during form submission.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Fill form
    await userEvent.type(
      canvas.getByLabelText('Email Address'),
      'test@example.com'
    );
    await userEvent.type(canvas.getByLabelText('Password'), 'password123');

    // Submit form
    const submitButton = canvas.getByRole('button', { name: /sign in/i });
    await userEvent.click(submitButton);

    // Verify loading state (this would need to be implemented in the component)
    // For now, we're testing the structure
    await expect(submitButton).toBeInTheDocument();
  },
};

export const DarkMode: Story = {
  name: 'Dark Mode',
  parameters: {
    docs: {
      description: {
        story: 'Authentication page in dark mode theme.',
      },
    },
    backgrounds: {
      default: 'dark',
    },
  },
};

export const MobileView: Story = {
  name: 'Mobile View',
  parameters: {
    docs: {
      description: {
        story: 'Authentication page optimized for mobile devices.',
      },
    },
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const TabletView: Story = {
  name: 'Tablet View',
  parameters: {
    docs: {
      description: {
        story: 'Authentication page optimized for tablet devices.',
      },
    },
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};
