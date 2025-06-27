import { useCallback } from 'react';

type ToastVariant = 'default' | 'destructive' | 'success';

interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

// Create a toast event
function createToastEvent(options: ToastOptions) {
  return new CustomEvent('show-toast', {
    detail: {
      title: options.title,
      description: options.description,
      variant: options.variant || 'default',
      duration: options.duration || 3000,
    },
  });
}

// Main toast function
export function toast(options: ToastOptions) {
  // Dispatch the custom event
  const event = createToastEvent(options);
  window.dispatchEvent(event);
}

// Success toast helper
toast.success = (title: string, description?: string, duration?: number) => {
  toast({ title, description, variant: 'success', duration });
};

// Error toast helper
toast.error = (title: string, description?: string, duration?: number) => {
  toast({ title, description, variant: 'destructive', duration });
};

// Hook version
export function useToast() {
  const showToast = useCallback((options: ToastOptions) => {
    toast(options);
  }, []);

  return {
    toast: showToast,
    success: (title: string, description?: string, duration?: number) =>
      showToast({ title, description, variant: 'success', duration }),
    error: (title: string, description?: string, duration?: number) =>
      showToast({ title, description, variant: 'destructive', duration }),
  };
}
