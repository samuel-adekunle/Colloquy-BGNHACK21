import Head from "next/head";

export default function Index() {
	return (
		<>
			<Head>
				<title>Home - Colloquy</title>
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/site.webmanifest"></link>
			</Head>
			<div className="h-screen bg-gradient-to-r from-blue-500 via-indigo-400 to-blue-50">
				<div className="text-8xl text-right">Colloquy</div>
			</div>
		</>
	);
}
