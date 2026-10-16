export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <style>{`
          html, body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
        `}</style>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}