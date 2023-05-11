import { EntitySchema } from 'typeorm';
import Operation from '@core/entities/Operation';
import OperationType from '@core/enums/OperationType';

const OperationSchema = new EntitySchema<Operation>({
  name: 'Operation',
  columns: {
    id: {
      type: 'string',
      primary: true,
      generated: 'uuid'
    },
    type: {
      type: 'enum',
      enum: OperationType,
      unique: true
    },
    cost: {
      type: 'float'
    }
  },
});

export default OperationSchema;
