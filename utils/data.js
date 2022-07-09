const usernames = [
    'Aaran',
    'Aaren',
    'Aarez',
    'Aarman',
    'Aaron',
    'Aaron-James',
    'Aarron',
    'Aaryan',
    'Aaryn',
    'Aayan',
    'Aazaan',
    'Abaan',
];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
// gets random name
const getRandomName = () =>
`${getRandomArrItem(usernames)} ${getRandomArrItem(usernames)}`;

module.exports = { getRandomName };