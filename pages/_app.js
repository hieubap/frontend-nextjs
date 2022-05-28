import "../src/styles/globals.css";
import "antd/dist/antd.css";
import "../src/styles/App.scss";
import {QueryClientProvider, QueryClient} from "react-query";
import {store} from "../store/store";
import {Provider} from "react-redux";
import AppWrapper from "../src/components/AppWrapper";
import {useRouter} from "next/router";
import AdminLayout from "../src/components/AdminLayout";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchInterval: false,
            retry: 0,
            onError: (e) => {
                console.trace(e);
                // if (e.status === 404) {
                // 	console.error(e.status);
                // 	window.location.href = `${window.location.origin}/page-not-found`;
                // }
            },
        },
    },
});

function MyApp({Component, pageProps}) {
    const router = useRouter();
    const isAdminPortal = router.asPath.startsWith("/admin");
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <AppWrapper >
                    {isAdminPortal ? (
                        <AdminLayout>
                            <Component {...pageProps} />
                        </AdminLayout>
                    ) : (
                        <Component {...pageProps} />
                    )}
                </AppWrapper>
            </QueryClientProvider>
        </Provider>
    );
}

export default MyApp;
