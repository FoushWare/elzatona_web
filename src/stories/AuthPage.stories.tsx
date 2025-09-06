import type { Meta, StoryObj } from '@storybook/nextjs';
import AuthPage from '@/app/auth/page';

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
