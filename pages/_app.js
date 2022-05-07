import "../styles/globals.css";
import "antd/dist/antd.css";
import "../styles/App.scss";
import "font-awesome/css/font-awesome.min.css";
import { QueryClientProvider, QueryClient, useQuery } from "react-query";
import { store } from "../store/store";
import { Provider } from "react-redux";
import AppWrapper from "../components/common/AppWrapper";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchInterval: false,
            retry: 0,
            onError: (e) => {
                // console.trace(e);
                // if (e.status === 404) {
                // 	console.error(e.status);
                // 	window.location.href = `${window.location.origin}/page-not-found`;
                // }
            },
        },
    },
});

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <AppWrapper queryClient={queryClient}>
                    <Component {...pageProps} />
                </AppWrapper>
            </QueryClientProvider>
        </Provider>
    );
}

export default MyApp;
