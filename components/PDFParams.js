const PDFParams = (items, sum, name, title, title2) => {
	const fileName = name

	const directory = 'Documents'

	const html = page(items, sum, title, title2)

	return [html, fileName, directory]
}

export default PDFParams

const page = (array, sum, title, title2) => {
	const ans = array.length / 3

	// Get the number of arrays, if its a decimal, remove all numbers after the decimal
	const numOfArrays = ans <= 1 ? 1 : ans % 1 === 0 ? ~~ans : ~~ans + 1

	const newArray = []

	for (let i = 0; i < numOfArrays; i++) {
		newArray[i] = array.splice(0, 3)
	}

	return `<style>
		table {
			font-family: arial, sans-serif;
			border-collapse: collapse;
			width: 100%;
		}

		td, th {
			border: 1px solid #dddddd;
			text-align: left;
			padding: 8px;
		}

		div .footer {
			width: 800px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: absolute;
			bottom: 1%;
		}

		.watermark {
			position: absolute;
			margin-left: auto;
			margin-right: auto;
			margin-top: auto;
			margin-bottom: auto;
			width: 500px;
			height: 500px;
			left: 0; 
			right: 0;
			top: 0;
			bottom: 0;
			z-index: -100;
			opacity: 0.06;
		}

		@media print {
			.pageBreak { 
				page-break-before: always !important;
			}
		}
		
	</style>

	<div style="position:relative;height:1050px">
		<div style="display:grid;place-items:center;">
			<img
				src="https://firebasestorage.googleapis.com/v0/b/invoice-app-e6e67.appspot.com/o/switchbox-logo.jpeg?alt=media&token=2630a169-2249-4544-be6b-f398ae8abd2f"
				alt=''
				style="width:100px;object-fit:contain;border:0px;" 
			/>	
		</div>
		
		<h2 style="text-align:center">${title}</h2>
		${title2 ? `<h3 style='text-align:center'>${title2}</h3>` : ``}

		<table>
			<tr>
				<th>S/N</th>
				<th>DESCRIPTION</th>
				<th>QTY</th>
				<th>RATE</th>
				<th>AMOUNT</th>
			</tr>

			${newArray
				.map((array, arrayIdx) => {
					if (arrayIdx + 1 === numOfArrays) {
						return `${array
							.map(
								(item, idx) =>
									`<tr>
									<td>${idx + 1 + 3 * arrayIdx}</td>
									<td>${item.name}</td>
									<td style="text-align:center">
										${item.quantity}
									</td>
									<td style="text-align:center">
										${item.rate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
									</td>
									<td style="text-align:center">
										${(parseInt(item.rate) * parseInt(item.quantity))
											.toString()
											.replace(
												/\B(?=(\d{3})+(?!\d))/g,
												','
											)}
										.00
									</td>
								</tr>`
							)
							.join('')}
						<tr>
							<td style="text-align:center" colspan="3">Grand Total</td>
							<td style="text-align:center" colspan="2">${sum
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							</td>
						</tr>
								
						</table>
						
						<div class="watermark">
							<img
								src="https://firebasestorage.googleapis.com/v0/b/invoice-app-e6e67.appspot.com/o/switchbox-watermark.jpeg?alt=media&token=d0d35ac7-9a23-4a57-b8f3-0d3f3df6adf8"
								alt=''
								style="width:100%;"
							/>
						</div>
						
						<div class="footer">
							<img
								src="https://firebasestorage.googleapis.com/v0/b/invoice-app-e6e67.appspot.com/o/switchbox-footer.PNG?alt=media&token=cc7657de-dc57-4dd4-acdf-3a08cbb45175"
								alt=''
								style="object-fit:contain;border:0;" 
							/>
							<div style="font-weight:bold;">${numOfArrays}</div>
						</div>
					</div>`
					} else {
						return `${array
							.map(
								(item, idx) =>
									`<tr style="margin-top:30px;">
								<td>${idx + 1 + 3 * arrayIdx}</td>
								<td>${item.name}</td>
								<td style="text-align:center">
									${item.quantity}
								</td>
								<td style="text-align:center">
									${item.rate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								</td>
								<td style="text-align:center">
									${(parseInt(item.rate) * parseInt(item.quantity))
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
									.00
								</td>
							</tr>`
							)
							.join('')}

						</table>

						<div class="watermark">
							<img
								src="https://firebasestorage.googleapis.com/v0/b/invoice-app-e6e67.appspot.com/o/switchbox-watermark.jpeg?alt=media&token=d0d35ac7-9a23-4a57-b8f3-0d3f3df6adf8"
								alt=''
								style="width:100%;"
							/>
						</div>
						
						<div class="footer">
							<img
								src="https://firebasestorage.googleapis.com/v0/b/invoice-app-e6e67.appspot.com/o/switchbox-footer.PNG?alt=media&token=cc7657de-dc57-4dd4-acdf-3a08cbb45175"
								alt=''
								style="object-fit:contain;border:0;" 
							/>
							<div style="font-weight:bold;">${arrayIdx + 1}</div>
						</div>
					</div>
						
						<div class="pageBreak"></div>

						<div style="position:relative;height:1050px">
						
						<table>`
					}
				})
				.join('')}`
}
