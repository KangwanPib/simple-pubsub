import { LowStockWarningEvent, Machine, MachineSaleEvent } from "../../machine";
import { DEFAULT_LOWEST_STOCK } from "../../setting";
import { MachineAbstractSubscriber } from "./abstract";

export class MachineSaleSubscriber extends MachineAbstractSubscriber {
    
    constructor(private machines: Machine[]) {
        super();
    }

    protected onHandleProcess(event: MachineSaleEvent): void {
        const machine = this.machines.find(m => m.id === event.machineId());
        if (!machine) {
            console.warn(`[Warning][SaleEvent][onHandleProcess] :: Machine not found. | machineId: ${event.machineId()} | eventType: ${event.type()}`);
            return;
        }
        const oldStock = machine.stockLevel;
        machine.stockLevel -= event.getSoldQuantity();
        console.log(`[Info][SaleEvent] :: Machine ${machine.id} | Old Stock: ${oldStock} | Sold: ${event.getSoldQuantity()} | New stock: ${machine.stockLevel}`);
    }

    protected checkStockProcess(event: MachineSaleEvent): void {
        const machine = this.machines.find(m => m.id === event.machineId());
        if (!machine) {
            console.warn(`[Warning][SaleEvent][checkStockProcess] :: Machine not found. | machineId: ${event.machineId()} | eventType: ${event.type()}`);
            return;
        }
        const newStock = machine.stockLevel;
        const sold = event.getSoldQuantity();
        if (this.isPublishLowStockWaring(newStock, sold)) {
            this.publishSubscribeService.publish(new LowStockWarningEvent(machine.id));
        }
    }

    private isPublishLowStockWaring(newStock: number, sold: number): boolean {
        return newStock < DEFAULT_LOWEST_STOCK && (newStock + sold >= DEFAULT_LOWEST_STOCK);
    }
}