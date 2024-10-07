import { IEvent } from "../../machine";
import { PublishSubscribeService } from "../pubsub-service";
import { IPublishSubscribeService, ISubscriber } from "../types";

export abstract class MachineAbstractSubscriber implements ISubscriber {
    protected abstract onHandleProcess(event: IEvent): void;
    protected abstract checkStockProcess(event: IEvent): void;

    protected get publishSubscribeService(): IPublishSubscribeService {
        return PublishSubscribeService.getInstance();
    };

    public handle(event: IEvent): void {
        this.onHandleProcess(event);
        this.checkStockProcess(event);
    }
}