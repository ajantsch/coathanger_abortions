type ShareData = {
  title?: string;
  text?: string;
  url?: string;
};

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface Navigator {
  share?: (data?: ShareData) => Promise<void>;
}
