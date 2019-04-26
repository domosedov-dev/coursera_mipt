console.clear();
var notifications = {
    counter: 0,
    count: function () {
        this.counter++;
    }
};



// Определим для хранения логов
var logger = {
    logs: []
};

var emitter = {

    subscribers: [],
        /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {
        this.subscribers.push({
            event: event,
            subscriber: subscriber,
            handler: handler
        });
        return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
        // for(var i = this.subscribers.length - 1; i >= 0; i--) {
        //     if(this.subscribers[i].event == event && this.subscribers[i].subscriber == subscriber) {
        //         this.subscribers.splice(i, 1);
        //         break;
        //     }
        // }
        // return this;


        let indexForDelete = -1;
        this.subscribers.findIndex(function (el, index) {
            if (el.nameEvent == event && el.subscriber === subscriber) {//
                indexForDelete = index;
                return true;
            }
        });
        if (indexForDelete != -1) {
            this.subscribers.splice(indexForDelete, 1);
            return this.off(event, subscriber);
        } else {
            return this;
        }



    },

    /**
     * @param {String} event
     */
    emit: function (event) {
        for(var i = 0; i < this.subscribers.length; i++) {
            var subscriber = this.subscribers[i];
            if(subscriber.event == event && subscriber.subscriber != undefined && subscriber.handler != undefined) {
                subscriber.handler.call(subscriber.subscriber);
            }
        }
        return this;
    }
}

emitter
.on('new_notification', notifications, notifications.count)
.on('new_notification', logger, function () {
    this.logs.push('Произошло новое событие new_notification');
})
.on('new_notification', logger, function () {
    // this указывает на logger
    this.logs.push('Добавлена новая нотификация. Количество - ' + notifications.counter);
})
.emit('new_notification');

emitter
    .off('new_notification', logger)
    .emit('new_notification')
    .on('new_notification', logger, function () {
        this.logs.push('Новое событие new_notification!');
    })
    .emit('new_notification');

console.table(logger.logs);

// // Проверяем количество нотификаций
// assert.equal(notifications.counter, 3, 'Получено три нотификации');
// // Проверяем, что логи были отключены, а затем снова подключены
// assert.deepEqual(logger.logs, [
//     'Произошло новое событие new_notification',
//     'Добавлена новая нотификация. Количество - 1',
//     'Новое событие new_notification!'
// ]);

