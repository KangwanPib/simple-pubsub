import { EventType, IEvent } from "../types";

export class MachineSaleEvent implements IEvent {
    constructor(
        private readonly _sold: number, 
        private readonly _machineId: string
    ) {}

    type(): EventType {
        return EventType.SaleEvent;
    }

    machineId(): string {
        return this._machineId;
    }

    getSoldQuantity(): number {
        return this._sold;
    }
}