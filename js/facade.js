var Sandbox = {
  create: function(core, module_selector) {

    var CONTAINER = core.dom.query('#' + module_selector);

    return {

      // Note -- interesting that the find method ONLY searches within the container for
      // that module. That is TRUE modularization (html as well as JS), wonder if this makes sense for us
      find: function(selector) {
        return CONTAINER.query(selector);
      },

      addEvent: function(element, evt, fn) {
        core.dom.bind(element, evt, fn);
      },

      removeEvent: function(element, evt, fn) {
        core.dom.unbind(element, evt, fn);
      },

      notify: function(evt) {
        if(core.is_obj(evt) && evt.type) {
          core.triggerEvent(evt);
        }
      },

      listen: function(evts) {
        if (core.is_obj(evts)) {
          core.registerEvents(evts, module_selector);
        }
      },

      ignore: function(evts) {
        if (core.is_arr(evts)) {
          core.removeEvents(evts, module_selector);
        }
      }

    };

  }
};
