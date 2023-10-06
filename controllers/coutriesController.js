const countries = require("../assets/countries.json");

class countriesController {
	/**
	 * Get an array of country names and their corresponding calling codes.
	 */
	async getCountriesAndCodes(req, res) {
		const countryNamesCodes = countries.map((country) => ({
			name: country.name,
			callingCode: country.callingCodes[0],
		}));

		res.json(countryNamesCodes);
	}

	/**
	 * Get the list of all countries.
	 */
	async getCountries(req, res) {
		res.json(countries);
	}

	/**
	 * Get information about a specific country using its alpha3Code.
	 */
	async getCountrieByAlp3code(req, res) {
		const alpha3Code = req.params.alpha3Code;
		const country = countries.find(
			(country) => country.alpha3Code === alpha3Code
		);

		if (country) {
			res.json(country);
		} else {
			res.status(404).json({ message: "Ciudad no encontrada" });
		}
	}

	/**
	 * Search for countries by name.
	 */
	async getCountrieByName(req, res) {
		const searchTerm = req.params.searchTerm.toLowerCase();
		const matchingCountries = countries.filter((country) =>
			country.name.toLowerCase().includes(searchTerm)
		);

		res.json(matchingCountries);
	}

	/**
	 * Get a list of countries within a specific region.
	 */
	async getCountriesByRegion(req, res) {
		const regionName = req.params.regionName;
		const countriesInRegion = countries.filter(
			(country) =>
				country.region.toLowerCase() === regionName.toLowerCase()
		);

		res.json(countriesInRegion);
	}

	/**
	 * Get a summary of information about a specific country using its alpha3Code.
	 */
	async getSumaryByAlp3code(req, res) {
		const alpha3Code = req.params.alpha3Code;
		const country = countries.find(
			(country) => country.alpha3Code === alpha3Code
		);

		if (country) {
			const countrySummary = {
				name: country.name,
				capital: country.capital,
				region: country.region,
			};
			res.json(countrySummary);
		} else {
			res.status(404).json({ message: "Ciudad no encontrada" });
		}
	}
}
module.exports = countriesController;
