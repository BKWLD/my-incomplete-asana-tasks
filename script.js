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
				setTimeout(() => resolve(el), 10) // Wait a tick
			}, 100)
		})
	}

	// Open menu
	(await waitFor(() => findButton('Filter'))).click();

	// Click on "Just my tasks"
	(await waitFor(() => findButton('Just my tasks'))).click();

	// Open the filter again
	(await waitFor(() => findButton('Filter'))).click();

	// Choose to add a completion status filter
	(await waitFor(() => findButton('Add filter'))).click();
	(await waitFor(() => findMenuOption('Completion'))).click();

	// Apply the default selection of "Incomplete tasks"
	(await waitFor(() => findButton('Apply'))).click();

	// Sort by priority
	(await waitFor(() => findButton('Sort'))).click();
	(await waitFor(() => findButton('Add sort'))).click();
	(await waitFor(() => findMenuOption('Task Status'))).click();
	(await waitFor(() => findButton('Apply'))).click();

})()
