(async function () {

	// Helper to execute xpath queries
	const findEl = xpath => {
		return document.evaluate(xpath, document, null,
			XPathResult.FIRST_ORDERED_NODE_TYPE, null)
		.singleNodeValue
	}

	// Helper to find button by text inside
	const findButton = text => {
		return findEl(`//*[@role='button'][contains(text(), '${text}')]`)
	}

	// Helper to find an element class with text inside
	const findByParent = (parentSelector, text) => {
		return findEl(`//*[contains(@class, "${parentSelector}")]
			//*[contains(text(), "${text}")]`)
	}

	// Find a menu option
	const findMenuOption = text => findByParent('ActionMenu', text)

	// Poll for the element returned by the callback to exist
	const waitFor = (findElCallback) => {
		return new Promise(resolve => {
			const clearIntervalId = setInterval(() => {
				const el = findElCallback()
				if (!el) return
				clearTimeout(clearIntervalId)
				resolve(el)
			}, 100)
		})
	}

	// Open menu, Click on "Just my tasks", and close it
	(await waitFor(() => findButton('Filter'))).click();
	(await waitFor(() => findButton('Just my tasks'))).click();
	(await waitFor(() => findButton('Filter'))).click();

	// Sort by priority
	(await waitFor(() => findButton('Sort'))).click();
	(await waitFor(() => findButton('Add sort'))).click();
	(await waitFor(() => findMenuOption('Task Status'))).click();
	(await waitFor(() => findButton('Sort'))).click();

})()
