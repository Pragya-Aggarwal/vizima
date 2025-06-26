import { useCallback } from 'react';

type ToastVariant = 'default' | 'destructive' | 'success';

interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

export function toast({ title, description, variant = 'default', duration = 3000 }: ToastOptions) {
  // In a real implementation, you might want to use a toast library like react-hot-toast or sonner
  // This is a simplified version that logs to the console

  
  // In a real implementation, you would dispatch a custom event or use a state management library
  // to show the toast in your UI
  const event = new CustomEvent('show-toast', {
    detail: { title, description, variant, duration }
  });
  window.dispatchEvent(event);
}

export function useToast() {
  const showToast = useCallback((options: ToastOptions) => {
    toast(options);
  }, []);

  return { toast: showToast };
}
