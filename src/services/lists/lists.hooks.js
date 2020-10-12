const { authenticate } = require('@feathersjs/authentication').hooks;
const { setField } = require('feathers-authentication-hooks');

function restrictToOwner() {
  return setField({
    from: 'params.user._id',
    as: 'params.query.ownerId',
  })
};


const mongoose = require('mongoose');

async function isBoardOwner(context) {
  console.log(context.service)
  const { boardId } = context.params.query;
  const userId = context.params.user._id.toString();
  const Boards = mongoose.model('boards');
  const board = await Boards.findById(boardId);
  if (board) {
    if (board.ownerId == userId) {
      return context;
    } else {
      return Promise.reject(new Error('Un-Authorized'));
    }
  }
  return context;
}

module.exports = {
  before: {
    all: [ authenticate('jwt'), isBoardOwner ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
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
