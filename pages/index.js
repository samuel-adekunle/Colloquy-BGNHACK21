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
				<div className="mx-auto w-min pt-24">
					<iframe style={{ margin: 0, padding: 0, border: "none", width: "400px", height: "600px" }} src="http://localhost:3001/chat/d94bf830-7f90-11eb-ad56-06298c397d52/1615154705991_bb_24" />
				</div>
			</div>
		</>
	);
}
