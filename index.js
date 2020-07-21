import { fifaData } from './fifa.js';
// console.log(fifaData);

console.log('its working');
// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data 

(a) Home Team name for 2014 world cup final
(b) Away Team name for 2014 world cup final
(c) Home Team goals for 2014 world cup final
(d) Away Team goals for 2014 world cup final
(e) Winner of 2014 world cup final */
// fifaData.map((item, index) => {
// 	if (item['Year'] === 2014 && item['Stage'] === 'Final') console.log(item);
// });
// console.log(fifaData[828]['Home Team Name']);
// console.log(fifaData[828]['Away Team Name']);
// console.log(fifaData[828]['Home Team Goals']);
// console.log(fifaData[828]['Away Team Goals']);
// console.log(fifaData[828]['Home Team Name']);

/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

function getFinals(data) {
	return data.filter((item) => item['Stage'] === 'Final');
}
// console.log(getFinals(fifaData));

/* Task 3: Implement a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

function getYears(cb) {
	return cb(fifaData).map((item) => item['Year']);
}

// console.log(getYears(getFinals));

/* Task 5: Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */

function getWinners(cb) {
	return cb(fifaData).map((item) => {
		if (item['Home Team Goals'] > item['Away Team Goals']) return item['Home Team Name'];
		return item['Away Team Name'];
	});
}

// console.log(getWinners(getFinals));

/* Task 6: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

function getWinnersByYear(winners, years) {
	const countries = winners(getFinals);
	const dates = years(getFinals);
	return dates.map((item, index) => `In ${item}, ${countries[index]} won the world cup!`);
}

// console.log(getWinnersByYear(getWinners, getYears));

/* Task 7: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

function getAverageGoals(data) {
	const homeGoals = data.reduce((total, curVal) => {
		return (total += curVal['Home Team Goals']);
	}, 0);
	const awayGoals = data.reduce((total, curVal) => {
		return (total += curVal['Away Team Goals']);
	}, 0);
	return `Avg Home Team Goals: ${homeGoals / data.length} and Avg Away Team Goals: ${awayGoals / data.length}`;
} //2.835

// console.log(getAverageGoals(fifaData));

/// STRETCH 🥅 //

/* Stretch 1: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, initials) {
	return data.reduce((total, curVal) => {
		if (curVal['Stage'] === 'Final') {
			if (curVal['Home Team Initials'] === initials && curVal['Home Team Goals'] > curVal['Away Team Goals'])
				total++;
			else if (curVal['Away Team Initials'] === initials && curVal['Away Team Goals'] > curVal['Home Team Goals'])
				total++;
		}
		return total;
	}, 0);
}

// console.log(getCountryWins(fifaData, 'BRA'));

/* Stretch 3: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data) {
	const finals = getFinals(fifaData);
	const teams = [];
	finals.forEach((item) => {
		if (!teams.includes(item['Home Team Name'])) teams.push(item['Home Team Name']);
		if (!teams.includes(item['Away Team Name'])) teams.push(item['Away Team Name']);
	});
	const totalGoals = Array(13).fill(0);
	const appearances = Array(13).fill(0);
	finals.forEach((item) => {
		const homeIndex = teams.indexOf(item['Home Team Name']);
		const awayIndex = teams.indexOf(item['Away Team Name']);
		totalGoals[homeIndex] += item['Home Team Goals'];
		totalGoals[awayIndex] += item['Away Team Goals'];
		appearances[homeIndex]++;
		appearances[awayIndex]++;
	});
	const avgGoals = totalGoals.map((item, index) => item / appearances[index]);
	const highestAvg = avgGoals.reduce((total, curVal) => {
		if (curVal > total) return curVal;
		else return total;
	}, 0);
	const topTeam = [];
	avgGoals.forEach((item, index) => {
		if (item === highestAvg) topTeam.push(teams[index]);
	});
	return topTeam;
}

// console.log(getGoals(fifaData));

/* Stretch 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(data) {
	const finals = getFinals(fifaData);
	const teams = [];
	finals.forEach((item) => {
		if (!teams.includes(item['Home Team Name'])) teams.push(item['Home Team Name']);
		if (!teams.includes(item['Away Team Name'])) teams.push(item['Away Team Name']);
	});
	const totalGoals = Array(13).fill(0);
	const appearances = Array(13).fill(0);
	finals.forEach((item) => {
		const homeIndex = teams.indexOf(item['Home Team Name']);
		const awayIndex = teams.indexOf(item['Away Team Name']);
		totalGoals[homeIndex] += item['Away Team Goals'];
		totalGoals[awayIndex] += item['Home Team Goals'];
		appearances[homeIndex]++;
		appearances[awayIndex]++;
	});
	const avgGoals = totalGoals.map((item, index) => item / appearances[index]);
	const highestAvg = avgGoals.reduce((total, curVal) => {
		if (curVal > total) return curVal;
		else return total;
	}, 0);
	const topTeam = [];
	avgGoals.forEach((item, index) => {
		if (item === highestAvg) topTeam.push(teams[index]);
	});
	return topTeam;
}

// console.log(badDefense(fifaData));

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */
