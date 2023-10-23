/* eslint-disable @next/next/no-sync-scripts */
import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => (
  <Html translate="no">
    <Head>
    <link rel="icon" type="image/png" href="/my-talk-builder/favicon.png" />
      <meta name="google" content="notranslate" />
      <script src="/__env.js" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
