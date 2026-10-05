const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Game = require('../models/Game');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

const publicAvatar = 'https://www.nicepng.com/png/full/146-1466409_roblox-bacon-hair-png-roblox-bacon-hair-head.png';

router.get('/users/v1/users/authenticated', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.user.userId }).lean();
    if (!user) return res.status(401).json({ errors: [{ message: 'User not found' }] });

    res.json({
      id: user.userId,
      name: user.username,
      displayName: user.username,
      description: user.blurb || '',
      isBanned: !!user.isBanned,
      isStaff: !!user.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ errors: [{ message: 'Unable to load authenticated user' }] });
  }
});

router.get('/users/v1/users/:userId', async (req, res) => {
  try {
    const user = await User.findOne({ userId: Number(req.params.userId) }).lean();
    if (!user) return res.status(404).json({ errors: [{ message: 'User not found' }] });

    res.json({
      id: user.userId,
      name: user.username,
      displayName: user.username,
      description: user.blurb || '',
      created: user.signupDate,
      isBanned: !!user.isBanned,
      isStaff: !!user.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ errors: [{ message: 'Unable to load user' }] });
  }
});

router.get('/users/v1/users/:userId/status', async (req, res) => {
  const user = await User.findOne({ userId: Number(req.params.userId) }).lean();
  if (!user) return res.status(404).json({ errors: [{ message: 'User not found' }] });
  const online = !!user.isOnline && !!user.lastActiveAt && (Date.now() - new Date(user.lastActiveAt).getTime()) < 5 * 60 * 1000;
  res.json({ status: online ? 'Online' : 'Offline' });
});

router.patch('/users/v1/users/:userId/status', authenticateToken, async (req, res) => {
  const user = await User.findOneAndUpdate(
    { userId: req.user.userId },
    { isOnline: true, lastActiveAt: new Date() },
    { new: true }
  ).lean();
  if (!user) return res.status(404).json({ errors: [{ message: 'User not found' }] });
  res.json({ status: 'Online' });
});

router.post('/users/v1/usernames/users', async (req, res) => {
  const names = Array.isArray(req.body?.usernames) ? req.body.usernames : [];
  const users = await User.find({ username: { $in: names } }, 'userId username').lean();
  res.json({
    data: users.map(user => ({ requestedUsername: user.username, id: user.userId, name: user.username })),
  });
});

router.get('/friends/v1/users/:userId/friends', async (req, res) => {
  const user = await User.findOne({ userId: Number(req.params.userId) }).populate('friends', 'username userId isOnline lastActiveAt').lean();
  if (!user) return res.status(404).json({ errors: [{ message: 'User not found' }] });

  const data = (user.friends || []).map(friend => ({
    id: friend.userId,
    name: friend.username,
    displayName: friend.username,
    isOnline: !!friend.isOnline && !!friend.lastActiveAt && (Date.now() - new Date(friend.lastActiveAt).getTime()) < 5 * 60 * 1000,
  }));

  res.json({ data });
});

router.get('/friends/v1/user/friend-requests/count', authenticateToken, async (req, res) => {
  const user = await User.findOne({ userId: req.user.userId }, 'friendRequests').lean();
  res.json({ count: user?.friendRequests?.length || 0 });
});

router.get('/friends/v1/users/:userId/followers/count', async (req, res) => res.json({ count: 0 }));
router.get('/friends/v1/users/:userId/followings/count', async (req, res) => res.json({ count: 0 }));
router.get('/friends/v1/users/:userId/friends/statuses', async (req, res) => res.json({ data: [] }));

router.get('/games/v1/games/list', async (req, res) => {
  try {
    const maxRows = Math.min(Number(req.query.maxRows) || 12, 50);
    const games = await Game.find().sort({ createdAt: -1 }).limit(maxRows).populate('creator', 'username userId').lean();

    res.json({
      games: games.map(game => ({
        id: game.assetId,
        universeId: game.assetId,
        placeId: game.assetId,
        name: game.title,
        description: game.description,
        creatorId: game.creator?.userId || 0,
        creatorName: game.creator?.username || 'Unknown',
        creatorType: 'User',
        playerCount: 0,
        totalUpVotes: 0,
        totalDownVotes: 0,
        rootPlaceId: game.assetId,
      }))
    });
  } catch (error) {
    res.status(500).json({ errors: [{ message: 'Unable to load games' }] });
  }
});

router.get('/games/v2/users/:userId/games', async (req, res) => {
  const user = await User.findOne({ userId: Number(req.params.userId) }).lean();
  if (!user) return res.status(404).json({ errors: [{ message: 'User not found' }] });
  const games = await Game.find({ creator: user._id }).sort({ createdAt: -1 }).limit(25).lean();
  res.json({
    data: games.map(game => ({
      id: game.assetId,
      universeId: game.assetId,
      name: game.title,
      description: game.description,
      creatorId: user.userId,
      creatorName: user.username,
      creatorType: 'User',
    })),
    nextPageCursor: null,
  });
});

router.get('/thumbnails/v1/users/avatar-headshot', async (req, res) => {
  const ids = String(req.query.userIds || '').split(',').filter(Boolean);
  res.json({
    data: ids.map(id => ({
      targetId: Number(id),
      state: 'Completed',
      imageUrl: publicAvatar,
    }))
  });
});

router.get('/thumbnails/v1/users/avatar', async (req, res) => {
  const ids = String(req.query.userIds || '').split(',').filter(Boolean);
  res.json({
    data: ids.map(id => ({
      targetId: Number(id),
      state: 'Completed',
      imageUrl: publicAvatar,
    }))
  });
});

router.get('/thumbnails/v1/games/icons', async (req, res) => {
  const ids = String(req.query.universeIds || '').split(',').filter(Boolean).map(Number);
  const games = await Game.find({ assetId: { $in: ids } }).lean();
  const byId = new Map(games.map(game => [game.assetId, game.thumbnailUrl]));
  res.json({
    data: ids.map(id => ({
      targetId: id,
      state: 'Completed',
      imageUrl: byId.get(id) || '/img/placeholder/icon_one.png',
    }))
  });
});

router.get('/economy/v1/users/:userId/currency', async (req, res) => {
  const user = await User.findOne({ userId: Number(req.params.userId) }, 'currency').lean();
  if (!user) return res.status(404).json({ errors: [{ message: 'User not found' }] });
  res.json({ robux: user.currency || 0, tickets: 0 });
});

router.get('/privatemessages/v1/messages/unread/count', authenticateToken, async (req, res) => {
  res.json({ count: 0 });
});

router.get('/trades/v1/trades/inbound/count', authenticateToken, async (req, res) => {
  res.json({ count: 0 });
});

router.get('/catalog/v1/search/items', async (req, res) => {
  res.json({ data: [], nextPageCursor: null });
});

module.exports = router;
