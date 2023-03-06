import React, { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

function AuthProvider ({ children }) {
	const [currentUser, setCurrentUser] = React.useState(null);

	return (
		<AuthContext.Provider
			value={useMemo(() => ({ currentUser, setCurrentUser }), [
				currentUser,
				setCurrentUser
			])}
		>
			{children}
		</AuthContext.Provider>
	);
}
AuthProvider.propTypes = {
	children: PropTypes.object
};

class UserInfo {
	constructor (token, role) {
		this.token = token;
		this.role = role;
	}

	getInfo () {
		return { token: this.token, role: this.role };
	}
}

export { UserInfo, AuthProvider, AuthContext };
