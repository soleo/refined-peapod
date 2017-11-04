'use strict';

const peapodInjection = cb => {
  if (!cb) {
    throw new Error('Missing argument callback');
  }

  if (typeof cb !== 'function') {
    throw new TypeError('Callback is not a function');
  }

  document.addEventListener('ppdLoadingActionFinish', cb);
  cb();
};

// Export the peapodInjection function for **Node.js**
// Otherwise leave it as a global
if (typeof exports !== 'undefined') {
  exports = module.exports = peapodInjection;
}
