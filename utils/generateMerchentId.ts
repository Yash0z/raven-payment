/**
 * Generates a merchant ID from an email address
 * Takes the username part of the email, adds "ok" prefix and 3 random digits
 *
 * @param email - The email address to convert (e.g., "abc@gmail.com")
 * @returns The generated merchant ID (e.g., "abc@ok123")
 */
export function generateMerchantId(email: string): string {
	// Extract the username part (before the @ symbol)
	const username = email.split("@")[0];

	// Generate 3 random digits
	const randomDigits = Math.floor(Math.random() * 900 + 100).toString();

	// Combine username with "@ok" prefix and random digits
	const merchantId = `${username}@ok${randomDigits}`;

	return merchantId;
}

// Example usage:
// const email = "yash@gmail.com";
// const merchantId = generateMerchantId(email);
// console.log(merchantId); // Output: "yash@ok123" (with random digits)
