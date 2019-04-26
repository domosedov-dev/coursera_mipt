module.exports = {
  subscribers: [],
  /**
   * @param {String} event
   * @param {Object} subscriber
   * @param {Function} handler
   */
  on: function(event, subscriber, handler) {
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
  off: function(event, subscriber) {
    for (var i = this.subscribers.length - 1; i >= 0; i--) {
      if (
        this.subscribers[i].event == event &&
        this.subscribers[i].subscriber == subscriber
      ) {
        this.subscribers.splice(i, 1);
      }
    }
    return this;
  },

  /**
   * @param {String} event
   */
  emit: function(event) {
    for (var i = 0; i < this.subscribers.length; i++) {
      var subscriber = this.subscribers[i];
      if (
        subscriber.event == event &&
        subscriber.subscriber != undefined &&
        subscriber.handler != undefined
      ) {
        subscriber.handler.call(subscriber.subscriber);
      }
    }
    return this;
  }
};
