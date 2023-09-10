import '../../styles/global.css'; // assuming you have a global.css for global styles in the root styles directory

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
