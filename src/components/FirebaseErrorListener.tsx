'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { useToast } from '@/hooks/use-toast';

export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    errorEmitter.on('permission-error', (error) => {
      // In development, this will trigger the Next.js error overlay
      // if it's an unhandled exception, but we also toast it.
      toast({
        variant: "destructive",
        title: "Security Rules Violation",
        description: error.message || "You don't have permission to perform this action.",
      });
      
      if (process.env.NODE_ENV === 'development') {
        console.error('Firebase Permission Error Context:', error.context);
      }
    });
  }, [toast]);

  return null;
}
