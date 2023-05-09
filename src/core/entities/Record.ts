import Entity from './Entity';

interface Record extends Entity {
  operationId: string;
  userId: string;
  amount: number;
  userBalance: number;
  operationResponse: number | string;
}

export default Record;
