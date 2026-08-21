import { Helmet } from '@dr.pogodin/react-helmet';
import { type ReactElement } from 'react';
import { ScrollRestoration } from "react-router";
interface RootLayoutProps {
  children: ReactElement;
}
export default function RootLayout({
  children
}: RootLayoutProps) {
  return <>
      <Helmet>
        <title>Hello AI</title>
        <meta name="description" content="Hello AI — an interactive particle experience." />
      </Helmet>
      <ScrollRestoration />
      {children}
    </>;
}
