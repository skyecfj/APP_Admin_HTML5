// $(function() {
// 	$('#export').click(function() {
// 		var pdf = new jsPDF('p', 'pt', 'a4');
// 		var options = {
// 			pagesplit : true
// 		};
// 		var clenth = document.getElementById('exportcontaner')[1];

// 		pdf.setFillColor(255, 255, 255);
// 		pdf.setDrawColor(255, 255, 255);
// 		pdf.addHTML(document.getElementById('exportcontaner'), options,
// 			function() {
// 				pdf.setFillColor(255, 255, 255);
// 				pdf.setDrawColor(255, 255, 255);
// 				pdf.save("test" + new Date().getTime() + "pdf");

// 			}
// 		);
// 	})
// });
