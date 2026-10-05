(() => {
  const STYLE_ID = 'pekora-home-style';

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function withStyle() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = \`
      :root {
        --pk-blue: #2773be;
        --pk-blue-dark: #1f5f9d;
        --pk-link: #0055b3;
        --pk-page: #e3e3e3;
        --pk-white: #fff;
        --pk-text: #191919;
        --pk-muted: #757575;
        --pk-border: #c7c7c7;
      }

      html, body {
        background: var(--pk-page) !important;
        color: var(--pk-text) !important;
        font-family: Arial, Helvetica, sans-serif !important;
      }

      body {
        padding-top: 0 !important;
      }

      #particles-js {
        display: none !important;
      }

      #content {
        background: var(--pk-page);
        min-height: 100vh;
      }

      .navbar-wrapper-main,
      .navbar {
        box-shadow: none !important;
      }

      .navbar-default {
        background: var(--pk-blue) !important;
        border: 0 !important;
        border-radius: 0 !important;
        min-height: 50px !important;
        margin-bottom: 0 !important;
      }

      .navbar-default .navbar-nav > li > a,
      .navbar-default .navbar-brand {
        color: #fff !important;
        text-shadow: none !important;
      }

      .navbar-default .navbar-nav > li > a:hover,
      .navbar-default .navbar-nav > li > a:focus,
      .navbar-default .navbar-nav > .open > a,
      .navbar-default .navbar-nav > .open > a:hover,
      .navbar-default .navbar-nav > .open > a:focus {
        background: var(--pk-blue-dark) !important;
        color: #fff !important;
      }

      .pk-home {
        width: 1338px;
        max-width: calc(100% - 20px);
        margin: 58px auto 40px;
        display: flex;
        align-items: flex-start;
        gap: 24px;
      }

      .pk-ad {
        width: 160px;
        min-width: 160px;
        min-height: 600px;
      }

      .pk-main {
        width: 970px;
        max-width: 970px;
        margin: 0 auto;
      }

      .pk-header {
        display: flex;
        align-items: center;
        margin: 0 0 14px;
      }

      .pk-headshot {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 24px;
        background: #fff;
        box-shadow: 0 1px 4px rgba(25,25,25,.30);
        flex: 0 0 150px;
      }

      .pk-headshot img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .pk-greeting {
        font-size: 36px;
        font-weight: 700;
        line-height: 1.1;
        color: var(--pk-text);
        margin: 0;
      }

      .pk-greeting a,
      .pk-section-title a,
      .pk-friend a,
      .pk-game-name {
        color: var(--pk-link);
        text-decoration: none !important;
      }

      .pk-greeting a:hover,
      .pk-section-title a:hover,
      .pk-friend a:hover,
      .pk-game-name:hover {
        color: #003d80;
        text-decoration: none !important;
      }

      .pk-section {
        margin-bottom: 18px;
      }

      .pk-section-head {
        min-height: 34px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .pk-section-title {
        font-size: 24px;
        font-weight: 700;
        line-height: 1.4;
        margin: 0;
        color: var(--pk-text);
      }

      .pk-see-all {
        display: inline-block;
        padding: 4px 10px;
        min-width: 90px;
        border: 1px solid var(--pk-blue);
        border-radius: 2px;
        background: #fff;
        color: var(--pk-text);
        font-size: 14px;
        line-height: 1.25;
        text-align: center;
        box-shadow: none;
      }

      .pk-see-all:hover {
        background: #f5f5f5;
        color: var(--pk-link);
      }

      .pk-panel {
        background: #fff;
        box-shadow: 0 1px 4px rgba(25,25,25,.30);
        padding: 15px;
      }

      .pk-friends {
        display: flex;
        gap: 10px;
        flex-wrap: nowrap;
        overflow-x: auto;
        padding: 0;
        margin: 0;
        list-style: none;
      }

      .pk-friend {
        width: 100px;
        min-width: 100px;
        text-align: center;
      }

      .pk-friend-avatar {
        width: 90px;
        height: 90px;
        margin: 0 auto 4px;
        border-radius: 50%;
        overflow: hidden;
        background: #f0f0f0;
        box-shadow: 0 1px 4px rgba(25,25,25,.30);
      }

      .pk-friend-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .pk-friend-name {
        margin: 0;
        font-size: 15px;
        line-height: 1.25;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .pk-dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 4px;
        vertical-align: 1px;
      }

      .pk-dot.online { background: #02b757; }
      .pk-dot.offline { background: #d86868; }

      .pk-game-grid {
        display: grid;
        grid-template-columns: repeat(6, minmax(0, 1fr));
        gap: 14px;
        margin: 0;
      }

      .pk-game {
        min-width: 0;
      }

      .pk-game-thumb {
        width: 100%;
        aspect-ratio: 1 / 1;
        display: block;
        object-fit: cover;
        background: #eee;
        box-shadow: 0 1px 4px rgba(25,25,25,.18);
      }

      .pk-game-name {
        display: block;
        margin-top: 7px;
        font-size: 14px;
        line-height: 1.25;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .pk-game-meta {
        margin-top: 2px;
        font-size: 12px;
        line-height: 1.25;
        color: var(--pk-muted);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .pk-empty {
        background: #b8b8b8;
        color: #757575;
        padding: 26px 15px;
        text-align: center;
        font-size: 16px;
      }

      .pk-bottom {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
      }

      .pk-feed-item {
        border-bottom: 1px solid #ddd;
        padding: 8px 0;
        font-size: 14px;
      }

      .pk-feed-item:first-child { padding-top: 0; }
      .pk-feed-item:last-child { border-bottom: 0; padding-bottom: 0; }

      .pk-blurb {
        font-size: 16px;
        line-height: 1.4;
        min-height: 28px;
        margin-bottom: 8px;
      }

      .pk-mini-btn {
        border: 1px solid #aaa;
        border-radius: 2px;
        background: #fff;
        padding: 4px 9px;
        font-size: 12px;
      }

      .pk-mini-btn:hover { background: #f2f2f2; }

      .pk-status {
        margin-bottom: 18px;
      }

      @media (max-width: 1324px) {
        .pk-ad { display: none; }
        .pk-home { width: 970px; }
      }

      @media (max-width: 991px) {
        .pk-home { max-width: calc(100% - 20px); }
        .pk-main { max-width: 100%; }
        .pk-headshot { width: 90px; height: 90px; flex-basis: 90px; }
        .pk-greeting { font-size: 28px; }
        .pk-game-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .pk-bottom { grid-template-columns: 1fr; gap: 0; }
      }

      @media (max-width: 543px) {
        .pk-home { margin-top: 56px; }
        .pk-game-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      }
    \`;
    document.head.appendChild(style);
  }

  function request(url, options = {}) {
    return $.ajax(Object.assign({
      url,
      method: 'GET',
      dataType: 'json',
      timeout: 10000,
    }, options));
  }

  function renderGame(game) {
    const id = game && (game._id || game.id);
    const title = esc(game && (game.title || game.name) || 'Untitled Game');
    const creator = esc(game && game.creator && game.creator.username || game.creatorName || 'Unknown');
    const image = esc(game && (game.thumbnailUrl || game.iconUrl) || '/images/ValkLogo.png');
    return \`
      <div class="pk-game">
        <a href="/game?id=\${encodeURIComponent(id || '')}">
          <img class="pk-game-thumb" src="\${image}" alt="\${title}">
        </a>
        <a class="pk-game-name" href="/game?id=\${encodeURIComponent(id || '')}">\${title}</a>
        <div class="pk-game-meta">by <a href="/user-profile?username=\${encodeURIComponent(creator)}" class="pk-game-name" style="display:inline;font-size:12px;font-weight:400;">\${creator}</a></div>
      </div>
    \`;
  }

  function renderFriends(friends, username) {
    if (!friends.length) {
      return '<div class="pk-panel"><div class="pk-empty">No friends yet.</div></div>';
    }

    const list = friends.slice(0, 9).map(friend => {
      const name = esc(friend.username);
      const id = friend._id || friend.userId || '';
      const online = !!friend.isOnline;
      return \`
        <div class="pk-friend">
          <a href="/user-profile?username=\${encodeURIComponent(friend.username)}">
            <div class="pk-friend-avatar">
              <img src="https://www.nicepng.com/png/full/146-1466409_roblox-bacon-hair-png-roblox-bacon-hair-head.png" alt="\${name}">
            </div>
            <p class="pk-friend-name"><span class="pk-dot \${online ? 'online' : 'offline'}"></span>\${name}</p>
          </a>
        </div>
      \`;
    }).join('');

    return \`
      <div class="pk-panel">
        <div class="pk-friends">\${list}</div>
      </div>
    \`;
  }

  function renderFeed() {
    return \`
      <div class="pk-feed-item">Welcome to Valkyrie.</div>
      <div class="pk-feed-item">Explore games, meet players, and build your profile.</div>
      <div class="pk-feed-item">More dashboard activity will appear here as social features expand.</div>
    \`;
  }

  function renderHome(user, avatar, friends, games) {
    const app = $('#home-app');
    const username = esc(user.username || localStorage.getItem('username') || 'Player');
    const userId = user.userId || localStorage.getItem('userId') || '';
    const avatarSrc = esc(
      avatar && avatar.avatarRender && avatar.avatarRender.displayUrl ||
      avatar && avatar.avatarRender && avatar.avatarRender.shirt ||
      '/images/ValkLogo.png'
    );

    const gameList = Array.isArray(games) ? games : [];
    const recently = gameList.slice(0, 6);
    const favorites = gameList.slice(6, 12);

    app.html(\`
      <div class="pk-home">
        <div class="pk-ad"></div>
        <main class="pk-main">
          <section class="pk-header">
            <a class="pk-headshot" href="/users/\${encodeURIComponent(userId)}/profile">
              <img src="\${avatarSrc}" alt="\${username}">
            </a>
            <div>
              <h1 class="pk-greeting"><a href="/users/\${encodeURIComponent(userId)}/profile">Hello, \${username}!</a></h1>
            </div>
          </section>

          <section class="pk-section">
            <div class="pk-section-head">
              <h2 class="pk-section-title">Friends (\${friends.length})</h2>
              <a class="pk-see-all" href="/friends/showfriends?username=\${encodeURIComponent(user.username || '')}">See All</a>
            </div>
            \${renderFriends(friends, user.username)}
          </section>

          <section class="pk-section">
            <div class="pk-section-head">
              <h2 class="pk-section-title">Recently Played</h2>
              <a class="pk-see-all" href="/games">See All</a>
            </div>
            <div class="pk-panel">
              \${recently.length ? '<div class="pk-game-grid">' + recently.map(renderGame).join('') + '</div>' : '<div class="pk-empty">No games found.</div>'}
            </div>
          </section>

          <section class="pk-section">
            <div class="pk-section-head">
              <h2 class="pk-section-title">My Favorites</h2>
              <a class="pk-see-all" href="/games">See All</a>
            </div>
            <div class="pk-panel">
              \${favorites.length ? '<div class="pk-game-grid">' + favorites.map(renderGame).join('') + '</div>' : '<div class="pk-empty">No games found.</div>'}
            </div>
          </section>

          <section class="pk-status">
            <div class="pk-section-head">
              <h2 class="pk-section-title">Current Status</h2>
            </div>
            <div class="pk-panel">
              <div id="pk-blurb" class="pk-blurb">\${esc(user.blurb || 'No blurb set.')}</div>
              <button id="pk-edit-blurb" class="pk-mini-btn" type="button">Edit Blurb</button>
            </div>
          </section>

          <section class="pk-bottom">
            <div class="pk-section">
              <div class="pk-section-head"><h2 class="pk-section-title">My Feed</h2></div>
              <div class="pk-panel">\${renderFeed()}</div>
            </div>
            <div class="pk-section">
              <div class="pk-section-head"><h2 class="pk-section-title">Blog News</h2></div>
              <div class="pk-panel">
                <p style="margin:0;font-size:16px;">The blog will be worked on.</p>
              </div>
            </div>
          </section>
        </main>
        <div class="pk-ad"></div>
      </div>
    \`);

    $('#pk-edit-blurb').on('click', function () {
      const current = user.blurb || '';
      $('#pk-blurb').html(\`
        <textarea id="pk-blurb-input" class="form-control" rows="3" maxlength="500">\${esc(current)}</textarea>
        <div style="margin-top:7px;">
          <button id="pk-save-blurb" class="pk-mini-btn" type="button">Save</button>
          <button id="pk-cancel-blurb" class="pk-mini-btn" type="button">Cancel</button>
          <span id="pk-char-count" style="margin-left:8px;color:#757575;font-size:12px;"></span>
        </div>
      \`);
      const input = $('#pk-blurb-input');
      const count = $('#pk-char-count');
      const updateCount = () => count.text(input.val().length + '/500');
      input.on('input', updateCount);
      updateCount();

      $('#pk-cancel-blurb').on('click', () => {
        $('#pk-blurb').text(current || 'No blurb set.');
      });

      $('#pk-save-blurb').on('click', () => {
        const token = localStorage.getItem('token');
        $.ajax({
          url: '/api/user/blurb',
          method: 'PUT',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({ blurb: input.val() }),
          success: response => {
            user.blurb = response.blurb || '';
            $('#pk-blurb').text(user.blurb || 'No blurb set.');
          },
          error: () => alert('Unable to update your status right now.'),
        });
      });
    });
  }

  function init() {
    withStyle();

    $(function () {
      const username = localStorage.getItem('username');
      const token = localStorage.getItem('token');

      if (!username || !token) return;

      if (!$('#home-app').length) {
        $('#content').html('<div id="navbar-container"></div><main id="home-app"></main>');
      }

      const userRequest = request('/api/user/' + encodeURIComponent(username), {
        headers: { Authorization: 'Bearer ' + token }
      }).catch(() => ({
        username,
        userId: localStorage.getItem('userId') || '',
        blurb: ''
      }));

      const avatarRequest = request('/api/avatar', {
        headers: { Authorization: 'Bearer ' + token }
      }).catch(() => null);

      const friendsRequest = request('/api/friends/' + encodeURIComponent(username))
        .catch(() => []);

      const gamesRequest = request('/api/games').catch(() => []);

      $.when(userRequest, avatarRequest, friendsRequest, gamesRequest)
        .done((user, avatar, friends, games) => {
          // $.when unwraps each single-ajax result differently; normalize it.
          const normalize = value => {
            if (Array.isArray(value)) return value;
            if (value && value[0] && (typeof value[0] === 'object')) return value[0];
            return value;
          };

          const u = normalize(user);
          const a = normalize(avatar);
          const f = normalize(friends) || [];
          const g = normalize(games) || [];

          renderHome(u && u.username ? u : {
            username,
            userId: localStorage.getItem('userId') || '',
            blurb: ''
          }, a, Array.isArray(f) ? f : [], Array.isArray(g) ? g : []);
        })
        .fail(() => {
          renderHome({
            username,
            userId: localStorage.getItem('userId') || '',
            blurb: ''
          }, null, [], []);
        });
    });
  }

  init();
})();