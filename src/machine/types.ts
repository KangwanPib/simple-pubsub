export enum EventType {
    SaleEvent = 'SaleEvent',
    RefillEvent = 'RefillEvent',
    LowStockWarningEvent = 'LowStockWarningEvent',
    StockLevelOkEvent = 'StockLevelOkEvent',
}

export interface IEvent {
    type(): EventType;
    machineId(): string;
}