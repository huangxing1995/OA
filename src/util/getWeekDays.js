export function getWeekDays(currentTime){
	var currentDate = new Date(currentTime)
	var timesStamp = currentDate.getTime();
	var currenDay = currentDate.getDay();
	var dates = [];
	for (var i = 0; i < 7; i++) {
		dates.push(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7));
	}
	return dates
}