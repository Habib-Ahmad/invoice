import React, { useState, useEffect } from 'react'
import logo from '../assets/switchBox_watermark.jpeg'

const PDFParams = (items, sum) => {
	const fileName = 'invoice'

	const directory = 'Documents'

	const html = `<style>
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
					
				</style>

				<img src="file:///android_asset/images/switchBox_watermark.jpeg" alt='' />
				<img src="logo" alt='' />

				<h2 style="text-align:center">Masters Side</h2>
				<h3 style="text-align:center">WET CELL FLOODED BATTERIES (15-Months Warranty)</h3>

				<table>
					<tr>
						<th>S/N</th>
						<th>DESCRIPTION</th>
						<th>QTY</th>
						<th>RATE</th>
						<th>AMOUNT</th>
					</tr>
					${items.map(
						(item, idx) =>
							`<tr>
							<td>${idx}</td>
							<td>${item.name}</td>
							<td style="text-align:center">${item.quantity}</td>
							<td style="text-align:center">${item.rate
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
							<td style="text-align:center">${(parseInt(item.rate) * parseInt(item.quantity))
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.00</td>
						</tr>`
					)}

					<br />

					<tr>
						<td style="text-align:center" colspan="3">Grand Total</td>
						<td style="text-align:center" colspan="2">${sum
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
					</tr>
				</table>`

	return [html, fileName, directory]
}

export default PDFParams
