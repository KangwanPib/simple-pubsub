import { EventType, IEvent } from "../types";

export class StockLevelOkEvent implements IEvent {
    constructor(private readonly _machineId: string) {}
    machineId(): string {
        return this._machineId;
    }
    type(): EventType {
        return EventType.StockLevelOkEvent;
    }
}