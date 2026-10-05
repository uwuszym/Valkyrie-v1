const app = require('../server/server.js');
const authRoutes = require('../server/functions/api/routes/auth');
const pekoraCompatRoutes = require('../server/functions/api/routes/pekoraCompat');

// Pekora's frontend expects its legacy service routes and cookie-based auth.
app.use('/api/auth', authRoutes);
app.use('/api/auth/v2', authRoutes);
app.use('/api/auth/v1', authRoutes);
app.use('/api', pekoraCompatRoutes);

module.exports = app;
