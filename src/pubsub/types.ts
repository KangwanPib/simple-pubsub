import { IEvent } from "../machine/types";

export interface ISubscriber {
    handle(event: IEvent): void;
}

export interface IPublishSubscribeService {
    publish(event: IEvent): void;
    subscribe(type: string, handler: ISubscriber): void;
    unsubscribe(type: string): void;
}