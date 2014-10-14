var CORE = (function() {

  var moduleData = {},
      debug = true;

  return {

    // Debug & Log Management
    // -----------------------------------
    debug: function(on) {

      // ** Can do define your own log / debug functions that console.log on dev and log to server on prod, AWESOME
      debug = on ? true : false;

    },

    log: function(severity, message) {

      if (debug) {
        // ** Does this work for us?
        console[ (severity === 1) ? 'log' : (severity === 2) ? 'warn ' : 'error' ](message);
      }
      else {
        // send to the server
      }

    },


    // Module Management
    // -----------------------------------
    create_module: function(moduleID, creator) {

      var temp;

      if (typeof moduleID === 'string' && typeof creator === 'function') {
        temp = creator(Sandbox.create(this, moduleID));

        if (temp.init && temp.destroy && typeof temp.init === 'function' && typeof temp.destroy === 'function') {
          moduleData[moduleID] = {
            create: creator,
            instance: null
          };
          temp = null;
        }
        else {
          this.log(1, "Module \"" + moduleId + "\" Registration: FAILED: instance has no init or destroy functions");
        }
      }
      else {
        this.log(1, "Module \"" + moduleId +  "\" Registration: FAILED: one or more arguments are of incorrect type" );
      }

    },

    start: function(moduleID) {

      var mod = moduleData[moduleID];

      if (mod) {
        mod.instance = mod.create(Sandbox.create(this, moduleID));
        mod.instance.init();
      }

    },

    start_all: function() {

      var moduleID;

      for (moduleID in moduleData) {
        // ** How does this work? Ask Ryan / take a look with fresh eyes
        if (moduleData.hasOwnProperty(moduleID)) {
          this.start(moduleID);
        }
      }

    },

    stop: function(moduleID) {

      var data;

      if ((data = moduleData[moduleId]) && data.instance) {
        data.instance.destroy();
        data.instance = null;
      }
      else {
        this.log(1, "Stop Module '" + moduleID + "': FAILED : module does not exist or has not been started"); 
      }

    },

    stop_all: function() {

      var moduleID;

      for (moduleID in moduleData) {
        if (moduleData.hasOwnProperty(moduleID)) {
          this.stop(moduleID);
        }
      }

    },


    // Event Management
    // -----------------------------------
    registerEvents: function (evts, mod) {

      if (this.is_obj(evts) && mod) {
        if (moduleData[mod]) {
          moduleData[mod].events = evts;
        }
        else {
          this.log(1, "Register Event Failed");
        }
      }
      else {
        this.log(1, "Register Event Failed");
      }

    }, 

    triggerEvent: function (evt) {

      var mod;

      for (mod in moduleData) {
        if (moduleData.hasOwnProperty(mod)) {
          mod = moduleData[mod];
        }
        if (mod.events && mod.events[evt.type]) {
          // ** Don't understand this part .. how do the types match up across listen & notify?
          // ie: where does mod.events[evt.type] get set? when are we telling register / listen of evt type?
          // NVM, does make sense --> it's not called type there, but its just the keys in the obj of evts that gets passed in
          mod.events[evt.type](evt.data);
        }
      }

    },

    removeEvents: function(evts, mod) {

      var i = 0,
          evt;

      if (this.is_arr(evts) && mod && (mod = moduleData[mod]) && mod.events) {
        for ( ; evt = evts[i++] ; ) {
          delete mod.events[evt];
        }
      }

    },


    // DOM Management
    // -----------------------------------
    dom: {

      query: function(selector, context) {

        var ret = {},
            that = this,
            jqEls,
            i = 0;

        if (context && context.find) { 
          jqEls = context.find(selector); 
        }
        else { 
          jqEls = jQuery(selector); 
        } 
         
        ret = jqEls.get(); 
        ret.length = jqEls.length; 
        ret.query = function(sel) { 
          return that.query(sel, jqEls); 
        } 

        return ret; 

      },  

      bind: function(element, evt, fn) { 

        if (element && evt) { 
          if (typeof evt === 'function') { 
            fn = evt; 
            evt = 'click'; 
          } 
          jQuery(element).bind(evt, fn); 
        }
        else { 
          // log wrong arguments 
        } 

      },

      unbind: function(element, evt, fn) { 

        if (element && evt) { 
          if (typeof evt === 'function') { 
            fn = evt; 
            evt = 'click'; 
          } 
          jQuery(element).unbind(evt, fn); 
        }
        else {
          // log wrong arguments 
        } 

      },

      create: function(el) { 

        return document.createElement(el);         

      },

      apply_attrs: function(el, attrs) { 

        jQuery(el).attr(attrs);              

      } 
    
    },

    is_arr: function(arr) { 

        return jQuery.isArray(arr);          

    }, 

    is_obj: function(obj) { 

        return jQuery.isPlainObject(obj);          

    }

  };

}());
