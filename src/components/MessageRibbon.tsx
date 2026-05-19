import { AlertCircle, XCircle, AlertTriangle, X } from 'lucide-react';
import { Button } from './ui/button';

export type MessageType = 'error' | 'warning' | 'info';

export interface Message {
  id: string;
  type: MessageType;
  text: string;
}

interface MessageRibbonProps {
  messages: Message[];
  onDismiss: (id: string) => void;
}

export function MessageRibbon({ messages, onDismiss }: MessageRibbonProps) {
  if (messages.length === 0) return null;

  const getMessageStyles = (type: MessageType) => {
    switch (type) {
      case 'error':
        return {
          bg: 'bg-red-50 border-red-200',
          text: 'text-red-900',
          icon: <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />,
        };
      case 'warning':
        return {
          bg: 'bg-amber-50 border-amber-200',
          text: 'text-amber-900',
          icon: <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />,
        };
      case 'info':
        return {
          bg: 'bg-blue-50 border-blue-200',
          text: 'text-blue-900',
          icon: <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />,
        };
    }
  };

  return (
    <div className="w-full space-y-2">
      {messages.map((message) => {
        const styles = getMessageStyles(message.type);
        return (
          <div
            key={message.id}
            className={`flex items-center justify-between gap-3 px-4 py-3 border rounded-lg ${styles.bg}`}
          >
            <div className="flex items-center gap-3 flex-1">
              {styles.icon}
              <span className={styles.text}>{message.text}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDismiss(message.id)}
              className="h-6 w-6 p-0 hover:bg-transparent"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        );
      })}
    </div>
  );
}
