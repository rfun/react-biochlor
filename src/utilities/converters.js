const getSeepageVel = (hydGrad, hydCond, porosity) => {
	// Ensure it gets turned into a float
	return (hydCond * hydGrad * 1.0) / porosity
}

export { getSeepageVel }
