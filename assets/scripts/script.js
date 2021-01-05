// to do list
// add soil slope angle into computations
// add retaining wall key
// add water table option
// add friction angle
// add loads on structure
// surcharge line load equation branches depending on m values
// component design for reinforcements

// input choices
let includeKey = document.querySelector('#includeKey');
let keyDimension = document.querySelector('#keyDimension');
let includeWaterTable = document.querySelector('#includeWaterTable');
let waterTableChoice = document.querySelector('#waterTableChoice');
let includeFricAngle = document.querySelector('#includeFricAngle');
let soilChoice = document.querySelector('#soilChoice');
let includeStrucLoad = document.querySelector('#includeStrucLoad');
let strucLoad = document.querySelector('#strucLoad');
let includeSurchargeLoad = document.querySelector('#includeSurchargeLoad');
let surchargeLoad = document.querySelector('#surchargeLoad');
let stemConstructionMethod= document.querySelector('#stemConstructionMethod');
let stemConstructionChoice = document.querySelector('#stemConstructionChoice');

let calculateDesign = document.querySelector('#calculateDesign');
let designDisplay = document.querySelector('#designDisplay');

// assume material properties
let concreteUnitWeight = 24; // @24 kN/m3

// input parameters
let wallHeight;
let stemThickness;
let footingLength;
let toeLength;
let footingThickness;

let soilSlopeAngle;
let backSoilUnitWeight;
let distanceKey;
let keyThickness;
let keyDepth;

let waterTable;
let soilSaturatedWeight;

let soilThicknessToe;
let frontSoilUnitWeight;
let baseFrictionCoefficient;
let backSoilFricAngle;
let frontSoilFricAngle;
let fricAngleReduction;

let activePressureCoefficient;
let passivePressureCoefficient;

let stemDeadLoad;
let stemLiveLoad;

let lineLoadDL;
let distanceToLoadG;
let lineLoadLL;
let distanceToLoadQ;
let uniformLoadDL;
let uniformLoadLL;
let allowSoilCap;

let reoSpacing;
let concreteStrength;
let steelYieldStrength;
let reoCover;
let stemBarDiameter;
let heelBarDiameter;
let toeBarDiameter;

// output parameters
let totalHeight;
let heelLength;

let backSoilWeight;
let frontSoilWeight;
let stemWeight;
let footingWeight;
let keyWeight;

let fActive;
let fPassive;
let fFriction;
let fSurchargeUniformDL;
let fSurchargeUniformLL;
let fSurchargeLineG;
let fSurchargeLineQ;

let fSliding;
let fResist;
let slidingCompliance;
let slidingCheck;

let armActive;
let armGQ; //Overturning
let armUniformLoads; //Overturning
let armBackSoil;
let armFrontSoil;
let armStem;
let armFooting;
let armResistG;
let armResistDL;
let armResistQ;
let armResistLL;

let momentOverturning;
let momentResisting;
let overturningCompliance;
let overturningCheck;

let momentBearingOverturn;
let momentBearingResist;
let fVertical;
let eccentricity;
let qMax;
let qMin;
let qHeel;
let qToe;
let bearingCompliance;
let bearingCheck;

includeKey.onchange = () => {
	
	if (includeKey.value == 'YES') {
		keyDimension.innerHTML = 
			`
				<div>
					<label for = "distanceKey" class="userInput">Distance to Key, L<sub>k</sub> (mm) :</label>
					<input type = "number" id = "distanceKey">
				</div>

				<div>
					<label for = "keyThickness" class="userInput">Key Thickness, t<sub>k</sub> (mm) :</label>
					<input type = "number" id = "keyThickness">
				</div>

				<div>
					<label for = "keyDepth" class="userInput">Key Depth, d<sub>k</sub> (mm) :</label>
					<input type = "number" id = "keyDepth">
				</div>
			`
	} else {
		keyDimension.innerHTML = null;
	}
}

includeWaterTable.onchange = () => {
	if (includeWaterTable.value == 'YES') {
		waterTableChoice.innerHTML = 
			`
				<div>
					<label for = "waterTable" class="userInput">Water Table, H<sub>w</sub> (mm) :</label>
					<input type = "number" id = "waterTable">
				</div>

				<div>
					<label for = "soilSaturatedWeight" class="userInput">Soil Saturated Weight, &gamma;<sub>2,sat</sub> (kN/m<sup>3</sup>) :</label>
					<input type = "number" id = "soilSaturatedWeight">
				</div>
			`
	} else {
		waterTableChoice.innerHTML = null;
	}

}

includeFricAngle.onchange = () => {
	if (includeFricAngle.value == 'YES') {
		soilChoice.innerHTML = `
			<div>
				<label for = "backSoilFricAngle" class="userInput">Back Soil Friction Angle, &Phi;<sub>2</sub> (deg) :</label>
				<input type = "number" id = "backSoilFricAngle">
			</div>

			<div>
				<label for = "frontSoilFricAngle" class="userInput">Front Soil Friction Angle, &Phi;<sub>4</sub> (deg) :</label>
				<input type = "number" id = "frontSoilFricAngle">
			</div>

			<div>
				<label for = "fricAngleReduction" class="userInput">Friction Angle Reduction, &Phi;<sub>u, &Phi;</sub> (deg) :</label>
				<input type = "number" id = "fricAngleReduction">
			</div>
		`
	} else {
		soilChoice.innerHTML = `
		<div>
			<label for = "activePressureCoefficient" class="userInput">Active Pressure Coefficient, k<sub>a</sub> :</label>
			<input type = "number" id = "activePressureCoefficient">
		</div>

		<div>
			<label for = "passivePressureCoefficient" class="userInput">Passive Pressure Coefficient, k<sub>p</sub> :</label>
			<input type = "number" id = "passivePressureCoefficient">
		</div>
		`
	}

}

includeStrucLoad.onchange = () => {
	if (includeStrucLoad.value == 'YES') {
		strucLoad.innerHTML = `
			<div>
				<label for = "stemDeadLoad" class="userInput">Dead Load on Stem, P (kN/m) :</label>
				<input type = "number" id = "stemDeadLoad">
			</div>

			<div>
				<label for = "stemLiveLoad" class="userInput">Live Load on Stem, M (kN·m/m) :</label>
				<input type = "number" id = "stemLiveLoad">
			</div>
		`
	} else {
		strucLoad.innerHTML = null;
	}

}

includeSurchargeLoad.onchange = () => {
	if (includeSurchargeLoad.value == 'YES') {
		surchargeLoad.innerHTML = `
			<div>
				<label for = "lineLoadDL" class="userInput">Line Load DL, G (kN·m/m) :</label>
				<input type = "number" id = "lineLoadDL">
			</div>

			<div>
				<label for = "distanceToLoadG" class="userInput">Distance to Load G, x<sub>G</sub> (mm) :</label>
				<input type = "number" id = "distanceToLoadG">
			</div>

			<div>
				<label for = "lineLoadLL" class="userInput">Line Load LL, Q (kN·m/m) :</label>
				<input type = "number" id = "lineLoadLL">
			</div>

			<div>
				<label for = "distanceToLoadQ" class="userInput">Distance to Load Q, x<sub>Q</sub> (mm) :</label>
				<input type = "number" id = "distanceToLoadQ">
			</div>

			<div>
				<label for = "uniformLoadDL" class="userInput">Uniform Load DL, W<sub>sDL</sub> (kPa) :</label>
				<input type = "number" id = "uniformLoadDL">
			</div>

			<div>
				<label for = "uniformLoadLL" class="userInput">Uniform Load LL, W<sub>sLL</sub> (kPa) :</label>
				<input type = "number" id = "uniformLoadLL">
			</div>

		`
	} else {
		surchargeLoad.innerHTML = null;
	}
}

stemConstructionMethod.onchange = () => {
	if (stemConstructionMethod.value == 'GFB') {
		stemConstructionChoice.innerHTML = `
			<label for = "reoSpacing" class="userInput">Reinforcement Spacing, s (mm) :</label>
			<input type = "number" id = "reoSpacing">
		`
	} else {
		stemConstructionChoice.innerHTML = null;
	}
}

//=======================================================================

calculateDesign.onclick = () => {

	// Retrieving the user inputs
	wallHeight = Number(document.querySelector('#wallHeight').value);
	stemThickness = Number(document.querySelector('#stemThickness').value);
	footingLength = Number(document.querySelector('#footingLength').value);
	toeLength = Number(document.querySelector('#toeLength').value);
	footingThickness = Number(document.querySelector('#footingThickness').value);

	soilSlopeAngle = Number(document.querySelector('#soilSlopeAngle').value);
	backSoilUnitWeight = Number(document.querySelector('#backSoilUnitWeight').value);

	if (includeKey.value == 'YES') {
		distanceKey = Number(document.querySelector('#distanceKey').value);
		keyThickness = Number(document.querySelector('#keyThickness').value);
		keyDepth = Number(document.querySelector('#keyDepth').value);
	} else {
		distanceKey = null;
		keyThickness = null;
		keyDepth = null;
	}

	if (includeWaterTable.value == 'YES') {
		waterTable = Number(document.querySelector('#waterTable').value);
		soilSaturatedWeight = Number(document.querySelector('#soilSaturatedWeight').value);
	} else {
		waterTable = null;
		soilSaturatedWeight = null;
	}
	
	soilThicknessToe = Number(document.querySelector('#soilThicknessToe').value);
	frontSoilUnitWeight = Number(document.querySelector('#frontSoilUnitWeight').value);
	baseFrictionCoefficient = Number(document.querySelector('#baseFrictionCoefficient').value);

	if (includeFricAngle.value == 'YES') {
		backSoilFricAngle = Number(document.querySelector('#backSoilFricAngle').value);
		frontSoilFricAngle = Number(document.querySelector('#frontSoilFricAngle').value);
		fricAngleReduction = Number(document.querySelector('#fricAngleReduction').value);
		activePressureCoefficient = null;
		passivePressureCoefficient = null;
	} else if (includeFricAngle.value == 'NO') {
		backSoilFricAngle = null;
		frontSoilFricAngle = null;
		fricAngleReduction = null;
		activePressureCoefficient = Number(document.querySelector('#activePressureCoefficient').value);
		passivePressureCoefficient = Number(document.querySelector('#passivePressureCoefficient').value);
	}

	if (includeStrucLoad.value == 'YES') {
		stemDeadLoad = Number(document.querySelector('#stemDeadLoad').value);
		stemLiveLoad = Number(document.querySelector('#stemLiveLoad').value);
	} else {
		stemDeadLoad = null;
		stemLiveLoad = null;
	}

	if (includeSurchargeLoad.value == 'YES') {
		lineLoadDL = Number(document.querySelector('#lineLoadDL').value);
		distanceToLoadG = Number(document.querySelector('#distanceToLoadG').value);
		lineLoadLL = Number(document.querySelector('#lineLoadLL').value);
		distanceToLoadQ = Number(document.querySelector('#distanceToLoadQ').value);
		uniformLoadDL = Number(document.querySelector('#uniformLoadDL').value);
		uniformLoadLL = Number(document.querySelector('#uniformLoadLL').value);
	} else {
		lineLoadDL = null;
		distanceToLoadG = null;
		lineLoadLL = null;
		distanceToLoadQ = null;
		uniformLoadDL = null;
		uniformLoadLL = null;
	}

	allowSoilCap = Number(document.querySelector('#allowSoilCap').value);

	if (stemConstructionMethod.value == 'GFB') {
		reoSpacing = Number(document.querySelector('#reoSpacing').value);
	} else {
		reoSpacing = null;
	}

	concreteStrength = Number(document.querySelector('#concreteStrength').value);
	steelYieldStrength = Number(document.querySelector('#steelYieldStrength').value);
	reoCover = Number(document.querySelector('#reoCover').value);
	stemBarDiameter = Number(document.querySelector('#stemBarDiameter').value);
	heelBarDiameter = Number(document.querySelector('#heelBarDiameter').value);
	toeBarDiameter = Number(document.querySelector('#toeBarDiameter').value);

	//=======================================================================

	// Start of Computations

	// Design Values
	totalHeight = wallHeight + footingThickness;
	heelLength = footingLength - stemThickness - toeLength;

	// Soil Weight
	backSoilWeight = backSoilUnitWeight*(wallHeight/1000)*(heelLength/1000);
	frontSoilWeight = frontSoilUnitWeight*(toeLength/1000)*(soilThicknessToe/1000);

	// Retaining Wall Weight
	stemWeight = concreteUnitWeight*(wallHeight/1000)*(stemThickness/1000);
	footingWeight = concreteUnitWeight*(footingLength/1000)*(footingThickness/1000);
	keyWeight = concreteUnitWeight*(keyThickness/1000)*(keyDepth/1000);

	// Lateral Design Forces
	fActive = 0.5*backSoilUnitWeight*activePressureCoefficient*(totalHeight/1000)**2;
	
	fSurchargeUniformDL = uniformLoadDL*(totalHeight/1000)*activePressureCoefficient;
	fSurchargeUniformLL = uniformLoadLL*(totalHeight/1000)*activePressureCoefficient;
	fSurchargeLineG = 0.55*lineLoadDL;
	fSurchargeLineQ = 0.55*lineLoadLL;	

	fPassive = 0.5*frontSoilUnitWeight*passivePressureCoefficient*((footingThickness+soilThicknessToe)/1000)**2;

	fFriction = baseFrictionCoefficient*(backSoilWeight + frontSoilWeight + stemWeight + footingWeight + keyWeight + uniformLoadDL*heelLength/1000 + lineLoadDL);

	// Sliding Check
	fSliding = 1.25*(fActive + fSurchargeLineG + fSurchargeUniformDL) + 1.50*(fSurchargeLineQ + fSurchargeUniformLL);
	fResist = 0.80*(fPassive + fFriction);
	slidingCompliance = fSliding/fResist;

	if (slidingCompliance < 1) {
		slidingCheck = `<span class='text-success border border-success'> Acceptable </span>`
	} else {
		slidingCheck = `<span class='text-danger border border-danger'> Sliding resistance is insufficient </span>`
	}

	// Overturning Check about the Toe
	armActive = totalHeight/3/1000;
	armGQ = soilThicknessToe/1000 + 0.56*wallHeight/1000;
	armOverUniformLoads = totalHeight/2/1000;
	armBackSoil = footingLength/1000 - heelLength/1000/2;
	armFrontSoil = toeLength/1000/2;
	armStem = toeLength/1000 + stemThickness/1000/2;
	armFooting = footingLength/1000/2;
	armResistG = (toeLength + stemThickness + distanceToLoadG)/1000;
	armResistDL = (toeLength + stemThickness + 0.5*heelLength)/1000;

	momentOverturning = 1.25*(fActive*armActive + fSurchargeLineG*armGQ + fSurchargeUniformDL*armOverUniformLoads) + 1.50*(fSurchargeLineQ*armGQ + fSurchargeUniformLL*armOverUniformLoads);
	momentResisting = 0.80*(backSoilWeight*armBackSoil + frontSoilWeight*armFrontSoil + stemWeight*armStem + footingWeight*armFooting + lineLoadDL*armResistG + uniformLoadDL*heelLength/1000*armResistDL);
	overturningCompliance = momentOverturning/momentResisting;

	if (overturningCompliance < 1) {
		overturningCheck = `<span class='text-success border border-success'> Acceptable </span>`
	} else {
		overturningCheck = `<span class='text-danger border border-danger'> Overturning resistance is insufficient </span>`
	}

	// Bearing check
	armResistQ = (stemThickness + toeLength + distanceToLoadQ)/1000;
	armResistLL = (toeLength + stemThickness + 0.5*heelLength)/1000;

	momentBearingOverturn = 1.0*(fActive*armActive + fSurchargeLineG*armGQ + fSurchargeUniformDL*armOverUniformLoads) + 0.70*(fSurchargeLineQ*armGQ + fSurchargeUniformLL*armOverUniformLoads);
	momentBearingResist = 1.0*(backSoilWeight*armBackSoil + frontSoilWeight*armFrontSoil + stemWeight*armStem + footingWeight*armFooting + lineLoadDL*armResistG + uniformLoadDL*heelLength/1000*armResistDL) + 0.70*(lineLoadLL*armResistQ + uniformLoadLL*heelLength/1000*armResistLL);
	fVertical = 1.0*(backSoilWeight + stemWeight + footingWeight + lineLoadDL + uniformLoadDL*heelLength/1000) + 1.0*(frontSoilWeight) + 0.7*(uniformLoadLL*heelLength/1000 + lineLoadLL);
	eccentricity = footingLength/2 - (momentBearingResist - momentBearingOverturn)/fVertical*1000;
	qMax = 1000*fVertical/footingLength*(1 + 6*eccentricity/footingLength);
	qMin = 1000*fVertical/footingLength*(1 - 6*eccentricity/footingLength);
	qHeel = qMax + (qMin - qMax)*(toeLength + stemThickness)/footingLength;
	qToe = qMax + (qMin - qMax)*toeLength/footingLength;
	bearingCompliance = qMax/allowSoilCap;

	if (bearingCompliance < 1) {
		bearingCheck = `<span class='text-success border border-success'> Acceptable </span>`
	} else {
		bearingCheck = `<span class='text-danger border border-danger'> Bearing resistance is insufficient </span>`
	}

	console.log('Design Computations Completed')

//=======================================================================

	// Refactor to only shows relevant computations

	designDisplay.innerHTML = `
		<p><u>Design Values</u></p>
		<p>
			<li>Total Height = ${totalHeight.toFixed(2)} mm</li>
			<li>Heel Length = ${heelLength.toFixed(2)} mm</li>
		</p>

		<p><u>Soil Weight</u></p>
		<p>
			<li>Back Soil Weight = ${backSoilWeight.toFixed(2)} kN/m</li>
			<li>Front Soil Weight = ${frontSoilWeight.toFixed(2)} kN/m</li>
		</p>

		<p><u>Retaining Wall Weight</u></p>
		<p>
			<li>Stem Weight = ${stemWeight.toFixed(2)} kN/m</li>
			<li>Footing Weight = ${footingWeight.toFixed(2)} kN/m</li>
		</p>

		<p><u>Lateral Design Forces</u></p>
		<p>
			<li>F<sub>active</sub> = ${fActive.toFixed(2)} kN/m</li>
			<li>F<sub>uniform DL</sub> = ${fSurchargeUniformDL.toFixed(2)} kN/m</li>
			<li>F<sub>uniform LL</sub> = ${fSurchargeUniformLL.toFixed(2)} kN/m</li>
			<li>F<sub>line G</sub> = ${fSurchargeLineG.toFixed(2)} kN/m</li>
			<li>F<sub>line Q</sub> = ${fSurchargeLineQ.toFixed(2)} kN/m</li>
			<li>F<sub>passive</sub> = ${fPassive.toFixed(2)} kN/m</li>
			<li>F<sub>friction</sub> = ${fFriction.toFixed(2)} kN/m</li>
		</p>

		<p><u>Sliding Check</u></p>
		<p>
			<li>F<sub>sliding</sub> = ${fSliding.toFixed(2)} kN/m</li>
			<li>F<sub>resist</sub> = ${fResist.toFixed(2)} kN/m</li>
			<li>Sliding Compliance Factor</sub> = ${slidingCompliance.toFixed(2)} ${slidingCheck}</li>
		</p>

		<p><u>Overturning Check about the Toe</u></p>
		<p>
			<li>M<sub>overturning</sub> = ${momentOverturning.toFixed(2)} kNm/m</li>
			<li>M<sub>resist</sub> = ${momentResisting.toFixed(2)} kNm/m</li>
			<li>Overturning Compliance Factor</sub> = ${overturningCompliance.toFixed(2)} ${overturningCheck}</li>
		</p>

		<p><u>Bearing Check</u></p>
		<p>
			<li>Overturn Moment for Bearing, M<sub>BearingOverturn</sub> = ${momentBearingOverturn.toFixed(2)} kNm/m</li>
			<li>Resist Moment for Bearing, M<sub>BearingResist</sub> = ${momentBearingResist.toFixed(2)} kNm/m</li>
			<li>Vertical Resultant Force, F<sub>v</sub> = ${fVertical.toFixed(2)} kN/m</li>
			<li>Footing Force Eccentricity, e = ${eccentricity.toFixed(2)} mm</li>
			<li>Maximum Bearing Pressure, q<sub>max</sub> = ${qMax.toFixed(2)} kPa</li>
			<li>Minimum Bearing Pressure, q<sub>min</sub> = ${qMin.toFixed(2)} kPa</li>
			<li>Bearing Compliance Factor = ${bearingCompliance.toFixed(2)} ${bearingCheck}</li>
			<li>Stress at Heel Root, q<sub>heel</sub> = ${qHeel.toFixed(2)} kPa</li>
			<li>Stress at Toe Root, q<sub>toe</sub> = ${qToe.toFixed(2)} kPa</li>
		</p>

	`

}


