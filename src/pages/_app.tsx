import { wrapper } from "@/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from 'react-redux';

function App({ Component, ...reset }: AppProps) {
    const {store, props} = wrapper.useWrappedStore(reset);

  return  <Provider store={store}>
    <Component {...props.pageProps} />
  </Provider>
}

export default wrapper.withRedux(App);