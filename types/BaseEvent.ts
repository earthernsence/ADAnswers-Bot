export interface BaseEvent {
  name: string;
  once?: boolean;
  execute: () => void | Promise<void>;
}
