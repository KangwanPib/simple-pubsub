import { EventType, IEvent } from '../machine/types';
import { IPublishSubscribeService, ISubscriber } from './types';

export class PublishSubscribeService implements IPublishSubscribeService {
    private static instance?: PublishSubscribeService;
    private subscriptions: Map<EventType, ISubscriber> = new Map();

    public static getInstance(): IPublishSubscribeService {
        if (!this.instance) {
            this.instance = new PublishSubscribeService();
        }
        return this.instance;
    }

    publish(event: IEvent): void {
        const eventType = event.type();
        const handler = this.subscriptions.get(eventType);
        if (!handler) {
            console.warn(`[PublishSubscribeService][publish] :: You haven't subscribed this event type | eventType: ${event.type()}`);
            return;
        }
        handler.handle(event);
    }

    subscribe(type: EventType, handler: ISubscriber): void {
        this.subscriptions.set(type, handler);
    }

    unsubscribe(type: EventType): void {
        this.subscriptions.delete(type);
    }
}