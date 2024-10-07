import { EventType, IEvent, Machine } from "../../machine";
import { MachineAbstractSubscriber } from "./abstract";

export class StockWarningSubscriber extends MachineAbstractSubscriber {
    constructor(private machines: Machine[]) {
        super();
    }

    protected onHandleProcess(event: IEvent): void {
        const eventType = event.type();
        const machineId = event.machineId();
        switch (eventType) {
            case EventType.LowStockWarningEvent:
                console.log(`[Info][StockWarningEvent] :: Machine ${machineId} is low on stock.`);
                break;
            case EventType.StockLevelOkEvent:
                console.log(`[Info][StockWarningEvent] :: Machine ${machineId} stock level is OK.`);
                break;
            default:
                break;
        }
    }

    protected checkStockProcess(_: IEvent): void {}
}
