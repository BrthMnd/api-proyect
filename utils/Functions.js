/** @format */
let axios = require("axios");

async function translateString(inputString) {
	const sourceLanguage = "en";
	const targetLanguage = "es";

	try {
		const response = await axios.get(
			`https://api.mymemory.translated.net/get?q=${encodeURIComponent(
				inputString
			)}&langpair=${sourceLanguage}|${targetLanguage}`
		);

		const translatedText =
			response.data.responseData.translatedText || inputString;
		return translatedText;
	} catch (error) {
		console.error("Error translating:", error);
		return inputString;
	}
}

function formatPhoneNumber(phoneNumber) {
	let formattedNumber = phoneNumber.replace(/\D/g, "");
	formattedNumber += "@c.us";
	return formattedNumber;
}

module.exports = { translateString, formatPhoneNumber };
