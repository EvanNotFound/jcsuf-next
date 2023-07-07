export default function formatTime(timestamp: number) {
	var dateObj = new Date(timestamp);
	var currentYear = new Date().getFullYear();
	var year = dateObj.getFullYear();
	var month = dateObj.toLocaleString('default', { month: 'short' });
	var day = String(dateObj.getDate()).padStart(2, '0');
	
	if (year === currentYear) {
		return month + ' ' + day;
	} else {
		return year + ' ' + month + ' ' + day;
	}
}