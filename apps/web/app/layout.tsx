import './global.css';
import type { Metadata } from 'next';
import { App, ConfigProvider } from '@xsky/eris-ui';
import Image from 'next/image';
import SiteHeader from '../components/SiteHeader';
import xSpinner from '../public/x_spinner.gif';
import CommandPalette from '../components/CommandPalette/CommandPalette';

export const metadata: Metadata = {
  title: 'Eris UI',
  description: 'XSKY 通用设计系统 ',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html id="__next" lang="en">
      <body className="dark:bg-base-black bg-white">
        <SiteHeader />
        <CommandPalette />
        <App>
          <ConfigProvider
            spinnerIndicator={{
              default: {
                md: <Image alt="spinner" height={32} src={xSpinner} width={32} />,
              },
            }}
          >
            <div className="flex justify-center">{children}</div>
          </ConfigProvider>
        </App>
      </body>
    </html>
  );
}
