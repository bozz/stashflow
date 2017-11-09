import moment from 'moment';
import * as actions from '../actions';

// - transactions:
//   - id
//   - type
//   - name
//   - description
//   - date
//   - amount
//   - currency
//   - account (id)
//   - category (id)
//   - tags (array of ids)

const sampleData = [
  ['Appartment Rent', 1],
  ['Car Gasoline', 4],
  ['Mobile Invoice', 5],
  ['Supermarket', 6],
  ['Dinner', 7],
  ['Traveling', 8],
  ['Insurance Invoice', 3]
];

const randomDate = (start, end) => {
  const mStart = moment(start, 'YYYY-MM-DD');
  const mEnd = end ? moment(end, 'YYYY-MM-DD') : moment();
  const dayRange = moment.duration(mEnd.diff(mStart)).asDays();
  const randomizedDay = Math.floor(Math.random() * dayRange);
  const newDate = moment(mStart).add(randomizedDay, 'days');

  return newDate.format('YYYY-MM-DD');
};

export const generateData = (dispatch) => {
  let i;
  let sampleIndex;
  for (i = 0; i < 10; i++) {
    sampleIndex = Math.floor(Math.random() * sampleData.length);
    dispatch(actions.addTransaction({
      name: sampleData[sampleIndex][0],
      type: 'Money Transfer',
      description: 'lorem ipsum',
      date: randomDate('2016-01-01'),
      amount: Math.floor(Math.random() * 150),
      currency: 'EUR',
      account: 'PrimoBank',
      category: sampleData[sampleIndex][1]
    }));
  }
};
