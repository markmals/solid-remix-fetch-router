import { type EventHandler, type EventDescriptor, bind } from "@remix-run/events";

type EventFromMaps<EventName extends string, EventMap> = EventName extends keyof EventMap
    ? EventMap[EventName]
    : Event;

type TargetFunction<ECurrentTarget, EventMap, ETarget = EventTarget> = {
    // String literal overload that infers event type from EventMap
    <EventName extends keyof EventMap & string, T = ECurrentTarget>(
        type: EventName,
        handler: EventHandler<EventFromMaps<EventName, EventMap>, T, ETarget>,
        options?: AddEventListenerOptions,
    ): EventDescriptor<T>;

    // Generic overload for custom event types (fallback) - infer T from handler
    <E extends Event, T = ECurrentTarget>(
        type: string,
        handler: EventHandler<E, T, ETarget>,
        options?: AddEventListenerOptions,
    ): EventDescriptor<T>;
} & {
    [EventName in keyof EventMap as EventName extends string ? EventName : never]: {
        <Target = ETarget, CurrentTarget = ECurrentTarget>(
            handler: EventHandler<
                EventFromMaps<EventName & string, EventMap>,
                CurrentTarget,
                Target
            >,
        ): EventDescriptor<CurrentTarget>;
        <Target = ETarget, CurrentTarget = ECurrentTarget>(
            handler: EventHandler<
                EventFromMaps<EventName & string, EventMap>,
                CurrentTarget,
                Target
            >,
            options: AddEventListenerOptions,
        ): EventDescriptor<CurrentTarget>;
    };
};

function createTargetProxy<ECurrentTarget, ETarget, EventMap>(): TargetFunction<
    ECurrentTarget,
    EventMap,
    ETarget
> {
    return new Proxy(
        function targetFunction<E extends Event, T = ECurrentTarget>(
            type: string,
            handler: EventHandler<E, T, ETarget>,
            options?: AddEventListenerOptions,
        ): EventDescriptor<T> {
            return bind(type, handler, options);
        } as TargetFunction<ECurrentTarget, EventMap, ETarget>,
        {
            get(target, prop) {
                if (typeof prop === "string") {
                    return function <Target = ETarget, CurrentTarget = ECurrentTarget>(
                        handler: EventHandler<
                            EventFromMaps<typeof prop, EventMap>,
                            CurrentTarget,
                            Target
                        >,
                        options?: AddEventListenerOptions,
                    ): EventDescriptor<CurrentTarget> {
                        return bind(
                            prop,
                            handler as EventHandler<any, CurrentTarget, Target>,
                            options,
                        );
                    };
                }
                return (target as any)[prop];
            },
        },
    );
}

export let worker = {
    global: createTargetProxy<
        ServiceWorkerGlobalScope,
        EventTarget,
        ServiceWorkerGlobalScopeEventMap
    >(),
    container: createTargetProxy<
        ServiceWorkerContainer,
        EventTarget,
        ServiceWorkerContainerEventMap
    >(),
};

export let doc = createTargetProxy<Document, EventTarget, DocumentEventMap>();
