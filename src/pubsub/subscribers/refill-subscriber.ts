import { Machine, MachineRefillEvent, StockLevelOkEvent } from "../../machine";
import { DEFAULT_LOWEST_STOCK } from "../../setting";
import { MachineAbstractSubscriber } from "./abstract";

export class MachineRefillSubscriber extends MachineAbstractSubscriber {
    
    constructor(private machines: Machine[]) {
        super();
    }

    protected onHandleProcess(event: MachineRefillEvent): void {
        const machine = this.machines.find(m => m.id === event.machineId());
        if (!machine) {
            console.warn(`[Warning][RefillEvent][onHandleProcess] :: Machine not found. | machineId: ${event.machineId()} | eventType: ${event.type()}`);
            return;
        }
        const oldStock = machine.stockLevel;
        machine.stockLevel += event.getRefillQuantity();
        console.log(`[Info][RefillEvent] :: Machine ${machine.id} | Old Stock: ${oldStock} | Refill: ${event.getRefillQuantity()} | New stock: ${machine.stockLevel}`);
    }

    protected checkStockProcess(event: MachineRefillEvent): void {
        const machine = this.machines.find(m => m.id === event.machineId());
        if (!machine) {
            console.warn(`[Warning][RefillEvent][checkStockProcess] :: Machine not found. | machineId: ${event.machineId()} | eventType: ${event.type()}`);
            return;
        }
        const newStock = machine.stockLevel;
        const refilled = event.getRefillQuantity();
        if (this.isPublishStockOk(newStock, refilled)) {
            this.publishSubscribeService.publish(new StockLevelOkEvent(machine.id));
        }
    }

    private isPublishStockOk(newStock: number, refilled: number): boolean {
        return  newStock > DEFAULT_LOWEST_STOCK && (newStock - refilled < DEFAULT_LOWEST_STOCK);
    }
}
