import { EventType, IEvent } from "../types";

export class MachineRefillEvent implements IEvent {
    constructor(
        private readonly _refill: number,
        private readonly _machineId: string
    ) {}

    machineId(): string {
        return this._machineId;
    }

    getRefillQuantity(): number {
        return this._refill;
    }

    type(): EventType {
        return EventType.RefillEvent;
    }
}
