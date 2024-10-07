import { EventType, IEvent } from "../types";

export class LowStockWarningEvent implements IEvent {
    constructor(private readonly _machineId: string) {}

    machineId(): string {
        return this._machineId;
    }

    type(): EventType {
        return EventType.LowStockWarningEvent;
    }
}