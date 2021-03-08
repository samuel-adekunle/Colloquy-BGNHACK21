import Head from "next/head";
import Chat from "./chat/[secretkey]/[botName]";

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
			<div className="h-screen">
				<div className="text-8xl nav">
					<h1 className="logo">Colloquy</h1>
				</div>
				<div className="mx-auto w-min pt-24">
					<img className="splash" src='/assets/flat_background.svg'></img>
					<Chat />
					{/* <iframe style={{ margin: 0, padding: 0, border: "none", width: "400px", height: "600px" }} src="https://colloquy.vercel.app/chat/d94bf830-7f90-11eb-ad56-06298c397d52/1615154705991_bb_24" /> */}
				</div>
				
			</div>
		</>
	);
}
