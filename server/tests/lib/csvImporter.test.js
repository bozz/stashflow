const csvImporter = require('../../lib/csvImporter');

const dbHelper = require('../helpers/testdb');
const createSampleData = require('../helpers/createSampleData');

const sampleCsv = `
"MyBank"
"Datum";"Auftragsgeber";"Empfänger";"Buchungsart";"Verwendungszweck";"Währung";"Betrag";" "
"02.01.2020";"SearlesBoris";"SuperKauf";"Basislastschrift";"Einkauf.VielenDank";"EUR";"75,99";"S"
"04.01.2020";"HaysAG";"SearlesBoris";"Dauerauftrag";"Gehalt";"EUR";"1200,00";"H"
"31.01.2020";;;;;;;;
`;

const importTemplate = {
  account: 'bankA', // from createSampleData
  skipLinesStart: 2,
  skipLinesEnd: 1,
  mapping: {
    date: 0,
    type: 3,
    target: 2,
    description: 4,
    amount: 6,
    currency: 5
  }
};

let db;

describe('csvImporter::import', () => {
  beforeAll(async () => {
    db = await dbHelper.init();
    await createSampleData(db);
  });

  it('should throw error if no db instance passed', async () => {
    let err;
    try {
      await csvImporter.import();
    } catch (e) {
      err = e;
    }

    expect(err).toBeDefined();
    expect(err.message).toBeDefined();
    expect(err.message).toContain('Invalid database');
  });

  it('should throw error if no params passed', async () => {
    let err;
    try {
      await csvImporter.import(db);
    } catch (e) {
      err = e;
    }

    expect(err).toBeDefined();
    expect(err.message).toBeDefined();
    expect(err.message).toContain('Invalid arguments');
  });

  it('should throw error for invalid importTemplate', async () => {
    let err;
    try {
      await csvImporter.import(db, sampleCsv, {});
    } catch (e) {
      err = e;
    }

    expect(err).toBeDefined();
    expect(err.message).toBeDefined();
    expect(err.message).toContain('Invalid importTemplate arguments');
  });

  it('should throw error for invalid importTemplate account', async () => {
    let err;
    try {
      await csvImporter.import(db, sampleCsv, { account: 'unknownAccount', mapping: {} });
    } catch (e) {
      err = e;
    }

    expect(err).toBeDefined();
    expect(err.message).toBeDefined();
    expect(err.message).toContain('Invalid account');
  });

  describe('with preview option', () => {
    it('should return simple mapped rows', async () => {
      const result = await csvImporter.import(db, sampleCsv, importTemplate, { preview: true });

      expect(result).toBeTruthy();
      expect(result).toHaveLength(2);
      expect(result[0].date).toEqual('02.01.2020');
      expect(result[0].target).toEqual('SuperKauf');
      expect(result[0].description).toEqual('Einkauf.VielenDank');
      expect(result[0].type).toEqual('Basislastschrift');
      expect(result[0].currency).toEqual('EUR');
      expect(result[0].amount).toEqual('75,99');
    });

    it('should support mapping with object col definition', async () => {
      const template = { ...importTemplate };
      template.mapping.date = { col: 0 };

      const result = await csvImporter.import(db, sampleCsv, importTemplate, { preview: true });

      expect(result).toBeTruthy();
      expect(result).toHaveLength(2);
      expect(result[0].date).toEqual('02.01.2020');
    });
  });
});
