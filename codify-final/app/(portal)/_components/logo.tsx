import Image from "next/image";
// import { Pacifico } from "next/font/google";
// const pacifico = Pacifico({ subsets: ["cyrillic"], weight: ["400"] });

export const Logo = () => {
	return (
		<Image
			height={100}
			width={100}
			alt="codify-logo"
			src="/codify.svg"
		/>
	);
};
