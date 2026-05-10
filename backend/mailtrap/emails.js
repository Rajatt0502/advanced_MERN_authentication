import nodemailer from "nodemailer";
import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

// Create transporter
const transporter = nodemailer.createTransport({
	host: "sandbox.smtp.mailtrap.io",
	port: 2525,
	auth: {
		user: process.env.MAILTRAP_USER,
		pass: process.env.MAILTRAP_PASS,
	},
});

// Send Verification Email
export const sendVerificationEmail = async (email, verificationToken) => {
	try {
		await transporter.sendMail({
			from: '"Auth App" <no-reply@test.com>',
			to: email,
			subject: "Verify your email",
			html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
		});

		console.log("Verification email sent successfully");
	} catch (error) {
		console.error("Error sending verification email:", error.message);
		throw new Error(error.message);
	}
};

// Send Welcome Email
export const sendWelcomeEmail = async (email, name) => {
	try {
		await transporter.sendMail({
			from: '"Auth App" <no-reply@test.com>',
			to: email,
			subject: "Welcome!",
			html: `<h2>Welcome ${name} 🎉</h2><p>Your account has been created successfully.</p>`,
		});

		console.log("Welcome email sent successfully");
	} catch (error) {
		console.error("Error sending welcome email:", error.message);
		throw new Error(error.message);
	}
};

// Send Password Reset Email
export const sendPasswordResetEmail = async (email, resetURL) => {
	try {
		await transporter.sendMail({
			from: '"Auth App" <no-reply@test.com>',
			to: email,
			subject: "Reset your password",
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
		});

		console.log("Password reset email sent successfully");
	} catch (error) {
		console.error("Error sending password reset email:", error.message);
		throw new Error(error.message);
	}
};

// Send Reset Success Email
export const sendResetSuccessEmail = async (email) => {
	try {
		await transporter.sendMail({
			from: '"Auth App" <no-reply@test.com>',
			to: email,
			subject: "Password Reset Successful",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
		});

		console.log("Password reset success email sent");
	} catch (error) {
		console.error("Error sending reset success email:", error.message);
		throw new Error(error.message);
	}
};