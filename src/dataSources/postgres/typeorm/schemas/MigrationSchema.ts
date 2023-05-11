import { EntitySchema, Migration } from 'typeorm';

const MigrationSchema = new EntitySchema<Migration>({
  name: 'Migrations',
  columns: {
    id: {
      type: 'integer',
      primary: true,
    },
    name: {
      type: 'character varying',
    },
    timestamp: {
      type: 'bigint'
    }
  },
});

export default MigrationSchema;
