export default function (a, b) {
	if (a.um > b.um) return 1;
	else if (a.um < b.um) return -1
	else return 0;
}

export function sortByName(a, b) {
	if (a.name > b.name) return 1;
	else if (a.name < b.name) return -1
	else return 0;
}