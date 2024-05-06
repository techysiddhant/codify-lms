import {
	Body,
	Button,
	Container,
	Font,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Preview,
	Section,
	Text,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
	userFirstname: string;
}

const baseUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "";

export const WelcomeEmail = ({ userFirstname }: WelcomeEmailProps) => (
	<Html>
		<Head />

		<Preview>
			The sales intelligence platform that helps you uncover qualified leads.
		</Preview>
		<Body style={main}>
			<Container style={container}>
				{/* <Img
					src={`${baseUrl}/static/koala-logo.png`}
					width="170"
					height="50"
					alt="Koala"
					style={logo}
				/> */}
				<Heading className="text-center my-0 leading-8">CODIFY</Heading>
				<Text style={paragraph}>Hi {userFirstname},</Text>
				<Text style={paragraph}>
					Welcome to Codify, the sales intelligence platform that helps you uncover
					qualified leads and close deals faster.
				</Text>
				<Section style={btnContainer}>
					<Button
						style={button}
						href="https://getkoala.com"
					>
						Let's Goo!
					</Button>
				</Section>
				<Text style={paragraph}>
					Best,
					<br />
					The Codify team
				</Text>
				<Hr style={hr} />
				<Text style={footer}>New Delhi, India</Text>
			</Container>
		</Body>
	</Html>
);

WelcomeEmail.PreviewProps = {
	userFirstname: "UserName",
} as WelcomeEmailProps;

export default WelcomeEmail;

const main = {
	backgroundColor: "#ffffff",
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
	margin: "0 auto",
	padding: "20px 0 48px",
};

const logo = {
	margin: "0 auto",
};

const paragraph = {
	fontSize: "16px",
	lineHeight: "26px",
};

const btnContainer = {
	textAlign: "center" as const,
};

const button = {
	backgroundColor: "#5F51E8",
	borderRadius: "3px",
	color: "#fff",
	fontSize: "16px",
	textDecoration: "none",
	textAlign: "center" as const,
	display: "block",
	padding: "12px",
};

const hr = {
	borderColor: "#cccccc",
	margin: "20px 0",
};

const footer = {
	color: "#8898aa",
	fontSize: "12px",
};
