const { authenticate } = require('@feathersjs/authentication').hooks;
const { setField } = require('feathers-authentication-hooks');

function restrictToOwner() {
  return setField({
    from: 'params.user._id',
    as: 'params.query.ownerId',
  })
};

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [restrictToOwner()],
    get: [restrictToOwner()],
    create: [
      setField({
        from: 'params.user._id',
        as: 'data.ownerId',
      }),
    ],
    update: [restrictToOwner()],
    patch: [restrictToOwner()],
    remove: [restrictToOwner()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
