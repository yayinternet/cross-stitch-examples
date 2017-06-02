class MenuView {
  constructor() {
    this._onCreate = this._onCreate.bind(this);
    this._onLoginChanged = this._onLoginChanged.bind(this);
    this._onLogout = this._onLogout.bind(this);
    this._updateMenu = this._updateMenu.bind(this);

    this.loginMenu = document.querySelector('#login-menu');
    this.mainMenu = document.querySelector('#main-menu');

    this.newButton = document.querySelector('#new-button');
    this.newButton.addEventListener('click', this._onCreate);
    this._getLoggedIn();
  }

  async _getLoggedIn() {
    await LoginUtils.initialize();
    await this._setupLoginLogout();
    await this._updateMenu();
  }

  async _updateMenu() {
    const result = await LoginUtils.getSignedInUser();
    if (result.loggedIn) {
      await this._loadOptions();
      this.loginMenu.classList.add('hidden');
      this.mainMenu.classList.remove('hidden');
    } else {
      this.mainMenu.classList.add('hidden');
      this.loginMenu.classList.remove('hidden');
    }
  }

  async _loadOptions() {
    await LoginUtils.initialize();
    const user = await LoginUtils.getSignedInUser();
    const response = await fetch(`/load/${user.idToken}`);
    const result =  await response.json();
    const menuContainer = document.querySelector('#menu');
    menuContainer.innerHTML = '';
    if (result && result.response) {
      const items = result.response;
      for (const item of items) {
        new MenuItem(menuContainer, item.name, item._id);
      }
    }
  }

  async _setupLoginLogout() {
    await LoginUtils.initialize();
    // Login button: Use Google's API for login.
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.isSignedIn.listen(this._onLoginChanged);
    const loginButton = document.querySelector('#login');
    auth2.attachClickHandler(loginButton);

    // Log out button: Attach click handler.
    const logoutButton = document.querySelector('#logout');
    logoutButton.addEventListener('click', this._onLogout);
  }

  _onLoginChanged(isLoggedIn) {
    this._updateMenu();
  }

  _onLogout() {
    // Special Google API call to sign out.
    gapi.auth2.getAuthInstance().signOut();
  }

  async _onCreate() {
    await LoginUtils.initialize();
    const user = await LoginUtils.getSignedInUser();
    const data = { idToken: user.idToken };
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    const response = await fetch('/create', fetchOptions);
    const result =  await response.json();
    if (result) {
      window.location.href = `/id/${result.id}`;
    }
  }
}
