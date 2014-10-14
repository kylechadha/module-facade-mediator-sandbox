var CORE = (function() {
  var moduleData = {},
      debug = true;

  return {

    debug: function(on) {
      // ** Can do define your own log / debug functions that console.log on dev and log to server on prod, AWESOME
      debug = on ? true : false;
    },

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
    }

  };

}());
