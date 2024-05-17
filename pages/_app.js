import "@mantine/core/styles.css";
import '@mantine/notifications/styles.css';
import "@/styles/globals.css";
import { SWRConfig } from "swr";
import { MantineProvider } from "@mantine/core";
import { theme } from "theme";
import { Notifications } from "@mantine/notifications";

export default function App({ Component, pageProps: {...pageProps} }) {
  const { session } = pageProps;

  return (
    <SWRConfig
        value={{
          fetcher: (...args) => fetch(...args).then((res) => res.json()),
        }}
      >
    <MantineProvider theme={theme} >
      <Notifications />
      <Component {...pageProps} />
    </MantineProvider>
    </SWRConfig>
  );
}

