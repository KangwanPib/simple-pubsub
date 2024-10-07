import { Machine, EventType, MachineEventUtils } from "./machine";
import { PublishSubscribeService, MachineSaleSubscriber, MachineRefillSubscriber, StockWarningSubscriber, IPublishSubscribeService } from "./pubsub";

(async () => {
  // create 3 machines with a quantity of 10 stock
  const machines: Machine[] = [new Machine('001'), new Machine('002'), new Machine('003')];

  // create a machine sale event subscriber. inject the machines (all subscribers should do this)
  const saleSubscriber = new MachineSaleSubscriber(machines);
  const refillSubscriber = new MachineRefillSubscriber(machines);
  const stockWarningSubscriber = new StockWarningSubscriber(machines);

  // create the PubSub service
  const pubSubService: IPublishSubscribeService = PublishSubscribeService.getInstance();
  pubSubService.subscribe(EventType.SaleEvent, saleSubscriber);
  pubSubService.subscribe(EventType.RefillEvent, refillSubscriber);
  pubSubService.subscribe(EventType.LowStockWarningEvent, stockWarningSubscriber);
  pubSubService.subscribe(EventType.StockLevelOkEvent, stockWarningSubscriber);

  // create 5 random events
  const events = [1, 2, 3, 4, 5].map(i => MachineEventUtils.eventGenerator());

  // publish the events
  events.forEach(event => pubSubService.publish(event));
})();
