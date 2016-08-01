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

const nameSamples = [
  'Appartment Rent',
  'Car Gasoline',
  'Mobile Invoice',
  'Supermarket',
  'Dinner',
  'Traveling',
  'Insurance Invoice'
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
  for (i = 0; i < 10; i++) {
    dispatch(actions.addTransaction({
      name: nameSamples[Math.floor(Math.random() * nameSamples.length)],
      type: 'Money Transfer',
      description: 'lorem ipsum',
      date: randomDate('2016-01-01'),
      amount: Math.floor(Math.random() * 150),
      currency: 'EUR',
      category: 'Test'
    }));
  }
};
